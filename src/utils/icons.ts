import User from '@assets/svg/user.svg';
import Home from '@assets/svg/home-svgrepo-com.svg';
import Marketplace from '@assets/svg/search-svgrepo-com.svg';
import Portfolio from '@assets/svg/portfolio-suitcase-svgrepo-com.svg';
import Logo from '@assets/svg/logo.svg';
import Location from '@assets/svg/location.svg';
import Search from '@assets/svg/search.svg';

import { RFValue } from 'react-native-responsive-fontsize';

const iconStyle = ({
  width = 0,
  height = 0,
  color = 'black',
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
};
