import { useState, useEffect } from 'react'
import 'antd/dist/antd.min.css'
import { Table } from 'antd'
import defaultLogo from '../assets/default-logo.png'

const TokenHolders = ({tokenAddress, chainId, blockHeight = 'latest', pageSize = 99999}) => {
  const [data, getData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const apiKey = process.env.REACT_APP_COVALENT_API_KEY

  useEffect(() => { fetchData() }, [tokenAddress, chainId, blockHeight, pageSize])

  const handleImgError = (e) => {
    e.target.src = defaultLogo
  }

  const fetchData = () => {
    setIsLoading(true)
    let headers = new Headers()
    let authString = `${apiKey}:`
    headers.set('Authorization', 'Basic ' + btoa(authString))
    const URL = `https://api.covalenthq.com/v1/${chainId}/tokens/${tokenAddress}/token_holders/?quote-currency=USD&format=JSON&block-height=${blockHeight}&page-size=${pageSize}`
    fetch(URL, {method: 'GET', headers: headers})
      .then((res) => res.json())
      .then((response) => {
        setIsLoading(false)
        getData(response.data.items)
      })
  }

  const summaryColumn = [
    {
			title: '',
			dataIndex: 'logo_url',
			key: 'logo_url',
			render: text => <img src={text} onError={handleImgError} style={{width: '40px', height: '40px'}} />
    },
    {
			title: 'Name',
			dataIndex: 'contract_name',
			key: 'contract_name',
    },
    {
			title: 'Symbol',
			dataIndex: 'contract_ticker_symbol',
			key: 'contract_ticker_symbol',
    },
    {
			title: 'Token Address',
			dataIndex: 'contract_address',
			key: 'contract_address',
    },
    {
			title: 'Total Supply',
			dataIndex: 'total_supply',
			key: 'total_supply',
    },
    {
			title: 'Block Height',
			dataIndex: 'block_height',
			key: 'block_height',
    },
  ]


  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Balance / Token ID',
      dataIndex: 'balance',
      key: 'balance',
      sorter: (a, b) => a.balance - b.balance,
      render: (_, item) => (
        Number.isInteger(item.balance/10**item.contract_decimals) ? (item.balance/10**item.contract_decimals) : (item.balance/10**item.contract_decimals).toFixed(4)
      ),
    }, 
  ]

  if (isLoading) {
    return (
        <Table loading={true} />
    )
  } else if (!isLoading && data) {
      return (
        <> 
            <Table columns={summaryColumn} dataSource={data.slice(0,1)} pagination={false} rowKey='contract_address'  />
            <Table columns={columns} dataSource={data} rowKey='address' />
        </>
      )
  }
}


export default TokenHolders;
  