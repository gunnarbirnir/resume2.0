import React from 'react';
import { createUseStyles } from 'react-jss';

import { ITheme, IScrollSection, IBackgroundColor } from '../interfaces';
import { spacing, getBackgroundColor } from '../utils';

interface IProps {
  section: IScrollSection;
  background: IBackgroundColor;
}

const useStyles = createUseStyles((theme: ITheme) => ({
  container: {
    padding: spacing(3),
    paddingTop: spacing(4),
    paddingBottom: spacing(6),
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
    marginBottom: spacing(4),
  },
}));

const Section: React.FC<IProps> = ({ section, background, children }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.container}
      style={{ backgroundColor: getBackgroundColor(background) }}
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
