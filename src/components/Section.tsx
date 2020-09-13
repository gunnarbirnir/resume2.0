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
  },
  content: {
    margin: '0px auto',
    maxWidth: theme.dimensions.contentWidth,
  },
  title: {
    marginBottom: spacing(2),
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
      id={section.scrollId}
      className={classes.container}
      style={{
        backgroundColor:
          background === 'white'
            ? theme.colors.white
            : theme.colors.backgroundGray,
      }}
    >
      <div className={classes.content}>
        <h2 className={classes.title}>{section.title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Section;