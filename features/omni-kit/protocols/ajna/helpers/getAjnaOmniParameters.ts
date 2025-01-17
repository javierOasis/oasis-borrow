import type { AjnaCommonDependencies, AjnaCommonPayload, AjnaStrategy } from '@oasisdex/dma-library'
import { Network } from '@oasisdex/dma-library'
import type BigNumber from 'bignumber.js'
import { getNetworkContracts } from 'blockchain/contracts'
import { NetworkIds } from 'blockchain/networks'
import type { ethers } from 'ethers'
import type { AjnaGenericPosition } from 'features/ajna/common/types'
import { getAjnaCumulatives } from 'features/ajna/positions/common/helpers/getAjnaCumulatives'
import { getAjnaPoolAddress } from 'features/ajna/positions/common/helpers/getAjnaPoolAddress'
import { getAjnaPoolData } from 'features/ajna/positions/common/helpers/getAjnaPoolData'
import { getMaxIncreasedValue } from 'features/ajna/positions/common/helpers/getMaxIncreasedValue'
import {
  ajnaActionDepositGenerateBorrow,
  ajnaActionOpenBorrow,
  ajnaActionPaybackWithdrawBorrow,
} from 'features/omni-kit/protocols/ajna/actions/borrow'
import { ajnaActionAdjust, ajnaActionClose } from 'features/omni-kit/protocols/ajna/actions/common'
import {
  ajnaActionDepositEarn,
  ajnaActionOpenEarn,
  ajnaActionWithdrawEarn,
  ajnaOmniClaimEarn,
} from 'features/omni-kit/protocols/ajna/actions/earn'
import { ajnaActionOpenMultiply } from 'features/omni-kit/protocols/ajna/actions/multiply'
import {
  type OmniFormState,
  OmniBorrowFormAction,
  OmniEarnFormAction,
  OmniMultiplyFormAction,
} from 'features/omni-kit/types'

interface AjnaTxHandlerInput {
  chainId: NetworkIds
  collateralAddress: string
  collateralPrecision: number
  collateralPrice: BigNumber
  collateralToken: string
  isFormValid: boolean
  position: AjnaGenericPosition
  price?: BigNumber
  quoteAddress: string
  quotePrecision: number
  quotePrice: BigNumber
  quoteToken: string
  rpcProvider: ethers.providers.Provider
  simulation?: AjnaGenericPosition
  slippage: BigNumber
  state: OmniFormState
  walletAddress?: string
}

