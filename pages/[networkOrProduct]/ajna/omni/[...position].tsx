import { getNetworkContracts } from 'blockchain/contracts'
import { isSupportedNetwork, NetworkIds, NetworkNames } from 'blockchain/networks'
import { GasEstimationContextProvider } from 'components/context/GasEstimationContextProvider'
import { ProductContextHandler } from 'components/context/ProductContextHandler'
import { isAddress } from 'ethers/lib/utils'
import { ajnaProducts } from 'features/ajna/common/consts'
import { AjnaLayout, ajnaPageSeoTags } from 'features/ajna/common/layout'
import { AjnaOmniProductController } from 'features/omni-kit/controllers/ajna/AjnaOmniProductController'
import { OmniProductController } from 'features/omni-kit/controllers/common/OmniProductController'
import type { OmniProduct } from 'features/omni-kit/types/common.types'
import { LendingProtocol } from 'lendingProtocols'
import type { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

interface AjnaPositionPageProps {
  id: string
  pool: string
  product: OmniProduct
  collateralToken: string
  quoteToken: string
}

function AjnaPositionPage({ id, product, collateralToken, quoteToken }: AjnaPositionPageProps) {
  return (
    <AjnaLayout>
      <ProductContextHandler>
        <GasEstimationContextProvider>
          <OmniProductController
            collateralToken={collateralToken}
            flow={id ? 'manage' : 'open'}
            id={id}
            product={product}
            quoteToken={quoteToken}
            protocol={LendingProtocol.Ajna}
            controller={AjnaOmniProductController}
          />
        </GasEstimationContextProvider>
      </ProductContextHandler>
    </AjnaLayout>
  )
}

AjnaPositionPage.seoTags = ajnaPageSeoTags

export default AjnaPositionPage

export async function getServerSideProps({ locale, query }: GetServerSidePropsContext) {
  const network = query.networkOrProduct as string
  const [product, pool, id = null] = query.position as string[]
  const [collateralToken, quoteToken] = pool.split('-')
  const caseSensitiveCollateralToken = isAddress(collateralToken)
    ? collateralToken.toLowerCase()
    : collateralToken.toUpperCase()
  const caseSensitiveQuoteToken = isAddress(quoteToken)
    ? quoteToken.toLowerCase()
    : quoteToken.toUpperCase()
  const supportedPools = Object.keys({
    ...getNetworkContracts(NetworkIds.MAINNET).ajnaPoolPairs,
    ...getNetworkContracts(NetworkIds.GOERLI).ajnaPoolPairs,
  })

  if (
    isSupportedNetwork(network) &&
    network === NetworkNames.ethereumMainnet &&
    ajnaProducts.includes(product as OmniProduct) &&
    (supportedPools.includes(`${caseSensitiveCollateralToken}-${caseSensitiveQuoteToken}`) ||
      (isAddress(caseSensitiveCollateralToken) && isAddress(caseSensitiveQuoteToken)))
  ) {
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        product,
        collateralToken: caseSensitiveCollateralToken,
        quoteToken: caseSensitiveQuoteToken,
        pool,
        id,
      },
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/not-found',
    },
  }
}
