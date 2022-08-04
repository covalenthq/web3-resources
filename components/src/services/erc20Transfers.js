import axios from 'axios'
import erc20TransfersHelper from '../utils/erc20TransfersHelper'

//This function makes an axios call to the erc20Transfers of Covalent API, and cleans up the response
//using two helper functions: .filterForTransfers() and .pruneTransfers()

const getERC20Transfers = async (address, chainId) => {
    const apiKey = process.env.REACT_APP_COVALENT_API_KEY // Supply your API key in the .env file
    const transactionsDataUrl = `https://api.covalenthq.com/v1/${chainId}/address/${address}/transactions_v2/`

    try {
        const res = await axios.get(transactionsDataUrl, {
            auth: {
                username: apiKey
            }
        })

        const transfersData = erc20TransfersHelper.filterForTransfers(res.data) // Get only txns that contain transfers log events.
        console.log(transfersData)

        const transfers = erc20TransfersHelper.pruneTransfers(transfersData, address) //Prune those messy txn objects to return an array of the following objects: 
        // {
        //     transferFlow,
        //     from,
        //     to,
        //     tokenName,
        //     tokenSymbol,
        //     tokenLogo,
        //     transferValue,
        //     tokenAddress,
        //     txnHash,
        //     isMultiLeg,
        //     multiLegTransfers // This needs to be an array of objects [{from, to, value}]
        // }

        // console.log("Transfers is: ", transfers)

        return transfers

    } catch (err) {
        console.log("Unable to get data, error message:", err)
    }

}



export default getERC20Transfers
