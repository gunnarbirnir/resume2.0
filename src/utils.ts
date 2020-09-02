import { ILocale, IEdges, IContentfulData } from './interfaces';

export function getLocale(pathname: string): ILocale {
  const path = pathname.split('/');
  return path[1] === 'en' ? 'en-US' : 'is';
}

export function getShortLocale(locale: ILocale): 'is' | 'en' {
  return locale === 'is' ? 'is' : 'en';
}

export function getFirstOfLocale<T extends IContentfulData>(
  edges: IEdges<T>,
  locale: ILocale
) {
  for (const edge of edges) {
    if (edge.node.node_locale === locale) {
      return edge.node;
    }
  }
  return null;
}
