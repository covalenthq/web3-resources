# Web3 Components Library

This web3 library is powered by the [Covalent Unified API](https://www.covalenthq.com/?utm_source=web3_components&utm_medium=docs) and consists of useful React components to fetch any on-chain data across any of the 30+ Covalent supported blockchain networks.

These components do not require an active web3 provider since data is hosted, indexed and queried from the Covalent Network. However, an [API Key](https://www.covalenthq.com/platform?utm_source=web3_components&utm_medium=docs) is required to use them.

Please refer to the [Covalent API reference](https://www.covalenthq.com/docs/api/#/0/0/USD/1?utm_source=web3_components&utm_medium=docs) for documentation on how the API works.

## Quick Start

Install with npm: `npm install @covalenthq/web3-components`

or

Install with yarn: `yarn install @covalenthq/web3-components`

Create an `.env` file and set your [Covalent API Key](https://covalenthq.com/platform/?utm_source=covalent-react&utm_medium=web3-resource) to the variable: `REACT_APP_COVALENT_API_KEY=`

## Web3 Components

### `<TokenBalances />`

**Demo Wallet Dashboard:** https://covalenthq.github.io/Wallet-Dashboard-Demo/

![Token balances demo](https://github.com/covalenthq/web3-resources/blob/main/components/src/assets/token-balances-rc-demo.gif?raw=true)

The `<TokenBalances />` component provides a complete and paginated balances table with all the ERC20 tokens and NFTs for a given wallet `address` and `chainId`.

#### Props:
- `address`
- `chainId`


#### Sample code:
```jsx
import { TokenBalances } from '@covalenthq/web3-components';

function App() {
  return(
    <div className="TokenBalances">
      <TokenBalances
        address="demo.eth"
        chainId="1"
      />
    </div>
  )
}

export default App;
```  

---

### `<ERC20Transfers />`  

**Demo ERC20Transfers page:**: https://covalenthq.github.io/erc20Transfers/

![ERC20Transfers Demo](https://res.cloudinary.com/dl4murstw/image/upload/v1660076187/Erc20Transfer_Demo6_ptashh.gif)

The ERC20Transfers component returns a paginated list of all the ERC20 token transfers of a wallet address on a particular chain. It takes an address and chainId as inputs. Powered by Covalent's [`Get Transactions for Address`](https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/1) endpoint.

#### Props:
- `address`  
- `chainId`  

#### Sample code:
``` jsx
import { useState } from 'react'
import { ERC20Transfers } from '@covalenthq/web3-components'
import { Input } from 'antd'
const { Search } = Input
const FormControls = ({onSubmit}) => {
    return (
        <Search placeholder='Enter Wallet Address or ENS' onSearch={onSubmit} enterButton
        style={{
            width: 500,
        }}/>
    )
}
function App() {
    const [walletAddress, setWalletAddress] = useState(null)
    const onSubmit = (values) => {
        setWalletAddress(values)
    }
    if (walletAddress) {
        return (
            <>
            <div style={{width: '80%', margin: 'auto'}}>
              <FormControls onSubmit={onSubmit}/>
              <ERC20Transfers address={walletAddress} chainId={1}/>
            </div>
            </>
        )
    } else {
        return (
            <>
            <div style={{width: '80%', margin: 'auto'}}>
              <FormControls onSubmit={onSubmit}/>
            </div>
            </>
        )
    }
}
export default App;

```
