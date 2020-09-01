export type ILocale = 'is' | 'en-US';

export type IEdges<T> = { node: T }[];

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
  jobTitle: string;
}
