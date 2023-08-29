import { AAVETokens, PositionTransition, strategies } from '@oasisdex/dma-library'
import { getAddresses } from 'actions/aave/get-addresses'
import { networkIdToLibraryNetwork, swapCall } from 'actions/aave/helpers'
import { AdjustAaveParameters } from 'actions/aave/types'
import { getRpcProvider } from 'blockchain/networks'
import { ProxyType } from 'features/aave/types'
import { LendingProtocol } from 'lendingProtocols'

export async function getAdjustPositionParameters({
  userAddress,
  proxyAddress,
  slippage,
  riskRatio,
  currentPosition,
  proxyType,
  positionType,
  protocol,
  networkId,
}: AdjustAaveParameters): Promise<PositionTransition> {
  try {
    const provider = getRpcProvider(networkId)

    const collateralToken = {
      symbol: currentPosition.collateral.symbol as AAVETokens,
      precision: currentPosition.collateral.precision,
    }

    const debtToken = {
      symbol: currentPosition.debt.symbol as AAVETokens,
      precision: currentPosition.debt.precision,
    }

    type strategyArguments = Parameters<typeof strategies.aave.multiply.v2.adjust>[0] &
      Parameters<typeof strategies.aave.multiply.v3.adjust>[0]
    type strategyDependencies = Parameters<typeof strategies.aave.multiply.v2.adjust>[1] &
      Parameters<typeof strategies.aave.multiply.v3.adjust>[1]

    const args: strategyArguments = {
      slippage,
      multiple: riskRatio,
      debtToken: debtToken,
      collateralToken: collateralToken,
      positionType,
    }

    const stratDeps: Omit<strategyDependencies, 'addresses' | 'getSwapData'> = {
      currentPosition,
      provider: provider,
      proxy: proxyAddress,
      user: userAddress,
      isDPMProxy: proxyType === ProxyType.DpmProxy,
      network: networkIdToLibraryNetwork(networkId),
    }

    switch (protocol) {
      case LendingProtocol.AaveV2:
        const addressesV2 = getAddresses(networkId, 'v2')
        return await strategies.aave.multiply.v2.adjust(args, {
          ...stratDeps,
          addresses: addressesV2,
          getSwapData: swapCall(addressesV2, networkId),
        })
      case LendingProtocol.AaveV3:
        const addressesV3 = getAddresses(networkId, 'v3')
        return await strategies.aave.multiply.v3.adjust(args, {
          ...stratDeps,
          addresses: addressesV3,
          getSwapData: swapCall(addressesV3, networkId),
        })
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}
