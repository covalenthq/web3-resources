import truncateEthAddress from 'truncate-eth-address'


//**********************************************
//*             fitlerForTransfers helper method
//**********************************************
//Receives Covalent transactions_v2 response object as input and outputs only the txns containing 'transfers' log events.
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

        //The main logic is to map over each array of log events and create a new
        //boolean array that tells us whether there's transfer events in that array:
        //e.g. [false, false, true]
        // Each outer iteration (via filter) will create one array containing as
        // many
        const logEventsBoolArray = txnLogEvents.map(logEvent => {
            if (logEvent.decoded) { //exclude decoded==null cases
                if (logEvent.decoded.name==="Transfer") {
                    isTransfer = true
                } else {
                    isTransfer = false
                }
            }
            return isTransfer
        })// this will create an bool array

        // console.log("logEventsBoolArray",logEventsBoolArray)

        //If bool arr contains true, returns true -> filter accepts this entry and
        //it's added to transfers variable
        return logEventsBoolArray.includes(true) ? true : false
    })

    return transfers // an array
}

//**********************************************
//*             pruneTransfers helper
//**********************************************
//Receives an array of transfers
const pruneTransfers = (transfersData, address) => {
    // console.log("transfersData:", transfersData)

    //Maps through each transfer and returns an object array stored in `transfers`
    const transfers = transfersData.map(transfer => {

        let innerTransfersLogItem = [] //this will be an array of an array of params objects

        const transferFlow = transfer.from_address.toLowerCase() === address.toLowerCase() ? "Out" : "In"

        const transferLogEvent = transfer.log_events.filter(logEvent => {
            //here, I want to return true only for those that are transfer events.
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

        const from = transferFlow === "Out" ? address : transfer.from_address
        // const to = transferFlow === "Out" ? transfer.to_address : address
        // console.log(transferLogEvent)
        const to = transferFlow === "Out" ? transferLogEvent[0].decoded.params[1].value : address //Notes on this field: this specifies where the funds are transferred to. Not the contract interacted with.
        const date = transfer.block_signed_at.slice(0,10)
        const tokenName = transferLogEvent[0].sender_name
        const tokenSymbol = transferLogEvent[0].sender_contract_ticker_symbol
        const tokenLogo = transferLogEvent[0].sender_logo_url
        const transferValue = parseInt(transferLogEvent[0].decoded.params[2].value) / (10**parseInt(transferLogEvent[0].sender_contract_decimals))
        const tokenAddress = transferLogEvent[0].sender_address
        const txnHash = transfer.tx_hash


        const multiLegChecker = () => { //this function checks whether the txn contains multiple transfers. Returns true when there's > 1 transfers events
            let transfersNum = 0
            for (let i = 0; i < transfer.log_events.length; i++) {
                // console.log("log events:", transfer.log_events[i])
                //Okay, there are still log events that are not decoded. For those that are not decoded,
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
        const isMultiLeg = multiLegChecker()

        let multiLegTransfers = []
        if (isMultiLeg) {
            multiLegTransfers = innerTransfersLogItem.map(transfersItem => {
                const fromAddress = transfersItem.decoded.params[0].value
                const toAddress = transfersItem.decoded.params[1].value
                const value = parseInt(transfersItem.decoded.params[2].value)/ (10**parseInt(transferLogEvent[0].sender_contract_decimals))
                const innerTokenLogo = transfersItem.sender_logo_url
                const innerTokenName = transfersItem.sender_name
                const logOffset = transfersItem.log_offset
                return {
                    fromAddress,
                    toAddress,
                    value,
                    innerTokenLogo,
                    innerTokenName,
                    logOffset
                }
            })
        }
        multiLegTransfers.sort((a, b) => parseFloat(a.logOffset) - parseFloat(b.logOffset)) // Sort the transfer events by the order in which they occur within the txn

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
            isMultiLeg,
            multiLegTransfers
        }
    })

    // Warning: This exclusion logic (for NFTs) is predicated upon `transferValue` field being 0. This is a hot fix - there are many cases where
    // the `transferValue` field is not 0 for NFTs, and another filter logic must be written.
    const transfersWithoutNFTs = transfers.filter(transfer => {
        if (isNaN(transfer.transferValue)) {
            return false
        } else {
            return true
        }
    })
    return transfersWithoutNFTs
    // console.log("transfers",transfers)

}

const etherscanURL = "https://etherscan.io/"

const handleImgError = (e) => {
  e.target.src = "https://res.cloudinary.com/dl4murstw/image/upload/v1659590465/default-logo_om9kbi.png"
}

const multiLegTableColumns = [
    {
        title: 'From',
        dataIndex: 'fromAddress',
        key: 'from',
        render: (text) => <a href={etherscanURL + 'address/' + text}>{truncateEthAddress(text)}</a>
    },
    {
        title: 'To',
        dataIndex: 'toAddress',
        key: 'to',
        render: (text) => <a href={etherscanURL + 'address/' + text}>{truncateEthAddress(text)}</a>
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value'
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
    multiLegTableColumns
}
