import Typography from 'typography';
import theme from '../theme';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  scaleRatio: 2.3,
  headerColor: theme.colors.textPrimary,
  headerFontFamily: ['Roboto', 'sans-serif'],
  bodyColor: theme.colors.textSecondary,
  bodyFontFamily: ['Roboto', 'sans-serif'],
});

export default typography;
