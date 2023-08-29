import { AAVETokens, IPosition, views } from '@oasisdex/dma-library'
import { getAddresses } from 'actions/aave/get-addresses'
import { GetOnChainPositionParams } from 'actions/aave/types'
import { getRpcProvider } from 'blockchain/networks'
import { getToken } from 'blockchain/tokensMetadata'
import { LendingProtocol } from 'lendingProtocols'

export async function getOnChainPosition({
  networkId,
  proxyAddress,
  collateralToken,
  debtToken,
  protocol,
}: GetOnChainPositionParams): Promise<IPosition> {
  const provider = getRpcProvider(networkId)

  const _collateralToken = {
    symbol: collateralToken as AAVETokens,
    precision: getToken(collateralToken).precision,
  }

  const _debtToken = {
    symbol: debtToken as AAVETokens,
    precision: getToken(debtToken).precision,
  }

  if (protocol === LendingProtocol.AaveV3) {
    const addressesV3 = getAddresses(networkId, 'v3')
    return await views.aave.v3(
      {
        proxy: proxyAddress,
        collateralToken: _collateralToken,
        debtToken: _debtToken,
      },
      { addresses: addressesV3, provider },
    )
  }

  if (protocol === LendingProtocol.AaveV2) {
    const addressesV2 = getAddresses(networkId, 'v2')
    return await views.aave.v2(
      {
        proxy: proxyAddress,
        collateralToken: _collateralToken,
        debtToken: _debtToken,
      },
      { addresses: addressesV2, provider },
    )
  }

  throw new Error('Protocol not supported')
}
