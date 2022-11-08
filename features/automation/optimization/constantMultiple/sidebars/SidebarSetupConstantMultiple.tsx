import BigNumber from 'bignumber.js'
import { useAutomationContext } from 'components/AutomationContextProvider'
import { useGasEstimationContext } from 'components/GasEstimationContextProvider'
import { SidebarSection, SidebarSectionProps } from 'components/sidebar/SidebarSection'
import { getAutoFeaturesSidebarDropdown } from 'features/automation/common/sidebars/getAutoFeaturesSidebarDropdown'
import { getAutomationFormFlow } from 'features/automation/common/sidebars/getAutomationFormFlow'
import { getAutomationFormTitle } from 'features/automation/common/sidebars/getAutomationFormTitle'
import { getAutomationPrimaryButtonLabel } from 'features/automation/common/sidebars/getAutomationPrimaryButtonLabel'
import { getAutomationStatusTitle } from 'features/automation/common/sidebars/getAutomationStatusTitle'
import { getAutomationTextButtonLabel } from 'features/automation/common/sidebars/getAutomationTextButtonLabel'
import { SidebarAutomationFeatureCreationStage } from 'features/automation/common/sidebars/SidebarAutomationFeatureCreationStage'
import { AutomationFeatures, SidebarAutomationStages } from 'features/automation/common/types'
import { SidebarConstantMultipleEditingStage } from 'features/automation/optimization/constantMultiple/sidebars/SidebarConstantMultipleEditingStage'
import { SidebarConstantMultipleRemovalEditingStage } from 'features/automation/optimization/constantMultiple/sidebars/SidebarConstantMultipleRemovalEditingStage'
import { ConstantMultipleFormChange } from 'features/automation/optimization/constantMultiple/state/constantMultipleFormChange'
import {
  errorsConstantMultipleValidation,
  warningsConstantMultipleValidation,
} from 'features/automation/optimization/constantMultiple/validators'
import { isDropdownDisabled } from 'features/sidebar/isDropdownDisabled'
import {
  extractCancelAutomationErrors,
  extractCancelAutomationWarnings,
} from 'helpers/messageMappers'
import React from 'react'
import { Grid } from 'theme-ui'

interface SidebarSetupConstantMultipleProps {
  collateralToBePurchased: BigNumber
  collateralToBeSold: BigNumber
  constantMultipleState: ConstantMultipleFormChange
  estimatedBuyFee: BigNumber
  estimatedGasCostOnTrigger?: BigNumber
  estimatedSellFee: BigNumber
  feature: AutomationFeatures
  isAddForm: boolean
  isConstantMultipleActive: boolean
  isDisabled: boolean
  isEditing: boolean
  isFirstSetup: boolean
  isRemoveForm: boolean
  nextBuyPrice: BigNumber
  nextSellPrice: BigNumber
  debtDeltaWhenSellAtCurrentCollRatio: BigNumber
  debtDeltaAfterSell: BigNumber
  stage: SidebarAutomationStages
  textButtonHandler: () => void
  txHandler: () => void
}

