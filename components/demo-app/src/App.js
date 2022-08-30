import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { Input, Menu } from 'antd';
import './App.css';
import { TokenBalances, ERC20Transfers, TokenHolders} from '@covalenthq/web3-components';

const { Search } = Input;

const FormControl = ({placeholder, onSearch}) => {
  return (
    <Search placeholder={placeholder} onSearch={onSearch}
      style={{
        width: 500,
      }}
    />
  )
}

const items = [
  {
    label: (
      <Link to="/">Token Balances</Link>
    ),
    key: 'tokenBalances',
  },
  {
    label: (
      <Link to="/erc20Transfers">ERC20 Transfers</Link>
    ),
    key: 'erc20Transfers'
  },
  {
    label: (
      <Link to="/tokenHolders">Token Holders</Link>
    ),
    key: 'tokenHolders'
  }
]

const SearchTokenBalances = () => {
  const [address, setAddress] = useState(null)
  const [chainId, setChainId] = useState(1)

  const onSearch = (value) => setAddress(value);
  
  return(
    <div className="App" style={{ width: "100vw", padding: "25px" }}>
      <FormControl placeholder="Enter an Ethereum wallet address or ENS" onSearch={onSearch} />
      <div>
        <br></br>
        <p><b>Provided Address:</b> {address}</p>
        <p><b>Set Chain Id:</b> {chainId}</p>
        <TokenBalances address={address} chainId={chainId} />
      </div>
    </div>
  )
}

const SearchTokenHolders = () => {
  const [tokenAddress, setTokenAddress] = useState(null)
  const [chainId, setChainId] = useState(1)

  const onSearch = (value) => setTokenAddress(value);
  
  return(
    <div className="App" style={{ width: "100vw", padding: "25px" }}>
      <FormControl placeholder="Enter an Ethereum token (ERC20 or NFT) contract address" onSearch={onSearch} />
      <div>
        <br></br>
        <TokenHolders tokenAddress={tokenAddress} chainId={chainId} />
      </div>
    </div>
  )
}

const SearchERC20Transfers = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const [chainId, setChainId] = useState(1)

  const onSearch = (value) => setWalletAddress(value);
  
  return(
    <div className="App" style={{ width: "100vw", padding: "25px" }}>
      <FormControl placeholder="Enter an Ethereum wallet address or ENS" onSearch={onSearch} />
      <div>
        <br></br>
        <p><b>Provided Address:</b> {walletAddress}</p>
        <p><b>Set Chain Id:</b> {chainId}</p>
        <ERC20Transfers address={walletAddress} chainId={chainId} />
      </div>
    </div>
  )
}

function App() {
  const [current, setCurrent] = useState('tokenBalances')

  const onClick = (e) => {
    setCurrent(e.key)
  }
  
  return (
    <Router>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <Routes>
          <Route path="/" element={<SearchTokenBalances />} />
          <Route path="/erc20Transfers" element={<SearchERC20Transfers />} />
          <Route path="/tokenHolders" element={<SearchTokenHolders />} />
        </Routes>
    </Router>
  );
}

export default App;
