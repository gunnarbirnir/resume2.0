import React from 'react';
import { createUseStyles } from 'react-jss';
import cx from 'classnames';

import { ITheme } from '../interfaces';
import { spacing, shadeColor } from '../utils';

interface IProps {
  onClick: () => void;
  size?: 'small' | 'default' | 'large';
  className?: string;
}

const useStyles = createUseStyles((theme: ITheme) => ({
  container: {
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    cursor: 'pointer',
    border: 'none',
    outline: 0,
    borderRadius: theme.dimensions.borderRadius,
    '&:hover': {
      backgroundColor: shadeColor(
        theme.colors.primary,
        theme.effects.hoverShade
      ),
    },
  },
  small: {
    padding: '4px 12px',
  },
  default: {
    padding: spacing(1, 2),
  },
  large: {
    padding: spacing(2, 3),
  },
}));

const Button: React.FC<IProps> = ({
  size = 'default',
  children,
  className,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <button
      onClick={onClick}
      className={cx(classes.container, classes[size], className)}
    >
      {children}
    </button>
  );
};

export default Button;
