import type { VaultType } from '@prisma/client'
import { getUserFromRequest } from 'handlers/signature-auth/getUserFromRequest'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'server/prisma'
import * as z from 'zod'

import { selectVaultByIdAndChainId } from './get'

const vaultSchema = z.object({
  id: z.number(),
  type: z.enum(['borrow', 'multiply', 'earn']),
  chainId: z.number(),
  protocol: z.string(),
})

export async function createOrUpdate(req: NextApiRequest, res: NextApiResponse) {
  const params = vaultSchema.parse(req.body)
  const user = getUserFromRequest(req)

  const vaultData = {
    vault_id: params.id,
    type: params.type as VaultType,
    owner_address: user.address,
    chain_id: params.chainId,
    protocol: params.protocol,
  }

  const insertQuery = `INSERT INTO vault (vault_id, chain_id, type, owner_address, protocol) VALUES (${vaultData.vault_id},${vaultData.chain_id},'${vaultData.type}','${vaultData.owner_address}', '${vaultData.protocol}')`
  const updateQuery = `UPDATE vault SET type='${vaultData.type}' WHERE vault_id=${vaultData.vault_id} AND chain_id=${vaultData.chain_id} AND protocol='${vaultData.protocol}'`

  if (params.type !== 'borrow' && params.type !== 'multiply' && params.type !== 'earn') {
    return res.status(403).send('Incorrect type of vault')
  }

  const vault = await selectVaultByIdAndChainId(vaultData)

  if (vault === null || vault.owner_address === user.address) {
    if (vault === null) {
      await prisma.$executeRawUnsafe(insertQuery)
    } else {
      await prisma.$executeRawUnsafe(updateQuery)
    }
    return res.status(200).send('OK')
  } else {
    return res.status(401).send('Unauthorized')
  }
}
