import BigNumber from 'bignumber.js'
import { SliderValuePicker } from 'components/dumb/SliderValuePicker'
import { useAjnaProductContext } from 'features/ajna/contexts/AjnaProductContext'
import { useAjnaEarnContext } from 'features/ajna/earn/contexts/AjnaEarnContext'
import { formatAmount, formatDecimalAsPercent } from 'helpers/formatters/format'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

function snapToPredefinedValues(value: BigNumber, predefinedSteps: BigNumber[]) {
  return predefinedSteps.reduce((prev, curr) => {
    return curr.minus(value).abs().lt(prev.minus(value).abs()) ? curr : prev
  })
}

function generateSteps(min: BigNumber, max: BigNumber) {
  const steps = [min]

  while (steps[steps.length - 1].lte(max)) {
    steps.push(steps[steps.length - 1].times(1.005))
  }

  return steps
}

function convertSliderValuesToPercents(value: BigNumber, min: BigNumber, max: BigNumber) {
  return value.minus(min).div(max.minus(min)).times(100).toNumber()
}

function convertSliderThresholds({
  min,
  max,
  htp,
  lup,
  momp,
}: {
  min: BigNumber
  max: BigNumber
  htp: BigNumber
  lup: BigNumber
  momp: BigNumber
}) {
  return {
    htpPercentage: convertSliderValuesToPercents(htp, min, max),
    lupPercentage: convertSliderValuesToPercents(lup, min, max),
    mompPercentage: convertSliderValuesToPercents(momp, min, max),
  }
}

export function AjnaEarnSlider() {
  const { t } = useTranslation()
  const {
    form: {
      updateState,
      state: { priceBucketUSD },
    },
  } = useAjnaEarnContext()

  const {
    environment: { collateralToken, quoteToken },
  } = useAjnaProductContext()

  // TODO this should be taken from position.currentPosition
  const { min, max, maxLtv, htp, lup, momp } = {
    min: new BigNumber(17775.14558),
    max: new BigNumber(35732.36916),
    maxLtv: new BigNumber(0.65),
    htp: new BigNumber(20035.42911),
    lup: new BigNumber(23038.19116),
    momp: new BigNumber(28979.25513),
  }

  const predefinedSteps = useMemo(() => generateSteps(min, max), [min, max])
  const { htpPercentage, lupPercentage, mompPercentage } = useMemo(
    () =>
      convertSliderThresholds({
        min,
        max,
        htp,
        lup,
        momp,
      }),
    [min, max, htp, lup, momp],
  )

  function handleChange(v: BigNumber) {
    const newValue = snapToPredefinedValues(v, predefinedSteps)
    updateState('priceBucketUSD', newValue)
  }

  return (
    <SliderValuePicker
      lastValue={priceBucketUSD || htp}
      minBoundry={min}
      maxBoundry={max}
      step={1}
      leftBoundry={priceBucketUSD || htp}
      rightBoundry={maxLtv}
      leftBoundryFormatter={(v) => `${t('price')} $${formatAmount(v, 'USD')}`}
      rightBoundryFormatter={(v) => `${t('max-ltv')} ${formatDecimalAsPercent(v)}`}
      disabled={false}
      onChange={handleChange}
      leftLabel={t('ajna.earn.open.form.max-lending-price', {
        quoteToken,
        collateralToken,
      })}
      rightLabel={t('ajna.earn.open.form.max-ltv-to-lend-at')}
      leftBottomLabel={t('safer')}
      rightBottomLabel={t('riskier')}
      colorfulRanges={`linear-gradient(to right,
        #D3D4D8 0 ${htpPercentage}%,
        #1ECBAE ${htpPercentage}% ${lupPercentage}%,
        #EABE4C ${lupPercentage}% ${mompPercentage}%,
        #EE5728 ${mompPercentage}% 100%)`}
    />
  )
}
