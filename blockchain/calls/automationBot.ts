import BigNumber from 'bignumber.js'
import dsProxy from 'blockchain/abi/ds-proxy.json'
import { TransactionDef } from 'blockchain/calls/callsHelpers'
import { contractDesc } from 'blockchain/config'
import { ContextConnected } from 'blockchain/network'
import { AutomationBot, DsProxy } from 'types/ethers-contracts'

import { TxMetaKind } from './txMeta'

export type AutomationBaseTriggerData = {
  cdpId: BigNumber
  triggerType: BigNumber
  triggerData: string
  proxyAddress: string
}

export type AutomationBotAddTriggerData = AutomationBaseTriggerData & {
  kind: TxMetaKind.addTrigger
  replacedTriggerId: number
}

export type AutomationBotRemoveTriggerData = {
  kind: TxMetaKind.removeTrigger
  proxyAddress: string
  cdpId: BigNumber
  triggerId: number
  removeAllowance: boolean
}

function getAddAutomationTriggerCallData(
  data: AutomationBotAddTriggerData,
  context: ContextConnected,
) {
  const { contract, automationBot } = context
  return contract<AutomationBot>(automationBot).interface.encodeFunctionData('addTrigger', [
    data.cdpId.toString(),
    data.triggerType.toString(),
    data.replacedTriggerId,
    data.triggerData,
  ])
}

export const addAutomationBotTrigger: TransactionDef<AutomationBotAddTriggerData> = {
  call: ({ proxyAddress }, { contract }) => {
    return contract<DsProxy>(contractDesc(dsProxy, proxyAddress))['execute(address,bytes)']
  },
  prepareArgs: (data, context) => [
    context.automationBot.address,
    getAddAutomationTriggerCallData(data, context),
  ],
}
// TODO ŁW refactor use template method pattern and getAddAutomationTriggerCallData
function getRemoveAutomationTriggerCallData(
  data: AutomationBotRemoveTriggerData,
  context: ContextConnected,
) {
  const { contract, automationBot } = context
  return contract<AutomationBot>(automationBot).interface.encodeFunctionData('removeTrigger', [
    data.cdpId.toString(),
    data.triggerId,
    data.removeAllowance,
  ])
}

export const removeAutomationBotTrigger: TransactionDef<AutomationBotRemoveTriggerData> = {
  call: ({ proxyAddress }, { contract }) => {
    return contract<DsProxy>(contractDesc(dsProxy, proxyAddress))['execute(address,bytes)']
  },
  prepareArgs: (data, context) => [
    context.automationBot.address,
    getRemoveAutomationTriggerCallData(data, context),
  ],
}
