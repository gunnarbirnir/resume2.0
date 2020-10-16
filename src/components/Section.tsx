import React from 'react';
import { createUseStyles } from 'react-jss';

import { ITheme, IScrollSection } from '../interfaces';
import { spacing } from '../utils';
import useTheme from '../hooks/useTheme';

interface IProps {
  section: IScrollSection;
  background?: 'white' | 'gray';
}

const useStyles = createUseStyles((theme: ITheme) => ({
  container: {
    minHeight: 500,
    padding: spacing(3),
    position: 'relative',
  },
  scrollElement: {
    position: 'absolute',
    top: -theme.dimensions.navbarHeight,
    height: theme.dimensions.navbarHeight,
    visibility: 'hidden',
    [theme.mediaQueries.xsDown]: {
      top: 0,
      height: 0,
    },
  },
  content: {
    margin: '0px auto',
    maxWidth: theme.dimensions.contentWidth,
  },
  title: {
    marginBottom: spacing(3),
  },
}));

const Section: React.FC<IProps> = ({
  section,
  background = 'white',
  children,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor:
          background === 'white' ? theme.colors.white : theme.colors.lightGray,
      }}
    >
      <div id={section.scrollId} className={classes.scrollElement} />
      <div className={classes.content}>
        <h2 className={classes.title}>{section.title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Section;
