import BigNumber from 'bignumber.js'
import { IlkData } from 'blockchain/ilks'
import { Context } from 'blockchain/network'
import { Vault } from 'blockchain/vaults'
import { useAppContext } from 'components/AppContextProvider'
import { useGasEstimationContext } from 'components/GasEstimationContextProvider'
import { SidebarSection, SidebarSectionProps } from 'components/sidebar/SidebarSection'
import { BasicBSFormChange } from 'features/automation/common/state/basicBSFormChange'
import { BasicBSTriggerData } from 'features/automation/common/state/basicBSTriggerData'
import { getAutoBuyMinMaxValues } from 'features/automation/optimization/autoBuy/helpers'
import { SidebarAutoBuyEditingStage } from 'features/automation/optimization/autoBuy/sidebars/SidebarAutoBuyEditingStage'
import { SidebarAutoBuyRemovalEditingStage } from 'features/automation/optimization/autoBuy/sidebars/SidebarAutoBuyRemovalEditingStage'
import {
  errorsBasicBuyValidation,
  warningsBasicBuyValidation,
} from 'features/automation/optimization/autoBuy/validators'
import { commonOptimizationDropdownItems } from 'features/automation/optimization/common/dropdown'
import { ConstantMultipleTriggerData } from 'features/automation/optimization/constantMultiple/state/constantMultipleTriggerData'
import { StopLossTriggerData } from 'features/automation/protection/stopLoss/state/stopLossTriggerData'
import { SidebarAutomationFeatureCreationStage } from 'features/automation/sidebars/SidebarAutomationFeatureCreationStage'
import { VaultType } from 'features/generalManageVault/vaultType'
import { BalanceInfo } from 'features/shared/balanceInfo'
import { getPrimaryButtonLabel } from 'features/sidebar/getPrimaryButtonLabel'
import { getSidebarStatus } from 'features/sidebar/getSidebarStatus'
import { isDropdownDisabled } from 'features/sidebar/isDropdownDisabled'
import { SidebarFlow, SidebarVaultStages } from 'features/types/vaults/sidebarLabels'
import { extractCancelBSErrors, extractCancelBSWarnings } from 'helpers/messageMappers'
import { useFeatureToggle } from 'helpers/useFeatureToggle'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Grid } from 'theme-ui'

interface SidebarSetupAutoBuyProps {
  vault: Vault
  vaultType: VaultType
  ilkData: IlkData
  balanceInfo: BalanceInfo
  autoSellTriggerData: BasicBSTriggerData
  autoBuyTriggerData: BasicBSTriggerData
  stopLossTriggerData: StopLossTriggerData
  constantMultipleTriggerData: ConstantMultipleTriggerData
  isAutoBuyOn: boolean
  context: Context
  ethMarketPrice: BigNumber
  basicBuyState: BasicBSFormChange
  txHandler: () => void
  textButtonHandler: () => void
  stage: SidebarVaultStages
  isAddForm: boolean
  isRemoveForm: boolean
  isEditing: boolean
  isDisabled: boolean
  isFirstSetup: boolean
  debtDelta: BigNumber
  collateralDelta: BigNumber
  isAutoBuyActive: boolean
}

