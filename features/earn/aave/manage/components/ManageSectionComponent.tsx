import BigNumber from 'bignumber.js'
import {
  DetailsSectionContentCard,
  DetailsSectionContentCardWrapper,
} from 'components/DetailsSectionContentCard'
import {
  DetailsSectionFooterItem,
  DetailsSectionFooterItemWrapper,
} from 'components/DetailsSectionFooterItem'
import { formatBigNumber, formatPercent } from 'helpers/formatters/format'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Grid, Heading, Text } from 'theme-ui'

import { DetailsSection } from '../../../../../components/DetailsSection'

const mockData = {
  earnId: 3920,
  token: 'ETH',
  netValue: new BigNumber(122500.4243),
  pnl: new BigNumber(30000.01),
  earnings: new BigNumber(34000.21),
  earningsAfterFees: new BigNumber(31000.21),
  APYtotal: new BigNumber(8.3),
  APYtoDate: new BigNumber(2.2),
  liquidationPriceRatio: new BigNumber(0.75),
}

const getLiquidationPriceRatioColor = (ratio: BigNumber) => {
  if (ratio.isLessThanOrEqualTo(0.05)) {
    return 'critical10'
  }
  return ratio.isLessThanOrEqualTo(0.2) ? 'warning10' : 'success10'
}

export function ManageSectionComponent() {
  const { t } = useTranslation()
  return (
    <DetailsSection
      title={t('manage-earn-vault.overview-earn', { earnId: mockData.earnId })}
      content={
        <DetailsSectionContentCardWrapper>
          <DetailsSectionContentCard
            title={t('net-value')}
            value={formatBigNumber(mockData.netValue, 2)}
            unit={mockData.token}
            footnote={t('manage-earn-vault.pnl', {
              value: formatBigNumber(mockData.pnl, 2),
              token: mockData.token,
            })}
            modal={<div>Explanation of the thing, probably</div>}
          />
          <DetailsSectionContentCard
            title={t('manage-earn-vault.earnings-to-date')}
            value={formatBigNumber(mockData.earnings, 2)}
            unit={mockData.token}
            footnote={t('manage-earn-vault.earnings-to-date-after-fees', {
              afterFees: formatBigNumber(mockData.earningsAfterFees, 2),
              symbol: mockData.token,
            })}
            modal={
              <Grid gap={2}>
                <Heading variant="header3">{t('manage-earn-vault.earnings-to-date')}</Heading>
                <Text variant="paragraph2">{t('manage-earn-vault.earnings-to-date-modal')}</Text>
              </Grid>
            }
          />
          <DetailsSectionContentCard
            title={t('manage-earn-vault.net-apy')}
            value={formatPercent(mockData.APYtotal, { precision: 1 })}
            footnote={`To date: ${formatPercent(mockData.APYtoDate, { precision: 1 })}`}
            modal={<div>Explanation of the thing, probably</div>}
          />
          <DetailsSectionContentCard
            title="Liquidation price ratio"
            value={mockData.liquidationPriceRatio.toFormat(2)}
            modal={<div>Explanation of the thing, probably</div>}
            customBackground={getLiquidationPriceRatioColor(mockData.liquidationPriceRatio)}
            link={{
              label: 'Ratio history',
              url: 'https://dune.com/dataalways/stETH-De-Peg', // should we move this url to a file? an env?
            }}
          />
        </DetailsSectionContentCardWrapper>
      }
      footer={
        <DetailsSectionFooterItemWrapper>
          <DetailsSectionFooterItem title="Total collateral" value="224,987.69 stETH" />
          <DetailsSectionFooterItem title="Position ETH Debt" value="44,464,761,3484 ETH" />
          <DetailsSectionFooterItem title="Variable Annual Fee" value="0.05%" />
        </DetailsSectionFooterItemWrapper>
      }
    />
  )
}
