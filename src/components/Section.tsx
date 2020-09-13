import React from 'react';
import { createUseStyles } from 'react-jss';

import { ITheme } from '../interfaces';
import { spacing } from '../utils';
import useTheme from '../hooks/useTheme';

interface IProps {
  title: string;
  background?: 'white' | 'gray';
  children?: React.ReactChildren;
}

const useStyles = createUseStyles((theme: ITheme) => ({
  container: {
    minHeight: 500,
    padding: spacing(3),
  },
  content: {
    margin: '0px auto',
    maxWidth: theme.dimensions.contentWidth,
  },
  title: {
    marginBottom: spacing(2),
  },
}));

const Section = React.forwardRef(
  ({ title, background = 'white', children }: IProps, ref) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
      <div
        ref={ref}
        className={classes.container}
        style={{
          backgroundColor:
            background === 'white'
              ? theme.colors.white
              : theme.colors.backgroundGray,
        }}
      >
        <div className={classes.content}>
          <h2 className={classes.title}>{title}</h2>
          {children}
        </div>
      </div>
    );
  }
);

export default Section;