export function SidebarSetupAutoBuy({
  vault,
  vaultType,
  ilkData,
  balanceInfo,
  context,
  ethMarketPrice,

  autoSellTriggerData,
  autoBuyTriggerData,
  stopLossTriggerData,
  constantMultipleTriggerData,

  basicBuyState,
  txHandler,
  textButtonHandler,
  stage,

  isAddForm,
  isRemoveForm,
  isEditing,
  isDisabled,
  isFirstSetup,

  debtDelta,
  collateralDelta,
  isAutoBuyActive,
}: SidebarSetupAutoBuyProps) {
  const { t } = useTranslation()

  const gasEstimation = useGasEstimationContext()

  const { uiChanges } = useAppContext()
  const constantMultipleEnabled = useFeatureToggle('ConstantMultiple')
  const isMultiplyVault = vaultType === VaultType.Multiply

  const flow: SidebarFlow = isRemoveForm
    ? 'cancelBasicBuy'
    : isFirstSetup
    ? 'addBasicBuy'
    : 'editBasicBuy'

  const sidebarStatus = getSidebarStatus({
    stage,
    txHash: basicBuyState.txDetails?.txHash,
    flow,
    etherscan: context.etherscan.url,
  })

  const primaryButtonLabel = getPrimaryButtonLabel({ flow, stage })

  const errors = errorsBasicBuyValidation({
    basicBuyState,
    autoSellTriggerData,
    constantMultipleTriggerData,
    isRemoveForm,
  })

  const { min, max } = getAutoBuyMinMaxValues({
    autoSellTriggerData,
    stopLossTriggerData,
    ilkData,
  })

  const warnings = warningsBasicBuyValidation({
    vault,
    gasEstimationUsd: gasEstimation?.usdValue,
    ethBalance: balanceInfo.ethBalance,
    ethPrice: ethMarketPrice,
    minSellPrice: basicBuyState.maxBuyOrMinSellPrice,
    isStopLossEnabled: stopLossTriggerData.isStopLossEnabled,
    isAutoSellEnabled: autoSellTriggerData.isTriggerEnabled,
    basicBuyState,
    sliderMin: min,
    withThreshold: basicBuyState.withThreshold,
  })

  const cancelAutoBuyWarnings = extractCancelBSWarnings(warnings)
  const cancelAutoBuyErrors = extractCancelBSErrors(errors)

  if (isAutoBuyActive) {
    const validationErrors = isAddForm ? errors : cancelAutoBuyErrors

    const sidebarSectionProps: SidebarSectionProps = {
      title: t('auto-buy.form-title'),
      ...(constantMultipleEnabled &&
        isMultiplyVault && {
          dropdown: {
            forcePanel: 'autoBuy',
            disabled: isDropdownDisabled({ stage }),
            items: commonOptimizationDropdownItems(uiChanges, t),
          },
        }),
      content: (
        <Grid gap={3}>
          {(stage === 'editing' || stage === 'txFailure') && (
            <>
              {isAddForm && (
                <SidebarAutoBuyEditingStage
                  vault={vault}
                  ilkData={ilkData}
                  basicBuyState={basicBuyState}
                  isEditing={isEditing}
                  autoBuyTriggerData={autoBuyTriggerData}
                  errors={errors}
                  warnings={warnings}
                  debtDelta={debtDelta}
                  collateralDelta={collateralDelta}
                  sliderMin={min}
                  sliderMax={max}
                />
              )}
              {isRemoveForm && (
                <SidebarAutoBuyRemovalEditingStage
                  vault={vault}
                  ilkData={ilkData}
                  errors={cancelAutoBuyErrors}
                  warnings={cancelAutoBuyWarnings}
                  basicBuyState={basicBuyState}
                />
              )}
            </>
          )}
          {(stage === 'txSuccess' || stage === 'txInProgress') && (
            <SidebarAutomationFeatureCreationStage
              featureName="Auto-Buy"
              stage={stage}
              isAddForm={isAddForm}
              isRemoveForm={isRemoveForm}
            />
          )}
        </Grid>
      ),
      primaryButton: {
        label: primaryButtonLabel,
        disabled: isDisabled || !!validationErrors.length,
        isLoading: stage === 'txInProgress',
        action: () => txHandler(),
      },
      ...(stage !== 'txInProgress' && {
        textButton: {
          label: isAddForm ? t('system.remove-trigger') : t('system.add-trigger'),
          hidden: basicBuyState.triggerId.isZero(),
          action: () => textButtonHandler(),
        },
      }),
      status: sidebarStatus,
    }

    return <SidebarSection {...sidebarSectionProps} />
  }
  return null
}