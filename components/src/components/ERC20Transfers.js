import React, { useState, useEffect } from 'react'
import { Table, Popover, Button } from 'antd'
import { WarningOutlined, InfoCircleOutlined } from '@ant-design/icons'
import "antd/dist/antd.css"
import erc20Transfers from '../services/erc20Transfers'
import erc20TransfersHelper from '../utils/erc20TransfersHelper'
import truncateEthAddress from 'truncate-eth-address'

//**********************************************
//*             Component description
//**********************************************

//This component takes `address` and `chainId` as prop, and returns a table (powered by antd) that displays
//the ERC20 transfers made by that address on the specific chain.

// The table contains the following columns:
// - from
// - to
// - transfer flow
// - token address
// - token name
// - token symbol
// - amount
// - txn hash

// (Note: The columns can be adjusted to display other fields returned by Covalent API's `Get Transactions for Address` endpoint)

//**********************************************
//*             Erc20 Transfers Component
//**********************************************

const ERC20Transfers = ({address, chainId}) => {


    const etherscanURL = "https://etherscan.io/"
    const [txnData, setTxnData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleImgError = (e) => {
      e.target.src = "https://res.cloudinary.com/dl4murstw/image/upload/v1659590465/default-logo_om9kbi.png"
    }

    useEffect(() => {
       const fetchErc20Transfers = async () => {
           setIsLoading(true)
           const data = await erc20Transfers(address, chainId)
           setTxnData(data)
           setIsLoading(false)
       }
       fetchErc20Transfers()
   }, [address])

   //columns is an array of column objects that you supply into the Table component of antd as prop. For more info, refer to: https://ant.design/components/table/
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
           render: (text) => <a href={etherscanURL + 'address/' + text}>{truncateEthAddress(text)}</a>
       },
       {    //The `to` field is a little complicated in its derivation. In the original Covalent response object, the `to` field gives us the address
           // of the ERC20 token in the case of a simple transfer. This is because technically we're interacting with the ERC20 token contract. However, in our case, we want to display
           // the *recipient* of the ERC20 token transfer.

           //Now, this would have been simple if we supply the `to` field from the transfers log event, but there exists transactions with multiple transfer
           //events. Hence, the first step here is to determine if the transaction in question is a 'multi-leg' txn, defined as a txn containing multiple
           // transfer events. If it is not (for instance in the case of a simple transfer), then we can display the `to` value from the transfer log event.
           // If it is, then we shall reflect that it is a multi-leg txn, and display all transfer events accordingly. This most accurately reflect the nature
           // of the particular transaction, which is one involving multiple transfers of tokens within a single transaction.
           title: 'To',
           dataIndex: 'to',
           key: 'to',
           render: (text, record) => {
               if (!record.isMultiLeg) {
                   return <a href={etherscanURL + 'address/' + text}>{truncateEthAddress(text)}</a>
               } else {
                   // console.log("record.multiLegTransfers",record.multiLegTransfers)
                   // console.log("erc20Transfers.multiLegTableColumns", erc20TransfersHelper.multiLegTableColumns)

                   //This is the content that we provide to the popover table.
                   const multiLegContent = (
                       <>
                       <Table dataSource={record.multiLegTransfers} columns={erc20TransfersHelper.multiLegTableColumns}/>
                       <InfoCircleOutlined /><em> Multi-leg transfers are transactions that have multiple transfer events.</em>
                       </>
                   )
                   return (
                       <Popover placement="rightBottom" content={multiLegContent} trigger="focus">
                        <Button> <span><WarningOutlined style={{fontSize: '1em'}}/> Multi-Leg</span></Button>
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
           render: (text) => <a href={etherscanURL + 'address/' + text}>{truncateEthAddress(text)}</a>
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
           title: 'Amt',
           dataIndex: 'transferValue',
           key: 'transferValue'
       },
       {
           title: 'Txn',
           dataIndex: 'txnHash',
           key: 'txnHash',
           render: (txnHash) => <a href={etherscanURL + 'tx/' + txnHash}> View Transaction</a>
       }
   ]
   if (isLoading) {
       return (
           <Table loading={true} />
       )
   } else if (!isLoading && txnData) {
       console.log("txnData",txnData)
       return (
           <Table dataSource={txnData} columns={columns} />
       )
   }


}

export default ERC20Transfers
