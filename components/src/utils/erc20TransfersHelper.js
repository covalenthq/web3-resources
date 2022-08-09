import truncateEthAddress from 'truncate-eth-address'


const filterForTransfers = (res) => {

    const txns = res.data.items

    //Filter only the transactions whose log events contain "transfer" events
    const transfers = txns.filter(txn => {
        const txnLogEvents = txn.log_events

        // //Filter out the empty log events, or those with too many log events
        if (txnLogEvents.length === 0 || txnLogEvents.length > 20) {
            return false
        }
        let isTransfer

        const logEventsBoolArray = txnLogEvents.map(logEvent => {
            if (logEvent.decoded) { //exclude decoded==null cases
                if (logEvent.decoded.name==="Transfer") {
                    isTransfer = true
                } else {
                    isTransfer = false
                }
            }
            return isTransfer
        })

        //If bool arr contains true, returns true -> filter accepts this entry and
        //it's added to transfers variable
        return logEventsBoolArray.includes(true) ? true : false
    })

    return transfers // an array
}


//Receives an array of transfers
const pruneTransfers = (transfersData, address) => {

    //Maps through each transfer and returns an object array stored in `transfers`
    const transfers = transfersData.map(transfer => {

        let innerTransfersLogItem = [] //this will be an array of an array of params objects

        const transferFlow = transfer.from_address.toLowerCase() === address.toLowerCase() ? "Out" : "In"

        const transferLogEvent = transfer.log_events.filter(logEvent => {
            //Returns true only for those items that are transfer events.
            let isTransfer;
            if (logEvent.decoded) {
                if (logEvent.decoded.name === "Transfer") {
                    isTransfer = true
                } else {
                    isTransfer = false
                }
            }
            return isTransfer
        })

        console.log("Transfer log event", transferLogEvent)

        const from = transferFlow === "Out" ? address : transfer.from_address
        const to = transferFlow === "Out" ? transferLogEvent[0].decoded.params[1].value : address //Notes on this field: this specifies where the funds are transferred to. Not the contract interacted with.
        const date = transfer.block_signed_at.slice(0,10)
        const tokenName = transferLogEvent[0].sender_name
        const tokenSymbol = transferLogEvent[0].sender_contract_ticker_symbol
        const tokenLogo = transferLogEvent[0].sender_logo_url
        const transferValue = parseInt(transferLogEvent[0].decoded.params[2].value) / (10**parseInt(transferLogEvent[0].sender_contract_decimals))
        const tokenAddress = transferLogEvent[0].sender_address
        const txnHash = transfer.tx_hash
        const isERC721 = transferLogEvent[0].decoded.params[2].name == 'tokenId' ? true : false


        const multiTransfersChecker = () => { //this function checks whether the txn contains multiple transfers. Returns true when there's > 1 transfers events
            let transfersNum = 0
            for (let i = 0; i < transfer.log_events.length; i++) {

                if (transfer.log_events[i].decoded === null) {
                    return false
                }
                if (transfer.log_events[i].decoded.name === "Transfer") {
                    transfersNum++
                    innerTransfersLogItem.push(transfer.log_events[i])
                }
            }
            return transfersNum > 1 ? true : false
        }
        const isMultipleTransfers = multiTransfersChecker()

        let multipleTransfers = []
        if (isMultipleTransfers) {
            multipleTransfers = innerTransfersLogItem.map(transfersItem => {
                const fromAddress = transfersItem.decoded.params[0].value
                const toAddress = transfersItem.decoded.params[1].value
                const amount = parseInt(transfersItem.decoded.params[2].value)/ (10**parseInt(transferLogEvent[0].sender_contract_decimals))
                const innerTokenLogo = transfersItem.sender_logo_url
                const innerTokenName = transfersItem.sender_name
                const logOffset = transfersItem.log_offset
                return {
                    fromAddress,
                    toAddress,
                    amount,
                    innerTokenLogo,
                    innerTokenName,
                    logOffset
                }
            })
        }
        multipleTransfers.sort((a, b) => parseFloat(a.logOffset) - parseFloat(b.logOffset)) // Sort the transfer events by the order in which they occur within the txn

        return {
            key: txnHash,
            date,
            transferFlow,
            from,
            to,
            tokenName,
            tokenSymbol,
            tokenLogo,
            transferValue,
            tokenAddress,
            txnHash,
            isMultipleTransfers,
            isERC721,
            multipleTransfers
        }
    })

    // Warning: This exclusion logic (for NFTs) is predicated upon `transferValue` field being 0. This is a hot fix - there are many cases where
    // the `transferValue` field is not 0 for NFTs, and another filter logic must be written.
    const transfersWithoutNFTs = transfers.filter(transfer => !transfer.isERC721)
    return transfersWithoutNFTs

}

const blockexplorerURL = "https://blockscan.com/"

const handleImgError = (e) => {
  e.target.src = "https://res.cloudinary.com/dl4murstw/image/upload/v1659590465/default-logo_om9kbi.png"
}

const multiTransfersTableColumns = [
    {
        title: 'From',
        dataIndex: 'fromAddress',
        key: 'from',
        render: (text) => <a href={blockexplorerURL + 'address/' + text} target="_blank" rel="noopener noreferrer">{truncateEthAddress(text)}</a>
    },
    {
        title: 'To',
        dataIndex: 'toAddress',
        key: 'to',
        render: (text) => <a href={blockexplorerURL + 'address/' + text} target="_blank" rel="noopener noreferrer">{truncateEthAddress(text)}</a>
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: 'Token Logo',
        dataIndex: 'innerTokenLogo',
        key: 'tokenLogo',
        render: (text) => <img alt="token logo" onError={handleImgError} src={text} width="40"/>
    },
    {
        title: 'Token Name',
        dataIndex: 'innerTokenName',
        key: 'tokenName'
    }
]

export default {
    filterForTransfers,
    pruneTransfers,
    multiTransfersTableColumns
}
