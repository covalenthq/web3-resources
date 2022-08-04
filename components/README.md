# Web3 Components Library

This web3 library is powered by the [Covalent Unified API](https://www.covalenthq.com/?utm_source=web3_components&utm_medium=docs) and consists of useful React components to fetch any on-chain data across any of the 30+ Covalent supported blockchain networks.

These components do not require an active web3 provider since data is hosted, indexed and queried from the Covalent Network. However, an [API Key](https://www.covalenthq.com/platform?utm_source=web3_components&utm_medium=docs) is required to use them.

Please refer to the [Covalent API reference](https://www.covalenthq.com/docs/api/#/0/0/USD/1?utm_source=web3_components&utm_medium=docs) for documentation on how the API works.

## Quick Start

Install with npm: `npm install @covalenthq/web3-components`

or

Install with yarn: `yarn install @covalenthq/web3-components`

## Web3 Components

### `<TokenBalances />`

**Demo Wallet Dashboard:** https://covalenthq.github.io/Wallet-Dashboard-Demo/

![Token balances demo](https://github.com/covalenthq/web3-resources/blob/main/components/src/assets/token-balances-rc-demo.gif?raw=true)

The `<TokenBalances />` component provides a complete and paginated balances table with all the ERC20 tokens and NFTs for a given wallet `address` and `chainId`.

#### Props:
- `apikey`
- `address`
- `chainId`


#### Sample code:
```jsx
import { TokenBalances } from '@covalenthq/web3-components';

function App() {
  return(
    <div className="TokenBalances">
      <TokenBalances
        apikey={process.env.REACT_APP_COVALENT_API_KEY}
        address="demo.eth"
        chainId="1"
      />
    </div>
  )
}

export default App;
```  

### `<Erc20Transfers />`  

**Demo Erc20Transfers page:**: https://xiaogit00.github.io/erc20transfers  

![Erc20Transfers Demo](https://res.cloudinary.com/dl4murstw/image/upload/v1659639221/Erc20Transfer_Demo2_ouzflg.gif?raw=true)

The Erc20Transfers component returns a paginated list of all the ERC20 token transfers of a wallet address on a particular chain. It takes an address and chainId as inputs. Powered by Covalent's [`Get Transactions for Address`](https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/1) endpoint.

You can find the component [here](https://github.com/xiaogit00/web3-resources/blob/erc20transfers/components/src/components/Erc20Transfers.js).

The component has these two dependencies:
- [erc20Transfers.js](https://github.com/xiaogit00/web3-resources/blob/erc20transfers/components/src/services/erc20Transfers.js) service
- [erc20TransfersHelper.js](https://github.com/xiaogit00/web3-resources/blob/erc20transfers/components/src/utils/erc20TransfersHelper.js)


#### Props:
- `address`  
- `chainId`  

#### Sample code:
*This page replicates the demo page above, by using a <FormControls> input field to supply the wallet address*

``` javascript
import React, { useState } from 'react'
import FormControls from './components/FormControls'
import Erc20Transfers from './components/Erc20Transfers'
import { Button } from 'antd'
import './App.less'


function App() {
    const [walletAddress, setWalletAddress] = useState(null)


    const onSubmit = (values) => {
        setWalletAddress(values)
    }



    if (walletAddress) {
        return (
            <>
            <div style={{width: "80%", margin: "auto"}}>
              <h1> {title}  </h1>
              <FormControls onSubmit={onSubmit}/>
              <Erc20Transfers address={walletAddress} chainId={1}/>
            </div>
            </>
        )
    } else {
        return (
            <>
            <div style={{width: "80%", margin: "auto"}}>
              <h1> {title}  </h1>
              <FormControls onSubmit={onSubmit}/>
            </div>
            </>
        )
    }
}

export default App;


```
