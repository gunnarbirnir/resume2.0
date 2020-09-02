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

export function spacing(
  size: number,
  size2?: number,
  size3?: number,
  size4?: number
) {
  const scale = 8;
  let spacingVal = `${size * scale}px`;

  if (size2) {
    spacingVal += ` ${size2 * scale}px`;
  }
  if (size3) {
    spacingVal += ` ${size3 * scale}px`;
  }
  if (size4) {
    spacingVal += ` ${size4 * scale}px`;
  }
  return spacingVal;
}
