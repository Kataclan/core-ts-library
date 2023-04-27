import JourneyMessagingTargetOptions from '../enums/JourneyMessagingTargetOptions';
import SendNotificationType from '../../Notification/enums/SendNotificationType';

export default function prepareSendNotificationPayload(
  journey: string,
  target: JourneyMessagingTargetOptions,
  messageType: SendNotificationType,
  vehicles: Array<string>,
  stops: Array<string>,
  message: string,
  subject: string,
  recipients: Array<string>,
  attachPassengers: boolean
): any {
  return {
    journey_id: journey,
    user_type: target,
    message_type: messageType,
    vehicles: vehicles,
    stops: stops,
    message: message,
    subject: subject,
    recipients,
    attach_passengers_list: attachPassengers,
  };
}
