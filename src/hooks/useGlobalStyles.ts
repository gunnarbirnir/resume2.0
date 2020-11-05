import { createUseStyles } from 'react-jss';

import { ITheme } from '../interfaces';
import { PDF_MODE } from '../constants';

const globalStyles = createUseStyles((theme: ITheme) => ({
  hidePdf: {
    display: PDF_MODE ? 'none' : 'block'
  },
}));

export default globalStyles;