export async function getAjnaOmniParameters({
  chainId,
  collateralAddress,
  collateralPrecision,
  collateralPrice,
  collateralToken,
  isFormValid,
  position,
  price,
  quoteAddress,
  quotePrecision,
  quotePrice,
  quoteToken,
  rpcProvider,
  simulation,
  slippage,
  state,
  walletAddress,
}: AjnaTxHandlerInput): Promise<AjnaStrategy<AjnaGenericPosition> | undefined> {
  const defaultPromise = Promise.resolve(undefined)

  const { action, dpmAddress } = state
  const addressesConfig = getNetworkContracts(NetworkIds.MAINNET, chainId)
  const poolAddress = await getAjnaPoolAddress(collateralAddress, quoteAddress, chainId)

  const dependencies: AjnaCommonDependencies = {
    ajnaProxyActions: addressesConfig.ajnaProxyActions.address,
    poolInfoAddress: addressesConfig.ajnaPoolInfo.address,
    provider: rpcProvider,
    WETH: addressesConfig.tokens.ETH.address,
    getPoolData: getAjnaPoolData(chainId),
    getCumulatives: getAjnaCumulatives(chainId),
    network: Network.MAINNET,
  }

  const commonPayload: AjnaCommonPayload = {
    collateralTokenPrecision: collateralPrecision,
    dpmProxyAddress: dpmAddress,
    poolAddress,
    quoteTokenPrecision: quotePrecision,
    collateralPrice,
    quotePrice,
  }

  if (!isFormValid || !walletAddress) {
    return defaultPromise
  }

  switch (action) {
    case OmniBorrowFormAction.OpenBorrow: {
      return ajnaActionOpenBorrow({ state, commonPayload, dependencies })
    }
    case OmniBorrowFormAction.DepositBorrow:
    case OmniBorrowFormAction.GenerateBorrow: {
      return ajnaActionDepositGenerateBorrow({
        state,
        commonPayload,
        dependencies,
        position,
        simulation,
      })
    }
    case OmniBorrowFormAction.PaybackBorrow:
    case OmniBorrowFormAction.WithdrawBorrow: {
      return ajnaActionPaybackWithdrawBorrow({
        state: {
          ...state,
          paybackAmount:
            state.paybackAmount && state.paybackAmountMax
              ? getMaxIncreasedValue(state.paybackAmount, position.pool.interestRate)
              : state.paybackAmount,
        },
        commonPayload,
        dependencies,
        position,
        simulation,
      })
    }

    case OmniEarnFormAction.OpenEarn: {
      return ajnaActionOpenEarn({ state, commonPayload, dependencies, chainId, price })
    }
    case OmniEarnFormAction.DepositEarn: {
      return ajnaActionDepositEarn({ state, commonPayload, dependencies, position, price })
    }
    case OmniEarnFormAction.WithdrawEarn: {
      return ajnaActionWithdrawEarn({ state, commonPayload, dependencies, position, price })
    }
    case OmniEarnFormAction.ClaimEarn: {
      return ajnaOmniClaimEarn({ commonPayload, dependencies, position, price })
    }

    case OmniMultiplyFormAction.OpenMultiply: {
      return ajnaActionOpenMultiply({
        state,
        commonPayload,
        dependencies,
        chainId,
        collateralToken,
        quoteToken,
        walletAddress,
        pool: position.pool,
        slippage,
      })
    }
    case OmniBorrowFormAction.AdjustBorrow:
    case OmniMultiplyFormAction.AdjustMultiply: {
      return ajnaActionAdjust({
        state,
        commonPayload,
        dependencies,
        position,
        slippage,
        collateralToken,
        quoteToken,
      })
    }
    case OmniMultiplyFormAction.GenerateMultiply:
    case OmniMultiplyFormAction.DepositCollateralMultiply: {
      const { loanToValue } = state

      if (loanToValue) {
        return ajnaActionAdjust({
          state,
          commonPayload,
          dependencies,
          position,
          slippage,
          collateralToken,
          quoteToken,
        })
      }

      return ajnaActionDepositGenerateBorrow({
        state,
        commonPayload,
        dependencies,
        position,
        simulation,
      })
    }
    case OmniMultiplyFormAction.PaybackMultiply:
    case OmniMultiplyFormAction.WithdrawMultiply: {
      const { loanToValue } = state
      const resolvedState = {
        ...state,
        paybackAmount:
          state.paybackAmount && state.paybackAmountMax
            ? getMaxIncreasedValue(state.paybackAmount, position.pool.interestRate)
            : state.paybackAmount,
      }

      if (loanToValue) {
        return ajnaActionAdjust({
          state: resolvedState,
          commonPayload,
          dependencies,
          position,
          slippage,
          collateralToken,
          quoteToken,
        })
      }

      return ajnaActionPaybackWithdrawBorrow({
        state: resolvedState,
        commonPayload,
        dependencies,
        position,
        simulation,
      })
    }
    case OmniMultiplyFormAction.DepositQuoteMultiply: {
      // TODO here handling for complex action once available
      return defaultPromise
    }
    case OmniBorrowFormAction.CloseBorrow:
    case OmniMultiplyFormAction.CloseMultiply: {
      return ajnaActionClose({
        state,
        commonPayload,
        dependencies,
        position,
        collateralToken,
        quoteToken,
        slippage,
      })
    }
    default:
      return defaultPromise
  }
}
