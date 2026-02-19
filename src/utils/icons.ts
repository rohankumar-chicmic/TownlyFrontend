import User from '@assets/svg/user.svg';
import Home from '@assets/svg/home-svgrepo-com.svg';
import Marketplace from '@assets/svg/search-svgrepo-com.svg';
import Portfolio from '@assets/svg/portfolio-suitcase-svgrepo-com.svg';
import Logo from '@assets/svg/logo.svg';
import Location from '@assets/svg/location.svg';
import Search from '@assets/svg/search.svg';
import Arrow from '@assets/svg/arrow.svg';
import Step1Icon from '@assets/svg/Step1Icon.svg';
import Step2Icon from '@assets/svg/Step2Icon.svg';
import Step3Icon from '@assets/svg/Step3Icon.svg';
import Step4Icon from '@assets/svg/Step4Icon.svg';
import Drawer from '@assets/svg/drawer-svgrepo-com.svg';
import BackLogo from '@assets/svg/navigation-back-arrow-svgrepo-com.svg';
import { RFValue } from 'react-native-responsive-fontsize';

const iconStyle = ({
  width = 0,
  height = 0,
  color = 'none',
  borderColor = 'none',
}) => ({
  width: RFValue(width),
  height: RFValue(height),
  fill: color,
  stroke: borderColor,
});

export type iconProps = {
  width: number;
  height: number;
  color?: string;
  borderColor?: string;
};

export const Icons = {
  User: (params: iconProps) => User({ ...iconStyle({ ...params }) }),
  Logo: (params: iconProps) => Logo({ ...iconStyle({ ...params }) }),
  Home: (params: iconProps) => Home({ ...iconStyle({ ...params }) }),
  Marketplace: (params: iconProps) =>
    Marketplace({ ...iconStyle({ ...params }) }),
  Portfolio: (params: iconProps) => Portfolio({ ...iconStyle({ ...params }) }),
  Location: (params: iconProps) => Location({ ...iconStyle({ ...params }) }),
  Search: (params: iconProps) => Search({ ...iconStyle({ ...params }) }),
  Arrow: (params: iconProps) => Arrow({ ...iconStyle({ ...params }) }),
  Step1Icon: (params: iconProps) => Step1Icon({ ...iconStyle({ ...params }) }),
  Step2Icon: (params: iconProps) => Step2Icon({ ...iconStyle({ ...params }) }),
  Step3Icon: (params: iconProps) => Step3Icon({ ...iconStyle({ ...params }) }),
  Step4Icon: (params: iconProps) => Step4Icon({ ...iconStyle({ ...params }) }),
  Drawer: (params: iconProps) => Drawer({ ...iconStyle({ ...params }) }),
  BackLogo: (params: iconProps) => BackLogo({ ...iconStyle({ ...params }) }),
};
