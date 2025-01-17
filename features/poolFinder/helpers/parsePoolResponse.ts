import { getPoolLiquidity } from '@oasisdex/dma-library'
import { EarnStrategies } from '@prisma/client'
import BigNumber from 'bignumber.js'
import type { IdentifiedTokens } from 'blockchain/identifyTokens.types'
import type { NetworkIds } from 'blockchain/networks'
import type { Tickers } from 'blockchain/prices.types'
import { NEGATIVE_WAD_PRECISION, WAD_PRECISION } from 'components/constants'
import { isPoolOracless } from 'features/ajna/common/helpers/isOracless'
import { isPoolWithRewards } from 'features/ajna/positions/common/helpers/isPoolWithRewards'
import type { SearchAjnaPoolData } from 'features/ajna/positions/common/helpers/searchAjnaPool.types'
import type { OraclessPoolResult } from 'features/poolFinder/types'
import {
  productHubAjnaRewardsTooltip,
  productHubEmptyPoolMaxLtvTooltip,
  productHubEmptyPoolWeeklyApyTooltip,
  productHubOraclessLtvTooltip,
} from 'features/productHub/content'
import { formatCryptoBalance } from 'helpers/formatters/format'
import { one } from 'helpers/zero'

export function parsePoolResponse(
  chainId: NetworkIds,
  identifiedTokens: IdentifiedTokens,
  pools: SearchAjnaPoolData[],
  prices: Tickers,
): OraclessPoolResult[] {
  return pools
    .filter(
      ({ collateralAddress, quoteTokenAddress }) =>
        Object.keys(identifiedTokens).includes(collateralAddress) &&
        Object.keys(identifiedTokens).includes(quoteTokenAddress),
    )
    .map(
      ({
        buckets,
        collateralAddress,
        debt,
        interestRate,
        lendApr,
        lowestUtilizedPrice,
        lowestUtilizedPriceIndex,
        quoteTokenAddress,
      }) => {
        const collateralToken = identifiedTokens[collateralAddress.toLowerCase()].symbol
        const quoteToken = identifiedTokens[quoteTokenAddress.toLowerCase()].symbol
        const isPoolNotEmpty = lowestUtilizedPriceIndex > 0
        const isOracless = isPoolOracless({ chainId, collateralToken, quoteToken })
        const collateralPrice = isOracless ? one : prices[collateralToken]
        const quotePrice = isOracless ? one : prices[quoteToken]
        const marketPrice = collateralPrice.div(quotePrice)
        const maxLtv = lowestUtilizedPrice.div(marketPrice).toString()
        const liquidity = formatCryptoBalance(
          getPoolLiquidity({
            buckets: buckets.map((bucket) => ({
              ...bucket,
              index: new BigNumber(bucket.index),
              quoteTokens: new BigNumber(bucket.quoteTokens),
            })),
            debt: debt.shiftedBy(WAD_PRECISION),
          }).shiftedBy(NEGATIVE_WAD_PRECISION),
        )
        const fee = interestRate.toString()
        const weeklyNetApy = lendApr.toString()

        return {
          ...(isPoolNotEmpty &&
            !isOracless && {
              maxLtv,
            }),
          ...(isPoolNotEmpty && {
            weeklyNetApy,
          }),
          liquidity,
          earnStrategy: EarnStrategies.liquidity_provision,
          earnStrategyDescription: `${collateralToken}/${quoteToken} LP`,
          fee,
          managementType: 'active',
          collateralAddress: collateralAddress,
          collateralToken: identifiedTokens[collateralAddress.toLowerCase()].symbol,
          collateralIcon:
            identifiedTokens[collateralAddress.toLowerCase()].source === 'blockchain'
              ? collateralAddress
              : collateralToken,
          quoteAddress: quoteTokenAddress,
          quoteToken: identifiedTokens[quoteTokenAddress.toLowerCase()].symbol,
          quoteIcon:
            identifiedTokens[quoteTokenAddress.toLowerCase()].source === 'blockchain'
              ? quoteTokenAddress
              : quoteToken,
          tooltips: {
            ...(isPoolWithRewards({ collateralToken, quoteToken }) && {
              fee: productHubAjnaRewardsTooltip,
              ...(isPoolNotEmpty && {
                weeklyNetApy: productHubAjnaRewardsTooltip,
              }),
            }),
            ...(!isOracless &&
              !isPoolNotEmpty && {
                maxLtv: productHubEmptyPoolMaxLtvTooltip,
              }),
            ...(!isPoolNotEmpty && {
              weeklyNetApy: productHubEmptyPoolWeeklyApyTooltip,
            }),
            ...(isOracless && {
              maxLtv: productHubOraclessLtvTooltip,
            }),
          },
        }
      },
    )
}
