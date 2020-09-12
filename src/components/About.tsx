import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import Img from 'gatsby-image';
import cx from 'classnames';

import Button from './Button';
import LocaleSelector from '../components/LocaleSelector';
import ImageBlur from '../components/ImageBlur';
import { IPersonalInfo, ILocale, ITheme } from '../interfaces';
import { spacing } from '../utils';
import useWindowSize from '../hooks/useWindowSize';
import useTheme from '../hooks/useTheme';
import useObjectSize from '../hooks/useObjectSize';
import translations from '../../assets/json/translations.json';

interface IProps {
  info: IPersonalInfo | null;
  locale: ILocale;
}

const PROFILE_PIC_SIZE = 180;
const CONTENT_WIDTH = 800;
const SIDE_PADDING = 32;

const useStyles = createUseStyles((theme: ITheme) => ({
  sideBackground: {
    zIndex: 0,
    position: 'absolute',
  },
  flexContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  padding: {
    padding: `${spacing(3)} ${SIDE_PADDING}px`,
  },
  localeContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: spacing(1),
  },
  localeSelector: {
    [theme.mediaQueries.xsDown]: {
      padding: '4px 12px',
      borderRadius: theme.dimensions.borderRadius,
      backgroundColor: theme.colors.white,
      transform: 'translateX(6px)',
    },
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    [theme.mediaQueries.xsDown]: {
      justifyContent: 'flex-start',
    },
  },
  content: {
    maxWidth: CONTENT_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 35,
    [theme.mediaQueries.xsDown]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  profile: {
    height: PROFILE_PIC_SIZE,
    width: PROFILE_PIC_SIZE,
    flexShrink: 0,
    marginRight: spacing(4),
    borderRadius: '50%',
    boxShadow: '0px 5px 20px -8px rgba(0,0,0,0.75)',
    [theme.mediaQueries.xsDown]: {
      marginRight: 0,
      marginBottom: spacing(2),
    },
  },
  button: {
    marginRight: spacing(1),
    marginBottom: spacing(1),
  },
}));

const About: React.FC<IProps> = ({ info, locale }) => {
  const classes = useStyles();
  const theme = useTheme();
  const windowSize = useWindowSize();
  const contentRef = useRef(null);
  const contentSize = useObjectSize(contentRef);

  const backgroundHeight = getBackgroundHeight();
  const backgroundWidth = getBackgroundWidth();

  if (!info) {
    return null;
  }

  return (
    <React.Fragment>
      <div
        className={classes.sideBackground}
        style={{ height: backgroundHeight, width: backgroundWidth }}
      >
        <ImageBlur
          src={info.backgroundImage.fluid.src}
          containerHeight={`${backgroundHeight}px`}
          containerWidth={`${backgroundWidth}px`}
          positions={[{ width: '100%', height: '100%' }]}
        />
      </div>
      <div
        ref={contentRef}
        style={{ zIndex: 1 }}
        className={cx(classes.flexContainer, classes.padding)}
      >
        <div className={classes.localeContainer}>
          <div className={classes.localeSelector}>
            <LocaleSelector locale={locale} />
          </div>
        </div>
        <div className={cx(classes.flexContainer, classes.contentContainer)}>
          <div
            className={classes.content}
            data-sal="slide-up"
            data-sal-duration="500"
          >
            <Img
              fluid={info.profilePicture.fluid}
              className={classes.profile}
            />
            <div>
              <h1 style={{ marginBottom: spacing(2) }}>{info.name}</h1>
              <p style={{ marginBottom: spacing(3) }}>{info.about.about}</p>
              {[
                translations.work[locale],
                translations.projects[locale],
                translations.skills[locale],
                translations.accolades[locale],
                translations.references[locale],
              ].map(renderButton)}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  function renderButton(text: string) {
    return (
      <Button
        key={text}
        size="small"
        onClick={() => null}
        className={classes.button}
      >
        {text}
      </Button>
    );
  }

  function getBackgroundHeight() {
    return windowSize.width > theme.breakpoints.xs
      ? Math.max(windowSize.height, contentSize.height)
      : 200;
  }

  function getBackgroundWidth() {
    if (windowSize.width <= theme.breakpoints.xs) {
      return windowSize.width;
    }
    if (windowSize.width <= CONTENT_WIDTH + SIDE_PADDING * 2) {
      return SIDE_PADDING + PROFILE_PIC_SIZE / 2;
    }
    return (windowSize.width - CONTENT_WIDTH) / 2 + PROFILE_PIC_SIZE / 2;
  }
};

export default About;
