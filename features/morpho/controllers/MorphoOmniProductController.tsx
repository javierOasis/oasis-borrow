import type { BorrowishPosition, MorphoPosition } from '@oasisdex/dma-library'
import type { DpmPositionData } from 'features/ajna/positions/common/observables/getDpmPositionData'
import type { MorphoPositionAuction } from 'features/morpho/common/types'
import { OmniProductContextProvider } from 'features/omni-kit/contexts/OmniProductContext'
import { OmniBorrowPositionController } from 'features/omni-kit/controllers/borrow/OmniBorrowPositionController'
import { OmniMultiplyPositionController } from 'features/omni-kit/controllers/multiply/OmniMultiplyPositionController'
import { useMorphoMetadata } from 'features/omni-kit/metadata/morpho/useMorphoMetadata'
import { useOmniBorrowFormReducto } from 'features/omni-kit/state/borrow/borrowFormReducto'
import { useOmniMultiplyFormReducto } from 'features/omni-kit/state/multiply/multiplyFormReducto'
import type { OmniFlow } from 'features/omni-kit/types/common.types'
import type { PositionHistoryEvent } from 'features/positionHistory/types'
import type { FC } from 'react'
import React from 'react'

interface MorphoOmniProductControllerProps {
  flow: OmniFlow
  dpmPosition: DpmPositionData
  aggregatedData: { auction: MorphoPositionAuction; history: PositionHistoryEvent[] }
  positionData: MorphoPosition
}

export const MorphoOmniProductController: FC<MorphoOmniProductControllerProps> = ({
  dpmPosition,
  flow,
  aggregatedData: { auction, history },
  positionData,
}) => {
  return (
    <>
      {dpmPosition.product === 'borrow' && (
        <OmniProductContextProvider
          dynamicMetadata={useMorphoMetadata}
          formDefaults={{
            action: flow === 'open' ? 'open-borrow' : 'deposit-borrow',
          }}
          formReducto={useOmniBorrowFormReducto}
          position={positionData as BorrowishPosition}
          product={dpmPosition.product}
          positionAuction={auction}
          positionHistory={history}
        >
          <OmniBorrowPositionController />
        </OmniProductContextProvider>
      )}
      {dpmPosition.product === 'multiply' && (
        <OmniProductContextProvider
          dynamicMetadata={useMorphoMetadata}
          formDefaults={{
            action: flow === 'open' ? 'open-multiply' : 'adjust',
          }}
          formReducto={useOmniMultiplyFormReducto}
          position={positionData as BorrowishPosition}
          product={dpmPosition.product}
          positionAuction={auction}
          positionHistory={history}
        >
          <OmniMultiplyPositionController />
        </OmniProductContextProvider>
      )}
    </>
  )
}
