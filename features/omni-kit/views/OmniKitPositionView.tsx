import { TabBar } from 'components/TabBar'
import type { VaultHeadlineProps } from 'components/vault/VaultHeadline'
import { VaultHeadline } from 'components/vault/VaultHeadline'
import { VaultOwnershipBanner } from 'features/notices/VaultsNoticesView'
import { useAppConfig } from 'helpers/config'
import { useAccount } from 'helpers/useAccount'
import { useTranslation } from 'next-i18next'
import type { ReactNode } from 'react'
import React from 'react'
import { Box, Container } from 'theme-ui'

interface OmniKitPositionViewProps {
  dpmProxy?: string
  headline: VaultHeadlineProps
  isOwner: boolean
  isSetup: boolean
  owner: string
  tabs: {
    history?: ReactNode
    info?: ReactNode
    position: ReactNode
  }
}

export function OmniKitPositionView({
  dpmProxy,
  headline,
  isOwner,
  isSetup,
  owner,
  tabs: { position, history, info },
}: OmniKitPositionViewProps) {
  const { t } = useTranslation()

  const { walletAddress } = useAccount()
  const { ProxyReveal: proxyReveal } = useAppConfig('features')

  return (
    <Container variant="vaultPageContainerStatic">
      {!isOwner && (
        <Box sx={{ mb: 4 }}>
          <VaultOwnershipBanner controller={owner} account={walletAddress} />
        </Box>
      )}
      <VaultHeadline
        {...headline}
        onClick={
          proxyReveal
            ? () => console.info(`DPM proxy: ${dpmProxy?.toLowerCase()}, DPM owner: ${owner}`)
            : undefined
        }
      />

      <TabBar
        variant="underline"
        sections={[
          {
            value: isSetup ? 'setup' : 'overview',
            label: t(isSetup ? 'setup' : 'system.overview'),
            content: <>{position}</>,
          },
          ...(info
            ? [
                {
                  value: 'position-info',
                  label: t('system.position-info'),
                  content: <>{info}</>,
                },
              ]
            : []),
          ...(history && !isSetup
            ? [
                {
                  value: 'history',
                  label: t('system.history'),
                  content: <>{history}</>,
                },
              ]
            : []),
        ]}
      />
    </Container>
  )
}
