import { FluidObject } from 'gatsby-image';

export type ILocale = 'is' | 'en-US';

export type IEdges<T> = { node: T }[];

export interface ITheme {
  colors: {
    primary: string;
    primaryDarker: string;
    textPrimary: string;
    textSecondary: string;
    white: string;
    backgroundGray: string;
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

export type ISectionComponent =
  | 'work'
  | 'projects'
  | 'skills'
  | 'accolades'
  | 'references';

export interface IPageSection extends IContentfulData {
  title: string;
  component: ISectionComponent;
}

export interface IScrollSection extends IPageSection {
  scrollId: string;
}

export interface IPageLayout extends IContentfulData {
  sections: IPageSection[];
}
