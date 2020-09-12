import { FluidObject } from 'gatsby-image';

export type ILocale = 'is' | 'en-US';

export type IEdges<T> = { node: T }[];

export interface ITheme {
  colors: {
    primary: string;
    primaryDarker: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
    textLight: string;
    white: string;
  };
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  mediaQueries: {
    xsDown: string;
    smDown: string;
    mdDown: string;
    lgDown: string;
    xsUp: string;
    smUp: string;
    mdUp: string;
    lgUp: string;
  };
  dimensions: {
    contentWidth: number;
    borderRadius: number;
  };
}

export interface IPageProps {
  location: {
    pathname: string;
  };
}

export interface IContentfulData {
  id: string;
  node_locale: ILocale;
}

export interface IPersonalInfo extends IContentfulData {
  name: string;
  email: string;
  jobTitle: string;
  phoneNumber: string;
  facebook: string;
  about: {
    about: string;
  };
  profilePicture: {
    fluid: FluidObject;
  };
  backgroundImage: {
    fluid: FluidObject;
  };
}
