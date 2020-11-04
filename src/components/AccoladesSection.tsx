import React from 'react';
import { createUseStyles } from 'react-jss';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';
import { IoIosTrophy } from 'react-icons/io';

import Section from './Section';
import FlexContainer from './FlexContainer';
import {
  IAccolade,
  IScrollSection,
  IBackgroundColor,
  ITheme,
} from '../interfaces';
import { spacing, hexToRgba, mediaQueryDown } from '../utils';
import useTheme from '../hooks/useTheme';

interface IProps {
  accolades: IAccolade[];
  section: IScrollSection;
  background: IBackgroundColor;
}

const HIDE_IMAGE = 700;

const useStyles = createUseStyles((theme: ITheme) => ({
  accolades: {
    width: `calc(50% - ${spacing(4)})`,
    [mediaQueryDown(HIDE_IMAGE)]: {
      width: '100%',
    },
  },
  accolade: {
    padding: spacing(2),
    backgroundColor: hexToRgba(theme.colors.primary, 0.05),
    borderRadius: theme.dimensions.borderRadiusLg,
    '&:not(:last-child)': {
      marginBottom: spacing(4),
    },
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '50%',
    maxWidth: 1000,
    height: '100%',
    maxHeight: 800,
    [mediaQueryDown(HIDE_IMAGE)]: {
      display: 'none',
    },
  },
}));

const AccoladesSection: React.FC<IProps> = ({
  accolades,
  section,
  background,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  let fluidImage: FluidObject | null = null;

  accolades.forEach((accolade) => {
    if (accolade.image) {
      fluidImage = accolade.image.fluid;
    }
  });

  return (
    <Section section={section} background={background}>
      <div className={classes.accolades}>{accolades.map(renderAccolade)}</div>
      {fluidImage && (
        <div className={classes.imageContainer}>
          <BackgroundImage
            fluid={fluidImage}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      )}
    </Section>
  );

  function renderAccolade(accolade: IAccolade) {
    return (
      <div
        key={accolade.id}
        className={classes.accolade}
        data-sal="slide-up"
        data-sal-duration="500"
      >
        <FlexContainer
          direction="row"
          alignItems="center"
          style={{ marginBottom: spacing(1) }}
        >
          <IoIosTrophy
            size={23}
            color={theme.colors.primary}
            style={{ marginRight: spacing(1) }}
          />
          <h3 style={{ fontSize: '1.2rem' }}>{accolade.title}</h3>
        </FlexContainer>
        <p>{accolade.description.description}</p>
      </div>
    );
  }
};

export default AccoladesSection;
