import { navigate } from './navigationService';
import { NotificationType } from './constants';
import { ROUTES } from '../navigation/constants';

const handleNotification = (data: { type: number; referenceId: string }) => {
  switch (data.type) {
    case NotificationType.KycApproved:
      navigate(ROUTES.PORTFOLIO);
      break;

    case NotificationType.KycRejected:
      navigate(ROUTES.KYC);
      break;

    case NotificationType.PropertyApproved:
      navigate(ROUTES.PORTFOLIO);
      break;

    case NotificationType.PropertySoldOut:
      if (data.referenceId) {
        navigate(ROUTES.PROPERTY_DETAILS, { id: data.referenceId });
      }
      break;

    case NotificationType.InvestmentSuccess:
      navigate(ROUTES.PORTFOLIO);
      break;

    case NotificationType.TokenRequestApproved:
      navigate(ROUTES.WALLET);
      break;

    case NotificationType.PropertyRejected:
    case NotificationType.TokenRequestRejected:
      navigate(ROUTES.NOTIFICATIONS);
      break;

    default:
      console.warn('Unhandled notification type:', data.type);
  }
};

export default handleNotification;
