const breakpoints = {
  xs: 600,
  sm: 960,
  md: 1280,
  lg: 1920,
};

module.exports = {
  colors: {
    primary: '#007491',
    textPrimary: '#2e2e2e',
    textSecondary: '#696969',
    white: '#ffffff',
    backgroundGray: '#fafafa',
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
    contentWidth: 1200,
    borderRadius: 4,
  },
};
