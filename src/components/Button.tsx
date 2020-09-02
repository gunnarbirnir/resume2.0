import React from 'react';
import { createUseStyles } from 'react-jss';

import SEO, { IProps as SEOProps } from './SEO';
import { ITheme } from '../interfaces';
import { spacing } from '../utils';

interface IProps {
  onClick: () => void;
}

const useStyles = createUseStyles((theme: ITheme) => ({
  container: {
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    padding: spacing(1, 2),
    cursor: 'pointer',
    border: 'none',
    outline: 0,
    borderRadius: 4,
    '&:hover': {
      backgroundColor: theme.colors.primaryDarker,
    },
  },
}));

const Button: React.FC<IProps> = ({ children, onClick }) => {
  const classes = useStyles();

  return (
    <button onClick={onClick} className={classes.container}>
      {children}
    </button>
  );
};

export default Button;
