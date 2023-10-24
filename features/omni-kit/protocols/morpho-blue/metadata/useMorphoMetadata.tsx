import type { MorphoPosition } from '@oasisdex/dma-library'
import { negativeToZero } from '@oasisdex/dma-library'
import BigNumber from 'bignumber.js'
import type { DetailsSectionNotificationItem } from 'components/DetailsSectionNotification'
import { ajnaFlowStateFilter } from 'features/ajna/positions/common/helpers/getFlowStateFilter'
import { getMorphoSidebarTitle } from 'features/morpho/positions/common/getMorphoSidebarTitle'
import { useOmniGeneralContext } from 'features/omni-kit/contexts/OmniGeneralContext'
import type {
  GetOmniMetadata,
  LendingMetadata,
} from 'features/omni-kit/contexts/OmniProductContext'
import { getOmniBorrowishChangeVariant, getOmniBorrowPaybackMax } from 'features/omni-kit/helpers'
import { MorphoDetailsSectionContent } from 'features/omni-kit/protocols/morpho-blue/metadata/MorphoDetailsSectionContent'
import { MorphoDetailsSectionFooter } from 'features/omni-kit/protocols/morpho-blue/metadata/MorphoDetailsSectionFooter'
import { useAppConfig } from 'helpers/config'
import React from 'react'
import type { CreatePositionEvent } from 'types/ethers-contracts/AjnaProxyActions'

export const useMorphoMetadata: GetOmniMetadata = (productContext) => {
  const {
    AjnaSafetySwitch: ajnaSafetySwitchOn,
    AjnaSuppressValidation: ajnaSuppressValidation,
    AjnaReusableDPM: ajnaReusableDPMEnabled,
  } = useAppConfig('features')

  const {
    environment: {
      isOracless,
      quoteBalance,
      quoteDigits,
      collateralAddress,
      quoteAddress,
      collateralToken,
      quoteToken,
      isShort,
      flow,
      quotePrice,
      collateralPrice,
      product,
    },
    steps: { currentStep },
  } = useOmniGeneralContext()

  const position = productContext.position.currentPosition.position as MorphoPosition
  const simulation = productContext.position.currentPosition.simulation as MorphoPosition

  const shouldShowDynamicLtv = true
  const changeVariant = getOmniBorrowishChangeVariant({ simulation, isOracless })

  const validations = {
    isFormValid: true,
    hasErrors: false,
    isFormFrozen: false,
    errors: [],
    warnings: [],
    notices: [],
    successes: [],
  }

  const notifications: DetailsSectionNotificationItem[] = []

  const interestRate = new BigNumber(0.01)

  switch (product) {
    case 'borrow':
    case 'multiply':
      return {
        notifications,
        validations,
        handlers: {
          customReset: () => null,
        },
        filters: {
          flowStateFilter: (event: CreatePositionEvent) =>
            ajnaFlowStateFilter({ collateralAddress, event, product, quoteAddress }),
          consumedProxyFilter: (event: CreatePositionEvent) =>
            !ajnaFlowStateFilter({ collateralAddress, event, product, quoteAddress }),
        },
        values: {
          // TODO the same value under different key
          netBorrowCost: interestRate,
          interestRate,
          isFormEmpty: false,
          afterBuyingPower: simulation ? simulation.buyingPower : undefined,
          shouldShowDynamicLtv,
          debtMin: new BigNumber(20),
          debtMax: new BigNumber(3000),
          changeVariant,
          afterAvailableToBorrow: simulation && negativeToZero(simulation.debtAvailable()),
          afterPositionDebt: simulation?.debtAmount,
          collateralMax: new BigNumber(50),
          paybackMax: getOmniBorrowPaybackMax({
            balance: quoteBalance,
            digits: quoteDigits,
            position,
          }),
          sidebarTitle: getMorphoSidebarTitle({
            currentStep,
            product,
          }),
          footerColumns: 2,
        },
        elements: {
          highlighterOrderInformation: undefined,
          overviewContent: (
            <MorphoDetailsSectionContent
              isSimulationLoading={productContext.position.isSimulationLoading}
              isShort={isShort}
              quoteToken={quoteToken}
              collateralToken={collateralToken}
              position={position}
              simulation={simulation}
              changeVariant={changeVariant}
              interestRate={interestRate}
              flow={flow}
              quotePrice={quotePrice}
              collateralPrice={collateralPrice}
              // TODO to be defined
              liquidationPenalty={new BigNumber(0.01)}
            />
          ),
          overviewFooter: (
            <MorphoDetailsSectionFooter
              position={position}
              simulation={simulation}
              collateralToken={collateralToken}
              quoteToken={quoteToken}
              product={product}
            />
          ),
          overviewBanner: undefined,
          riskSidebar: <>Morpho risk sidebar</>,
          dupeModal: () => <>Morpho dupe modal</>,
        },
        featureToggles: {
          safetySwitch: ajnaSafetySwitchOn,
          suppressValidation: ajnaSuppressValidation,
          reusableDpm: ajnaReusableDPMEnabled,
        },
      } as LendingMetadata
    case 'earn':
    default:
      throw new Error('Morpho does not support Earn')
  }
}
