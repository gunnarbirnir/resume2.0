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

export function shadeColor(color: string, percent: number) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = Math.round((R * (100 + percent)) / 100);
  G = Math.round((G * (100 + percent)) / 100);
  B = Math.round((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

  return '#' + RR + GG + BB;
}
