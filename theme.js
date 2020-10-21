const grays = {
  darkGray: '#2e2e2e',
  mediumDarkGray: '#525252',
  mediumGray: '#696969',
  mediumLightGray: '#9e9e9e',
  lightGray: '#fafafa',
};

const breakpoints = {
  xs: 600,
  sm: 960,
  md: 1280,
  lg: 1920,
};

module.exports = {
  colors: {
    primary: '#006a91',
    textPrimary: grays.darkGray,
    textSecondary: grays.mediumGray,
    white: '#ffffff',
    ...grays,
  },
  breakpoints,
  mediaQueries: {
    xsDown: `@media (max-width: ${breakpoints.xs}px)`,
    smDown: `@media (max-width: ${breakpoints.sm}px)`,
    mdDown: `@media (max-width: ${breakpoints.md}px)`,
    lgDown: `@media (max-width: ${breakpoints.lg}px)`,
    xsUp: `@media (min-width: ${breakpoints.xs}px)`,
    smUp: `@media (min-width: ${breakpoints.sm}px)`,
    mdUp: `@media (min-width: ${breakpoints.md}px)`,
    lgUp: `@media (min-width: ${breakpoints.lg}px)`,
  },
  dimensions: {
    contentWidth: 900,
    borderRadius: 4,
    navbarHeight: 48,
  },
  effects: {
    hoverOpacity: 0.8,
    hoverShade: 20,
  },
};
