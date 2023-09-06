import React from 'react'
import { bannerGradientPresets } from 'components/Banner'
import { AutomationTriggeredBannerControl } from 'features/automation/common/controls/AutomationTriggeredBannerControl'
import { useTranslation } from 'next-i18next'

export function AutoTakeProfitTriggeredBanner() {
  const { t } = useTranslation()
  const feature = t('auto-take-profit.title')

  return (
    <AutomationTriggeredBannerControl
      sessionStorageKey="takeProfitTriggeredBanner"
      title={t('automation.trigger-executed-banner-title', { feature })}
      description={t('automation.trigger-executed-banner-description', { feature })}
      image={{
        src: '/static/img/setup-banner/auto-take-profit.svg',
        backgroundColor: bannerGradientPresets.autoTakeProfit[0],
        backgroundColorEnd: bannerGradientPresets.autoTakeProfit[1],
      }}
    />
  )
}
