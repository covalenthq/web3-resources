import { useState, useEffect } from 'react'
import 'antd/dist/antd.min.css'
import { Table } from 'antd'
import defaultLogo from '../assets/default-logo.png'

const TokenBalances = ({address, chainId}) => {
  const [data, getData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const apiKey = process.env.REACT_APP_COVALENT_API_KEY

  useEffect(() => { fetchData() }, [address, chainId])

  const handleImgError = (e) => {
    e.target.src = defaultLogo
  }

  const fetchData = () => {
    setIsLoading(true)
    let headers = new Headers()
    let authString = `${apiKey}:`
    headers.set('Authorization', 'Basic ' + btoa(authString))
    const URL = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false`
    fetch(URL, {method: 'GET', headers: headers})
      .then((res) => res.json())
      .then((response) => {
        setIsLoading(false)
        getData(response.data.items)
      })
  }

  const columns = [
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
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      sorter: (a, b) => a.balance - b.balance,
      render: (_, item) => (
        Number.isInteger(item.balance/10**item.contract_decimals) ? (item.balance/10**item.contract_decimals) : (item.balance/10**item.contract_decimals).toFixed(4)
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        {
          text: 'cryptocurrency',
          value: 'cryptocurrency',
        },
        {
          text: 'stablecoin',
          value: 'stablecoin',
        },
        {
          text: 'nft',
          value: 'nft',
        },
        {
          text: 'dust',
          value: 'dust',
        },
      ],
      onFilter: (value, item) => item.type.startsWith(value),
    },
    {
      title: 'Contract Address',
      dataIndex: 'contract_address',
      key: 'contract_address',
    }, 
  ]

  if (isLoading) {
    return (
        <Table loading={true} />
    )
  } else if (!isLoading && data) {
      return (
          <Table columns={columns} dataSource={data} rowKey='contract_address' />
      )
  }
}


export default TokenBalances;
  