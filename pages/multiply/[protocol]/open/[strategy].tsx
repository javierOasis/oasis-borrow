import { WithWalletConnection } from 'components/connectWallet/ConnectWallet'
import { AppLayout } from 'components/Layouts'
import { strategyConfig } from 'features/aave/featureConfig'
import { AaveOpenView } from 'features/aave/open/containers/AaveOpenView'
import { Survey } from 'features/survey'
import { WithTermsOfService } from 'features/termsOfService/TermsOfService'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { BackgroundLight } from 'theme/BackgroundLight'

import { AaveContextProvider } from '../../../../features/aave/AaveContextProvider'

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ['common'])),
      strategy: ctx.query.strategy || null,
    },
  }
}

function OpenVault({ strategy: _strategy }: { strategy: string }) {
  return (
    <AaveContextProvider>
      <WithWalletConnection>
        <WithTermsOfService>
          <BackgroundLight />

          <AaveOpenView config={strategyConfig['aave-usdc']} />

          <Survey for="earn" />
        </WithTermsOfService>
      </WithWalletConnection>
    </AaveContextProvider>
  )
}

OpenVault.layout = AppLayout

export default OpenVault