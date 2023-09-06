import { NOTIFICATION_CHANGE } from 'features/notifications/notificationChange'
import {
  NotificationChannels,
  NotificationRaw,
  NotificationSubscription,
} from 'features/notifications/types'
import { UIChanges } from 'helpers/uiChanges'

export function prepareNotificationMessageHandlers(uiChanges: UIChanges) {
  return {
    numberOfNotificationsHandler(count: number) {
      uiChanges.publish(NOTIFICATION_CHANGE, {
        type: 'number-of-notifications',
        numberOfNotifications: count,
      })
    },
    allNotificationsHandler(message: { notifications: NotificationRaw[] }) {
      uiChanges.publish(NOTIFICATION_CHANGE, {
        type: 'all-notifications',
        allNotifications: message.notifications.map((item) => ({
          ...item,
          additionalData: JSON.parse(JSON.parse(item.additionalData)),
        })),
      })
    },
    allActiveSubscriptionsHandler(message: { activeSubscriptions: NotificationSubscription[] }) {
      uiChanges.publish(NOTIFICATION_CHANGE, {
        type: 'all-active-subscriptions',
        allActiveSubscriptions: message.activeSubscriptions,
      })
    },
    allActiveChannelsHandler(message: { activeChannels: NotificationChannels[] }) {
      uiChanges.publish(NOTIFICATION_CHANGE, {
        type: 'all-active-channels',
        allActiveChannels: message.activeChannels,
      })
    },
  }
}
