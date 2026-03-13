import { navigate } from './navigationService';
import { NotificationType } from './constants';
import { ROUTES } from '../navigation/constants';

const handleNotification = (data: { type: number; referenceId?: string }) => {
  console.log(data, '===============================');
  switch (data.type) {
    case NotificationType.KycApproved:
      navigate(ROUTES.PORTFOLIO);
      break;

    case NotificationType.KycRejected:
      navigate(ROUTES.KYC);
      break;

    case NotificationType.PropertyApproved:
      if (data.referenceId) {
        navigate(ROUTES.OWNED_PROPERTY, { id: data.referenceId });
      } else {
        navigate(ROUTES.PORTFOLIO);
      }
      break;

    case NotificationType.PropertyRejected:
      if (data.referenceId) {
        navigate(ROUTES.OWNED_PROPERTY, { id: data.referenceId });
      } else {
        navigate(ROUTES.PORTFOLIO);
      }
      break;

    case NotificationType.PropertyUpdateRejected:
      if (data.referenceId) {
        navigate(ROUTES.OWNED_PROPERTY, { id: data.referenceId });
      } else {
        navigate(ROUTES.PORTFOLIO);
      }
      break;

    case NotificationType.PropertySoldOut:
      if (data.referenceId) {
        navigate(ROUTES.OWNED_PROPERTY, { id: data.referenceId });
      } else {
        navigate(ROUTES.PORTFOLIO);
      }
      break;

    case NotificationType.InvestmentSuccess:
      navigate(ROUTES.TRANSACTIONS);
      break;

    case NotificationType.InvestmentReceived:
      navigate(ROUTES.TRANSACTIONS);
      break;

    case NotificationType.TokenRequestApproved:
      navigate(ROUTES.WALLET);
      break;

    case NotificationType.TokenRequestRejected:
      navigate(ROUTES.WALLET);
      break;

    case NotificationType.ModificationRequired:
      if (data.referenceId) {
        navigate(ROUTES.OWNED_PROPERTY, { id: data.referenceId });
      } else {
        navigate(ROUTES.NOTIFICATIONS);
      }
      break;

    default:
      console.warn('Unhandled notification type:', data.type);
  }
};

export default handleNotification;
