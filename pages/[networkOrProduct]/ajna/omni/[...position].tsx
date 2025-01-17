import { getNetworkContracts } from 'blockchain/contracts'
import { NetworkIds } from 'blockchain/networks'
import { GasEstimationContextProvider } from 'components/context/GasEstimationContextProvider'
import { ProductContextHandler } from 'components/context/ProductContextHandler'
import { isAddress } from 'ethers/lib/utils'
import { ajnaSeoTags } from 'features/ajna/common/consts'
import { isPoolOracless } from 'features/ajna/common/helpers/isOracless'
import { AjnaLayout, ajnaPageSeoTags } from 'features/ajna/common/layout'
import type { AjnaGenericPosition } from 'features/ajna/common/types'
import type { AjnaUnifiedHistoryEvent } from 'features/ajna/history/ajnaUnifiedHistoryEvent'
import type { AjnaPositionAuction } from 'features/ajna/positions/common/observables/getAjnaPositionAggregatedData'
import { OmniProductController } from 'features/omni-kit/controllers'
import { ajnaOmniSteps } from 'features/omni-kit/protocols/ajna/constants'
import { AjnaOmniProductController } from 'features/omni-kit/protocols/ajna/controllers/AjnaOmniProductController'
import { useAjnaOmniData } from 'features/omni-kit/protocols/ajna/hooks/useAjnaOmniData'
import { getOmniServerSideProps } from 'features/omni-kit/server'
import type { OmniProductPage } from 'features/omni-kit/types'
import { LendingProtocol } from 'lendingProtocols'
import type { GetServerSidePropsContext } from 'next'
import React from 'react'

type AjnaPositionPageProps = OmniProductPage

function AjnaPositionPage(props: AjnaPositionPageProps) {
  const { collateralToken, quoteToken } = props
  const isOracless = !!(
    collateralToken &&
    quoteToken &&
    isPoolOracless({ collateralToken, quoteToken })
  )

  return (
    <AjnaLayout>
      <ProductContextHandler>
        <GasEstimationContextProvider>
          <OmniProductController<
            AjnaPositionAuction,
            AjnaUnifiedHistoryEvent[],
            AjnaGenericPosition
          >
            {...props}
            controller={AjnaOmniProductController}
            isOracless={isOracless}
            protocol={LendingProtocol.Ajna}
            protocolHook={useAjnaOmniData}
            seoTags={ajnaSeoTags}
            steps={ajnaOmniSteps}
          />
        </GasEstimationContextProvider>
      </ProductContextHandler>
    </AjnaLayout>
  )
}

AjnaPositionPage.seoTags = ajnaPageSeoTags

export default AjnaPositionPage

export async function getServerSideProps({ locale, query }: GetServerSidePropsContext) {
  return getOmniServerSideProps({
    isProductPageValid: ({ collateralToken, quoteToken }) => {
      const supportedPools = Object.keys({
        ...getNetworkContracts(NetworkIds.MAINNET).ajnaPoolPairs,
        ...getNetworkContracts(NetworkIds.GOERLI).ajnaPoolPairs,
      })

      return (
        supportedPools.includes(`${collateralToken}-${quoteToken}`) ||
        (isAddress(collateralToken) && isAddress(quoteToken))
      )
    },
    locale,
    query,
  })
}