export function SidebarSetupConstantMultiple({
  collateralToBePurchased,
  collateralToBeSold,
  constantMultipleState,
  estimatedBuyFee,
  estimatedGasCostOnTrigger,
  estimatedSellFee,
  feature,
  isAddForm,
  isConstantMultipleActive,
  isDisabled,
  isEditing,
  isFirstSetup,
  isRemoveForm,
  nextBuyPrice,
  nextSellPrice,
  stage,
  textButtonHandler,
  txHandler,
  debtDeltaWhenSellAtCurrentCollRatio,
  debtDeltaAfterSell,
}: SidebarSetupConstantMultipleProps) {
  const gasEstimation = useGasEstimationContext()
  const {
    autoBuyTriggerData,
    autoSellTriggerData,
    autoTakeProfitTriggerData,
    constantMultipleTriggerData,
    stopLossTriggerData,
    environmentData: { ethBalance, ethMarketPrice, etherscanUrl },
    positionData: { debt, debtFloor, collateralizationRatioAtNextPrice, token, vaultType },
  } = useAutomationContext()

  const flow = getAutomationFormFlow({ isFirstSetup, isRemoveForm, feature })
  const sidebarTitle = getAutomationFormTitle({
    flow,
    stage,
    feature,
  })
  const dropdown = getAutoFeaturesSidebarDropdown({
    type: 'Optimization',
    forcePanel: AutomationFeatures.CONSTANT_MULTIPLE,
    disabled: isDropdownDisabled({ stage }),
    isAutoBuyEnabled: autoBuyTriggerData.isTriggerEnabled,
    isAutoConstantMultipleEnabled: constantMultipleTriggerData.isTriggerEnabled,
    isAutoTakeProfitEnabled: autoTakeProfitTriggerData.isTriggerEnabled,
    vaultType,
  })
  const primaryButtonLabel = getAutomationPrimaryButtonLabel({
    flow,
    stage,
    feature,
  })
  const textButtonLabel = getAutomationTextButtonLabel({ isAddForm })
  const sidebarStatus = getAutomationStatusTitle({
    stage,
    txHash: constantMultipleState.txDetails?.txHash,
    flow,
    etherscan: etherscanUrl,
    feature,
  })

  const errors = errorsConstantMultipleValidation({
    constantMultipleState,
    isRemoveForm,
    debtDeltaWhenSellAtCurrentCollRatio,
    debtDeltaAfterSell,
    debtFloor,
    debt,
    nextBuyPrice,
    nextSellPrice,
  })
  const warnings = warningsConstantMultipleValidation({
    debtFloor,
    gasEstimationUsd: gasEstimation?.usdValue,
    ethBalance,
    ethPrice: ethMarketPrice,
    sliderMin: constantMultipleState.minTargetRatio,
    isStopLossEnabled: stopLossTriggerData.isStopLossEnabled,
    isAutoBuyEnabled: autoBuyTriggerData.isTriggerEnabled,
    isAutoSellEnabled: autoSellTriggerData.isTriggerEnabled,
    isAutoTakeProfitEnabled: autoTakeProfitTriggerData.isTriggerEnabled,
    constantMultipleState,
    debtDeltaWhenSellAtCurrentCollRatio,
    constantMultipleBuyExecutionPrice: nextBuyPrice,
    autoTakeProfitExecutionPrice: autoTakeProfitTriggerData.executionPrice,
    debt,
    token,
    collateralizationRatioAtNextPrice,
  })
  const cancelConstantMultipleErrors = extractCancelAutomationErrors(errors)
  const cancelConstantMultipleWarnings = extractCancelAutomationWarnings(warnings)
  const validationErrors = isAddForm ? errors : cancelConstantMultipleErrors

  if (isConstantMultipleActive) {
    const sidebarSectionProps: SidebarSectionProps = {
      title: sidebarTitle,
      dropdown,
      content: (
        <Grid gap={3}>
          {(stage === 'editing' || stage === 'txFailure') && (
            <>
              {isAddForm && (
                <SidebarConstantMultipleEditingStage
                  isEditing={isEditing}
                  errors={errors}
                  warnings={warnings}
                  constantMultipleState={constantMultipleState}
                  nextBuyPrice={nextBuyPrice}
                  nextSellPrice={nextSellPrice}
                  collateralToBePurchased={collateralToBePurchased}
                  collateralToBeSold={collateralToBeSold}
                  estimatedGasCostOnTrigger={estimatedGasCostOnTrigger}
                  estimatedBuyFee={estimatedBuyFee}
                  estimatedSellFee={estimatedSellFee}
                />
              )}
              {isRemoveForm && (
                <SidebarConstantMultipleRemovalEditingStage
                  errors={cancelConstantMultipleErrors}
                  warnings={cancelConstantMultipleWarnings}
                />
              )}
            </>
          )}
          {(stage === 'txSuccess' || stage === 'txInProgress') && (
            <SidebarAutomationFeatureCreationStage
              featureName={feature}
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
      ...(stage !== 'txInProgress' &&
        stage !== 'txSuccess' && {
          textButton: {
            label: textButtonLabel,
            hidden: isFirstSetup,
            action: () => textButtonHandler(),
          },
        }),
      status: sidebarStatus,
    }

    return <SidebarSection {...sidebarSectionProps} />
  }
  return null
}
