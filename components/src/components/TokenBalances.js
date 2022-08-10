import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { Skeleton, Table } from 'antd'
import defaultLogo from '../assets/default-logo.png'

export const TokenBalances = ({address, chainId}) => {
  const [data, getData] = useState([])
  const [loading, setLoading] = useState(false)
  const apiKey = process.env.REACT_APP_COVALENT_API_KEY

  useEffect(() => { fetchData() }, [props.address, props.chainId])

  const handleImgError = (e) => {
    e.target.src = defaultLogo
  }

  const fetchData = () => {
    setLoading(true)
    let headers = new Headers()
    let authString = `${apiKey}:`
    headers.set('Authorization', 'Basic ' + btoa(authString))
    const URL = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false`
    fetch(URL, {method: 'GET', headers: headers})
      .then((res) =>
        res.json())

      .then((response) => {
        setLoading(false)
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
        <td>{Number.isInteger(item.balance/10**item.contract_decimals) ? (item.balance/10**item.contract_decimals : (item.balance/10**item.contract_decimals).toFixed(4) }</td>
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


  return (
    <>
      <div className="balances">
        <Skeleton loading={loading} active>
          <Table columns={columns} dataSource={data} />
        </Skeleton>
      </div>
    </>
  );
}

  