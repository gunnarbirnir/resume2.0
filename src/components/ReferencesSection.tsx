import React from 'react';
import { createUseStyles } from 'react-jss';
import Img from 'gatsby-image';

import Section from './Section';
import FlexContainer from './FlexContainer';
import {
  IReference,
  IScrollSection,
  IBackgroundColor,
  ITheme,
} from '../interfaces';
import { spacing } from '../utils';
import { SLIDE_UP_ANIMATION, SLIDE_UP_DURATION } from '../constants';
import useTheme from '../hooks/useTheme';
import useWindowSize from '../hooks/useWindowSize';

interface IProps {
  references: IReference[];
  section: IScrollSection;
  background: IBackgroundColor;
}

const useStyles = createUseStyles((theme: ITheme) => ({
  container: {
    margin: spacing(0, 4),
    marginTop: 50,
    [theme.mediaQueries.xsDown]: {
      margin: 0,
    },
  },
  reference: {
    flex: 1,
    minWidth: 250,
    padding: spacing(0, 2),
    marginBottom: spacing(5),
    textAlign: 'center',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  image: {
    height: 180,
    width: 180,
    flexShrink: 0,
    marginBottom: spacing(2),
    borderRadius: '50%',
    boxShadow: '0px 5px 20px -8px rgba(0,0,0,0.75)',
  },
  email: {
    color: theme.colors.primary,
    marginBottom: spacing(1),
  },
}));

const ReferencesSection: React.FC<IProps> = ({
  references,
  section,
  background,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const windowSize = useWindowSize();
  const xsDown = windowSize.width <= theme.breakpoints.xs;

  return (
    <Section section={section} background={background}>
      <FlexContainer
        direction={xsDown ? 'column' : 'row'}
        wrap="wrap"
        className={classes.container}
      >
        {references.map((reference) => (
          <FlexContainer
            key={reference.id}
            direction="column"
            alignItems="center"
            data-sal={SLIDE_UP_ANIMATION}
            data-sal-duration={SLIDE_UP_DURATION}
            className={classes.reference}
          >
            <Img fluid={reference.image.fluid} className={classes.image} />
            <h3 style={{ fontSize: '1.2rem' }}>{reference.name}</h3>
            <p className={classes.email}>{reference.email}</p>
            <p>{reference.jobTitle}</p>
          </FlexContainer>
        ))}
      </FlexContainer>
    </Section>
  );
};

export default ReferencesSection;
