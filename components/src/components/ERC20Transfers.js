import { useState, useEffect } from 'react'
import { Table, Popover, Button } from 'antd'
import { WarningOutlined, InfoCircleOutlined } from '@ant-design/icons'
import 'antd/dist/antd.min.css'
import erc20TransfersHelper from '../utils/erc20TransfersHelper'
import truncateEthAddress from 'truncate-eth-address'
import defaultLogo from '../assets/default-logo.png'

const ERC20Transfers = ({address, chainId}) => {
    const blockexplorerURL = erc20TransfersHelper.blockExplorerURLs.filter(item => parseInt(item.chainId) === parseInt(chainId))[0].url
    const [txnData, setTxnData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const apiKey = process.env.REACT_APP_COVALENT_API_KEY
    const transactionsDataUrl = `https://api.covalenthq.com/v1/${chainId}/address/${address}/transactions_v2/`

    const handleImgError = (e) => {
      e.target.src = defaultLogo
    }

    const fetchData = () => {
        setIsLoading(true)
        let headers = new Headers()
        let authString = `${apiKey}:`
        headers.set('Authorization', 'Basic ' + btoa(authString))
        fetch(transactionsDataUrl, {method: 'GET', headers: headers})
            .then((res) => res.json())
            .then((res) => {
                const transfersData = erc20TransfersHelper.filterForTransfers(res)
                const transfers = erc20TransfersHelper.pruneTransfers(transfersData, address)
                setIsLoading(false)
                setTxnData(transfers)
            })
            .catch((err) => console.log(err.message))
    }

    useEffect(() => {
       fetchData()
   }, [address])


   const columns = [
       {
           title: 'Date',
           dataIndex: 'date',
           key: 'date'
       },
       {
           title: 'From',
           dataIndex: 'from',
           key: 'from',
           render: (text) => <a href={blockexplorerURL + 'address/' + text} target="_blank" rel="noopener noreferrer">{truncateEthAddress(text)}</a>
       },
       {
           title: 'To',
           dataIndex: 'to',
           key: 'to',
           render: (text, record) => {
               if (!record.isMultipleTransfers) {
                   return <a href={blockexplorerURL + 'address/' + text} target="_blank" rel="noopener noreferrer">{truncateEthAddress(text)}</a>
               } else {

                   //This is the content that we provide to the popover table.
                   const multiTransfersContent = (
                       <>
                       <Table dataSource={record.multipleTransfers} columns={erc20TransfersHelper.multiTransfersTableColumns(blockexplorerURL)}/>
                       <InfoCircleOutlined /><em> There are multiple transfer events in this single transaction.</em>
                       </>
                   )
                   return (
                       <Popover placement="rightBottom" content={multiTransfersContent} trigger="focus">
                        <Button> <span><WarningOutlined style={{fontSize: '1em'}}/> Multiple</span></Button>
                        </Popover>
                   )
               }
           }
       },
       {
           title: 'Flow',
           dataIndex: 'transferFlow',
           key: 'transferFlow'
       },
       {
           title: 'Token Address',
           dataIndex: 'tokenAddress',
           key: 'tokenAddress',
           render: (text) => <a href={blockexplorerURL + 'address/' + text} target="_blank" rel="noopener noreferrer">{truncateEthAddress(text)}</a>
       },
       {
           title: 'Token Logo',
           dataIndex: 'tokenLogo',
           key: 'tokenLogo',
           render: (text) => <img alt="token logo" onError={handleImgError} src={text} width="40"/>
       },
       {
           title: 'Token Name',
           dataIndex: 'tokenName',
           key: 'tokenName'
       },
       {
           title: 'Token Symbol',
           dataIndex: 'tokenSymbol',
           key: 'tokenSymbol'
       },
       {
           title: 'Amount',
           dataIndex: 'transferValue',
           key: 'transferValue'
       },
       {
           title: 'Transaction',
           dataIndex: 'txnHash',
           key: 'txnHash',
           render: (txnHash) => <a href={blockexplorerURL + 'tx/' + txnHash} target="_blank" rel="noopener noreferrer"> View Transaction</a>
       }
   ]
   if (isLoading) {
       return (
           <Table loading={true} />
       )
   } else if (!isLoading && txnData) {
       console.log("txnData",txnData)
       return (
           <Table dataSource={txnData} columns={columns} rowKey='txnHash' />
       )
   }
}

export default ERC20Transfers
