// handleNotification.ts
import { navigate } from './navigationService';
import { NotificationType } from './constants';
import { NotificationProps } from '@utils/constants';

const handleNotification = (data: NotificationProps) => {
  switch (data.type) {
    case NotificationType.KycApproved:
      navigate('Portfolio');
      break;

    case NotificationType.KycRejected:
      navigate('KycStatus', { status: 'rejected' });
      break;

    case NotificationType.PropertyApproved:
      navigate('MyProperties');
      break;

    case NotificationType.PropertySoldOut:
      navigate('PropertyDetails', { id: data.propertyId });
      break;

    case NotificationType.InvestmentSuccess:
      navigate('InvestmentHistory');
      break;

    case NotificationType.TokenRequestApproved:
      navigate('Wallet');
      break;

    case NotificationType.PropertyRejected:
    case NotificationType.TokenRequestRejected:
      navigate('Notifications');
      break;

    default:
      console.warn('Unhandled notification type:', data.type);
      break;
  }
};

export default handleNotification;
