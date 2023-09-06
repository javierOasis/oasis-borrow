import React from 'react'
import { AppLink } from 'components/Links'
import { ListWithIcon } from 'components/ListWithIcon'
import { TxStatusCardProgress, TxStatusCardSuccess } from 'components/vault/TxStatusCard'
import { getEstimatedGasFeeTextOld, VaultChangesInformationItem } from 'components/vault/VaultChangesInformation'
import { WithArrow } from 'components/WithArrow'
import { ManageBorrowVaultStage } from 'features/borrow/manage/pipes/manageVault'
import { OpenVaultStage } from 'features/borrow/open/pipes/openVault'
import { ManageMultiplyVaultStage } from 'features/multiply/manage/pipes/manageMultiplyVault'
import { EXTERNAL_LINKS } from 'helpers/applicationLinks'
import { HasGasEstimation } from 'helpers/context/types'
import { staticFilesRuntimeUrl } from 'helpers/staticPaths'
import { CommonVaultState } from 'helpers/types'
import { Trans, useTranslation } from 'next-i18next'
import { Box, Image, Text } from 'theme-ui'

export function VaultProxyStatusCard({
  stage,
  proxyConfirmations,
  safeConfirmations,
  proxyTxHash,
  etherscan,
}: CommonVaultState) {
  const { t } = useTranslation()

  return (
    <>
      {stage === 'proxyInProgress' && (
        <TxStatusCardProgress
          etherscan={etherscan!}
          text={t('proxy-deployment-confirming', {
            proxyConfirmations: proxyConfirmations || 0,
            safeConfirmations,
          })}
          txHash={proxyTxHash!}
        />
      )}
      {stage === 'proxySuccess' && (
        <TxStatusCardSuccess
          text={t('proxy-deployment-confirming', {
            proxyConfirmations: safeConfirmations,
            safeConfirmations,
          })}
          etherscan={etherscan!}
          txHash={proxyTxHash!}
        />
      )}
    </>
  )
}

export function VaultProxyContentBox({
  stage,
  gasData,
}: {
  stage: OpenVaultStage | ManageBorrowVaultStage | ManageMultiplyVaultStage
  gasData: HasGasEstimation
}) {
  const { t } = useTranslation()

  return (
    <>
      {stage === 'proxySuccess' ? (
        <Image
          src={staticFilesRuntimeUrl('/static/img/proxy_complete.gif')}
          sx={{ display: 'block', maxWidth: '210px', mx: 'auto' }}
        />
      ) : (
        <>
          <ListWithIcon items={t('proxy-advantages', { returnObjects: true })} />
          {stage !== 'proxyInProgress' && (
            <Box>
              <Text as="p" sx={{ fontSize: 2, fontWeight: 'semiBold', mb: 3 }}>
                {t('creating-proxy-contract')}
              </Text>
              <VaultChangesInformationItem
                label={t('transaction-fee')}
                value={getEstimatedGasFeeTextOld(gasData)}
              />
            </Box>
          )}
        </>
      )}
    </>
  )
}

export function VaultProxySubtitle({
  stage,
}: {
  stage: OpenVaultStage | ManageBorrowVaultStage | ManageMultiplyVaultStage
}) {
  return (
    <Trans
      i18nKey={
        stage === 'proxySuccess' ? 'vault-form.subtext.proxy-success' : 'vault-form.subtext.proxy'
      }
      components={{
        1: <AppLink href={EXTERNAL_LINKS.KB.WHAT_IS_PROXY} sx={{ fontSize: 2 }} />,
        2: <WithArrow sx={{ display: 'inline', color: 'interactive100', fontWeight: 'body' }} />,
      }}
    />
  )
}
