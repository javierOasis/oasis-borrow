import {
  OmniFormContentSummary,
  OmniFormFieldWithdraw,
} from 'features/omni-kit/components/sidebars'
import { useOmniGeneralContext, useOmniProductContext } from 'features/omni-kit/contexts'
import React from 'react'

export function OmniEarnFormContentWithdraw() {
  const {
    environment: { quotePrice, quoteToken, quoteDigits },
  } = useOmniGeneralContext()
  const {
    form: { dispatch },

    dynamicMetadata,
  } = useOmniProductContext('earn')
  const {
    validations: { isFormValid },
    elements: { extraEarnInputWithdraw, earnFormOrder },
    values: { earnWithdrawMax },
  } = dynamicMetadata('earn')

  return (
    <>
      <OmniFormFieldWithdraw
        dispatchAmount={dispatch}
        resetOnClear
        token={quoteToken}
        tokenPrice={quotePrice}
        maxAmount={earnWithdrawMax}
        tokenDigits={quoteDigits}
      />
      {extraEarnInputWithdraw}
      {isFormValid && <OmniFormContentSummary>{earnFormOrder}</OmniFormContentSummary>}
    </>
  )
}