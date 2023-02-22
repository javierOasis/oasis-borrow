import { useActor } from '@xstate/react'
import { AaveV2ReserveConfigurationData } from 'blockchain/aave/aaveV2ProtocolDataProvider'
import { useAaveContext } from 'features/aave/AaveContextProvider'
import { IStrategyConfig } from 'features/aave/common/StrategyConfigTypes'
import { AaveManageTabBar } from 'features/aave/manage/containers/AaveManageTabBar'
import { AaveAutomationContext } from 'features/automation/contexts/AaveAutomationContext'
import { AavePositionNoticesView } from 'features/notices/VaultsNoticesView'
import { Survey } from 'features/survey'
import { VaultContainerSpinner, WithLoadingIndicator } from 'helpers/AppSpinner'
import { WithErrorHandler } from 'helpers/errorHandlers/WithErrorHandler'
import { useObservable } from 'helpers/observableHook'
import { PreparedAaveReserveData } from 'lendingProtocols/aave-v2/pipelines'
import React from 'react'
import { Box, Container } from 'theme-ui'

import { useManageAaveStateMachineContext } from './AaveManageStateMachineContext'

interface AaveManageViewPositionViewProps {
  proxyAddress: string
  strategyConfig: IStrategyConfig
}

function AaveManageContainer({
  strategyConfig,
  aaveReserveState,
  aaveReserveDataDebtToken,
  proxyAddress,
}: {
  aaveReserveState: AaveV2ReserveConfigurationData
  aaveReserveDataDebtToken: PreparedAaveReserveData
  strategyConfig: IStrategyConfig
  proxyAddress: string
}) {
  const Header = strategyConfig.viewComponents.headerManage
  const { stateMachine } = useManageAaveStateMachineContext()
  const [state] = useActor(stateMachine)

  if (!state.context.protocolData) {
    return null
  }

  return (
    <AaveAutomationContext
      aaveManageVault={{
        proxyAddress: proxyAddress,
        aaveReserveState,
        strategyConfig,
        context: state.context,
      }}
    >
      <Container variant="vaultPageContainer">
        <Box mb={4}>
          <AavePositionNoticesView />
        </Box>
        <Header
          strategyConfig={strategyConfig}
          positionId={state.context.positionId}
          proxyAddress={proxyAddress}
        />
        <AaveManageTabBar
          strategyConfig={strategyConfig}
          aaveReserveState={aaveReserveState}
          aaveReserveDataDebtToken={aaveReserveDataDebtToken}
        />
        <Survey for="earn" />
      </Container>
    </AaveAutomationContext>
  )
}

export function AaveManagePositionView({
  proxyAddress,
  strategyConfig,
}: AaveManageViewPositionViewProps) {
  const { wrappedGetAaveReserveData$, aaveReserveConfigurationData$ } = useAaveContext(
    strategyConfig.protocol,
  )
  const [aaveReserveDataDebt, aaveReserveDataDebtError] = useObservable(
    wrappedGetAaveReserveData$(strategyConfig.tokens.debt),
  )
  const [aaveReserveState, aaveReserveStateError] = useObservable(
    aaveReserveConfigurationData$({ token: strategyConfig.tokens.collateral }),
  )
  return (
    <WithErrorHandler error={[aaveReserveStateError, aaveReserveDataDebtError]}>
      <WithLoadingIndicator
        value={[aaveReserveState, aaveReserveDataDebt]}
        customLoader={<VaultContainerSpinner />}
      >
        {([_aaveReserveState, _aaveReserveDataDebt]) => {
          return (
            <AaveManageContainer
              strategyConfig={strategyConfig}
              aaveReserveState={_aaveReserveState}
              aaveReserveDataDebtToken={_aaveReserveDataDebt}
              proxyAddress={proxyAddress}
            />
          )
        }}
      </WithLoadingIndicator>
    </WithErrorHandler>
  )
}
