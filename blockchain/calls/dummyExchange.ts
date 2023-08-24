import BigNumber from 'bignumber.js'
import dummyExchange from 'blockchain/abi-js/dummy-exchange'
import { getNetworkContracts } from 'blockchain/contracts'
import { NetworkIds } from 'blockchain/networks'
import { contractDesc } from 'blockchain/networks'
import { amountToWei } from 'blockchain/utils'
import { DummyExchange } from 'types/web3-v1-contracts'

import { CallDef } from './callsHelpers'

export const setExchangePrice: CallDef<{ price: BigNumber }, any> = {
  call: (_, { contract, chainId }) => {
    return contract<DummyExchange>(
      contractDesc(
        dummyExchange,
        getNetworkContracts(NetworkIds.MAINNET, chainId).defaultExchange.address,
      ),
    ).methods.setPrice
  },
  prepareArgs: ({ price }: { price: BigNumber }) => [amountToWei(price, 'DAI').toFixed(0)],
}
