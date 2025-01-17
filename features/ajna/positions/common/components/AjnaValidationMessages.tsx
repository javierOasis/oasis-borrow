import { MessageCard } from 'components/MessageCard'
import type { AjnaValidationItem } from 'features/ajna/common/types'
import { useAjnaGeneralContext } from 'features/ajna/positions/common/contexts/AjnaGeneralContext'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import React from 'react'

interface AjnaValidationMessagesProps {
  validations: AjnaValidationItem[]
  type: 'warning' | 'error' | 'notice' | 'success'
}

export const AjnaValidationMessages: FC<AjnaValidationMessagesProps> = ({ validations, type }) => {
  const { t } = useTranslation()
  const {
    environment: { collateralToken, quoteToken, product },
  } = useAjnaGeneralContext()

  const token = product === 'earn' ? quoteToken : collateralToken

  const messagesWithTranslations = validations.map((message) => {
    return (
      <>
        {message.message.translationKey &&
          t(`ajna.validations.${message.message.translationKey}`, {
            token,
            quoteToken,
            collateralToken,
            ...message.message.params,
          })}
        {message.message.component}
      </>
    )
  })

  return (
    <MessageCard
      messages={messagesWithTranslations}
      type={type === 'success' ? 'ok' : type}
      withBullet={validations.length > 1}
    />
  )
}
