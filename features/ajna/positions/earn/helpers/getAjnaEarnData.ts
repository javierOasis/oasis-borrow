import type { GetEarnData } from '@oasisdex/dma-library'
import BigNumber from 'bignumber.js'
import type { NetworkIds } from 'blockchain/networks'
import type { SubgraphsResponses } from 'features/subgraphLoader/types'
import { loadSubgraph } from 'features/subgraphLoader/useSubgraphLoader'
import { zero } from 'helpers/zero'

const defaultResponse = {
  lps: zero,
  priceIndex: null,
  earnCumulativeQuoteTokenDeposit: zero,
  earnCumulativeFeesInQuoteToken: zero,
  earnCumulativeQuoteTokenWithdraw: zero,
}

export const getAjnaEarnData: (networkId: NetworkIds) => GetEarnData =
  (networkId) => async (proxy: string, poolAddress: string) => {
    const { response } = (await loadSubgraph('Ajna', 'getAjnaEarnPositionData', networkId, {
      dpmProxyAddress: proxy.toLowerCase(),
      poolAddress: poolAddress.toLowerCase(),
    })) as SubgraphsResponses['Ajna']['getAjnaEarnPositionData']

    if (
      response &&
      'account' in response &&
      response.account &&
      response.account.earnPositions.length
    ) {
      const earnPosition = response.account.earnPositions[0]

      const cumulativeValues = {
        earnCumulativeQuoteTokenDeposit: new BigNumber(
          earnPosition.earnCumulativeQuoteTokenDeposit,
        ),
        earnCumulativeFeesInQuoteToken: new BigNumber(earnPosition.earnCumulativeFeesInQuoteToken),
        earnCumulativeQuoteTokenWithdraw: new BigNumber(
          earnPosition.earnCumulativeQuoteTokenWithdraw,
        ),
      }

      if (!earnPosition || !earnPosition.bucketPositions.length) {
        return {
          ...defaultResponse,
          ...cumulativeValues,
        }
      }

      return {
        lps: new BigNumber(earnPosition.bucketPositions[0].lps),
        priceIndex: new BigNumber(earnPosition.bucketPositions[0].index),
        ...cumulativeValues,
      }
    }

    return defaultResponse
  }
