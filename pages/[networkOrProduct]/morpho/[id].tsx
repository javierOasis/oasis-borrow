import type { MorphoPosition } from '@oasisdex/dma-library'
import { isSupportedNetwork, NetworkNames } from 'blockchain/networks'
import { GasEstimationContextProvider } from 'components/context/GasEstimationContextProvider'
import { ProductContextHandler } from 'components/context/ProductContextHandler'
import { morphoOmniSteps, morphoSeoTags } from 'features/morpho/common/consts'
import { MorphoLayout, morphoPageSeoTags } from 'features/morpho/common/layout'
import type { MorphoPositionAuction } from 'features/morpho/common/types'
import { MorphoProductController } from 'features/morpho/controllers/MorphoProductController'
import { OmniProductController } from 'features/omni-kit/controllers'
import { useMorphoOmniData } from 'features/omni-kit/protocols/morpho-blue/hooks/useMorphoOmniData'
import type { PositionHistoryEvent } from 'features/positionHistory/types'
import { LendingProtocol } from 'lendingProtocols'
import type { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

interface MorphoManagePositionPageProps {
  id: string
}

function MorphoManagePositionPage({ id }: MorphoManagePositionPageProps) {
  return (
    <MorphoLayout>
      <ProductContextHandler>
        <GasEstimationContextProvider>
          <OmniProductController<MorphoPositionAuction, PositionHistoryEvent[], MorphoPosition>
            id={id}
            flow="manage"
            protocol={LendingProtocol.MorphoBlue}
            controller={MorphoProductController}
            protocolHook={useMorphoOmniData}
            seoTags={morphoSeoTags}
            steps={morphoOmniSteps}
          />
        </GasEstimationContextProvider>
      </ProductContextHandler>
    </MorphoLayout>
  )
}

MorphoManagePositionPage.seoTags = morphoPageSeoTags

export default MorphoManagePositionPage

export async function getServerSideProps({ locale, query }: GetServerSidePropsContext) {
  const network = query.networkOrProduct as string
  const id = query.id as string

  if (
    isSupportedNetwork(network) &&
    network === NetworkNames.ethereumMainnet &&
    !isNaN(parseInt(id, 10))
  ) {
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
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