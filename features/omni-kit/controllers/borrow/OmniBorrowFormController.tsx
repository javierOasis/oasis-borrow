import { isPoolSupportingMultiply } from 'features/ajna/positions/common/helpers/isPoolSupportingMultiply'
import { OmniFormContentTransaction } from 'features/omni-kit/components/sidebars'
import {
  OmniBorrowFormContentDeposit,
  OmniBorrowFormContentManage,
  OmniBorrowFormContentTransition,
  OmniBorrowFormOrder,
} from 'features/omni-kit/components/sidebars/borrow'
import { useOmniGeneralContext, useOmniProductContext } from 'features/omni-kit/contexts'
import { OmniBorrowFormAction, OmniProductType } from 'features/omni-kit/types'
import { OmniFormView } from 'features/omni-kit/views'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { circle_close, circle_exchange } from 'theme/icons'

export function OmniBorrowFormController({ txHandler }: { txHandler: () => () => void }) {
  const { t } = useTranslation()
  const {
    environment: { collateralToken, flow, quoteToken, collateralIcon, quoteIcon },
    steps: { currentStep },
  } = useOmniGeneralContext()
  const {
    form: {
      dispatch,
      state: { uiDropdown },
      updateState,
    },
    dynamicMetadata: {
      elements: { riskSidebar },
    },
  } = useOmniProductContext(OmniProductType.Borrow)

  return (
    <OmniFormView
      {...(flow === 'manage' && {
        dropdown: {
          forcePanel: uiDropdown,
          disabled: currentStep !== 'manage',
          items: [
            {
              label: t('system.manage-collateral-token', {
                token: collateralToken,
              }),
              panel: 'collateral',
              shortLabel: collateralToken,
              tokenIcon: collateralIcon,
              action: () => {
                dispatch({ type: 'reset' })
                updateState('uiDropdown', 'collateral')
                updateState('uiPill', OmniBorrowFormAction.DepositBorrow)
                updateState('action', OmniBorrowFormAction.DepositBorrow)
              },
            },
            {
              label: t('system.manage-debt-token', {
                token: quoteToken,
              }),
              panel: 'quote',
              shortLabel: quoteToken,
              tokenIcon: quoteIcon,
              action: () => {
                dispatch({ type: 'reset' })
                updateState('uiDropdown', 'quote')
                updateState('uiPill', OmniBorrowFormAction.GenerateBorrow)
                updateState('action', OmniBorrowFormAction.GenerateBorrow)
              },
            },
            // TODO this should be in metadata man
            ...(isPoolSupportingMultiply({ collateralToken, quoteToken })
              ? [
                  {
                    label: t('system.actions.borrow.switch-to-multiply'),
                    icon: circle_exchange,
                    iconShrink: 2,
                    panel: 'switch',
                    action: () => {
                      dispatch({ type: 'reset' })
                      updateState('uiDropdown', 'switch')
                      updateState('action', OmniBorrowFormAction.SwitchBorrow)
                    },
                  },
                  {
                    label: t('system.actions.common.close-position'),
                    icon: circle_close,
                    iconShrink: 2,
                    panel: 'close',
                    action: () => {
                      dispatch({ type: 'reset' })
                      updateState('uiDropdown', 'close')
                      updateState('closeTo', 'collateral')
                      updateState('action', OmniBorrowFormAction.CloseBorrow)
                    },
                  },
                ]
              : []),
          ],
        },
      })}
      txHandler={txHandler}
    >
      {currentStep === 'risk' && riskSidebar}
      {currentStep === 'setup' && <OmniBorrowFormContentDeposit />}
      {currentStep === 'manage' && <OmniBorrowFormContentManage />}
      {currentStep === 'transition' && <OmniBorrowFormContentTransition />}
      {currentStep === 'transaction' && (
        <OmniFormContentTransaction orderInformation={OmniBorrowFormOrder} />
      )}
    </OmniFormView>
  )
}
