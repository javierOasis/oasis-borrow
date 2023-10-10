import { zero } from 'helpers/zero'

import type { ManageVaultSummary } from './manageMultiplyVaultSummary.types'

export const defaultManageVaultSummary: ManageVaultSummary = {
  vaultWillBeAtRiskLevelDanger: false,
  vaultWillBeAtRiskLevelWarning: false,
  afterCollateralizationRatio: zero,
  afterLiquidationPrice: zero,
  collateralBalance: zero,
  afterCollateralBalance: zero,
}
