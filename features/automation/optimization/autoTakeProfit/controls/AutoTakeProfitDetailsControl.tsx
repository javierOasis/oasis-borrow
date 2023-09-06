import React from 'react'
import { ratioAtCollateralPrice } from 'blockchain/vault.maths'
import { useAutomationContext } from 'components/context'
import { getOnCloseEstimations } from 'features/automation/common/estimations/onCloseEstimations'
import { AutoTakeProfitDetailsLayout } from 'features/automation/optimization/autoTakeProfit/controls/AutoTakeProfitDetailsLayout'
import { checkIfIsEditingAutoTakeProfit } from 'features/automation/optimization/autoTakeProfit/helpers'
import {
  AUTO_TAKE_PROFIT_FORM_CHANGE,
  AutoTakeProfitFormChange,
} from 'features/automation/optimization/autoTakeProfit/state/autoTakeProfitFormChange'
import { useUIChanges } from 'helpers/uiChangesHook'
import { useFeatureToggle } from 'helpers/useFeatureToggle'

export function AutoTakeProfitDetailsControl() {
  const [autoTakeProfitState] = useUIChanges<AutoTakeProfitFormChange>(AUTO_TAKE_PROFIT_FORM_CHANGE)
  const readOnlyAutoTakeProfitEnabled = useFeatureToggle('ReadOnlyAutoTakeProfit')
  const {
    environmentData: { ethMarketPrice },
    positionData: { id, ilk, debt, debtOffset, positionRatio, lockedCollateral, token },
    triggerData: { autoTakeProfitTriggerData },
  } = useAutomationContext()

  const { isTriggerEnabled, executionPrice } = autoTakeProfitTriggerData
  const isDebtZero = debt.isZero()

  const { estimatedProfitOnClose } = getOnCloseEstimations({
    colMarketPrice: executionPrice,
    colOraclePrice: executionPrice,
    debt,
    debtOffset,
    ethMarketPrice,
    lockedCollateral,
    toCollateral: false,
  })
  const isEditing = checkIfIsEditingAutoTakeProfit({
    autoTakeProfitState,
    autoTakeProfitTriggerData,
    isRemoveForm: autoTakeProfitState.currentForm === 'remove',
  })

  const autoTakeProfitDetailsLayoutOptionalParams = {
    ...(isTriggerEnabled && {
      triggerColPrice: executionPrice,
      estimatedProfit: estimatedProfitOnClose,
      triggerColRatio: ratioAtCollateralPrice({
        lockedCollateral: lockedCollateral,
        collateralPriceUSD: executionPrice,
        vaultDebt: debt,
      }),
    }),
    ...(isEditing && {
      afterTriggerColPrice: autoTakeProfitState.executionPrice,
      afterTriggerColRatio: autoTakeProfitState.executionCollRatio,
    }),
    currentColRatio: positionRatio.times(100),
  }

  if (readOnlyAutoTakeProfitEnabled || isDebtZero) return null

  return (
    <AutoTakeProfitDetailsLayout
      ilk={ilk}
      vaultId={id}
      isTriggerEnabled={isTriggerEnabled}
      token={token}
      {...autoTakeProfitDetailsLayoutOptionalParams}
    />
  )
}
