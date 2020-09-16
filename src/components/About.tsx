import React, { useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import Img from 'gatsby-image';
import cx from 'classnames';
import { IconType } from 'react-icons';
import { IoMdMail, IoLogoFacebook } from 'react-icons/io';
import { FaPhone } from 'react-icons/fa';
import { RiArrowDownSLine } from 'react-icons/ri';

import Button from './Button';
import FlexContainer from './FlexContainer';
import LocaleSelector from '../components/LocaleSelector';
import ImageBlur from '../components/ImageBlur';
import { IPersonalInfo, ILocale, ITheme, IScrollSection } from '../interfaces';
import { spacing, scrollTo } from '../utils';
import useWindowSize from '../hooks/useWindowSize';
import useTheme from '../hooks/useTheme';
import useObjectSize from '../hooks/useObjectSize';

interface IProps {
  info: IPersonalInfo | null;
  locale: ILocale;
  pageSections: IScrollSection[];
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
  container: {
    zIndex: 1,
    minHeight: '100vh',
    padding: `${spacing(3)} ${SIDE_PADDING}px`,
    position: 'relative',
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
  arrowContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  '@keyframes bounce': {
    '2%': { transform: 'translateY(0px)' },
    '4%': { transform: 'translateY(-15px)' },
    '6%': { transform: 'translateY(0px)' },
    '8%': { transform: 'translateY(-10px)' },
    '10%': { transform: 'translateY(0px)' },
  },
  arrow: {
    cursor: 'pointer',
    '&:hover': {
      opacity: theme.effects.hoverOpacity,
    },
  },
  arrowAnimation: {
    animationName: '$bounce',
    animationDuration: '5s',
    animationDelay: '1s',
    animationIterationCount: 4,
  },
  contactInfo: {
    [theme.mediaQueries.xsDown]: {
      justifyContent: 'center',
    },
  },
  contactItem: {
    marginRight: spacing(2),
    marginBottom: spacing(1),
    whiteSpace: 'nowrap',
  },
  contactLink: {
    color: theme.colors.textSecondary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.colors.primary,
    },
  },
  button: {
    marginRight: spacing(1),
    marginBottom: spacing(1),
  },
}));

const About: React.FC<IProps> = ({ info, locale, pageSections }) => {
  const classes = useStyles();
  const theme = useTheme();
  const windowSize = useWindowSize();
  const contentRef = useRef(null);
  const contentSize = useObjectSize(contentRef);
  const [disableArrowAnimation, setDisableArrowAnimation] = useState(false);

  const backgroundHeight = getBackgroundHeight();
  const backgroundWidth = getBackgroundWidth();
  const displayArrow = contentSize.height <= windowSize.height;

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
        className={cx(classes.flexContainer, classes.container)}
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
              <FlexContainer
                direction="row"
                wrap="wrap"
                className={classes.contactInfo}
                style={{ marginBottom: spacing(2) }}
              >
                <ContactInfo
                  text={info.email}
                  link={`mailto:${info.email}`}
                  Icon={IoMdMail}
                />
                <ContactInfo
                  text={info.phoneNumber}
                  link={`tel:${info.phoneNumber}`}
                  Icon={FaPhone}
                  iconSize={15}
                />
                <ContactInfo
                  newTab
                  text={info.facebook}
                  link={`https://www.facebook.com/${info.facebook}`}
                  Icon={IoLogoFacebook}
                />
              </FlexContainer>
              <p style={{ marginBottom: spacing(3) }}>{info.about.about}</p>
              {pageSections.map(renderButton)}
            </div>
          </div>
        </div>

        {displayArrow && (
          <FlexContainer
            justifyContent="center"
            className={classes.arrowContainer}
          >
            <RiArrowDownSLine
              size={50}
              color={theme.colors.mediumGray}
              className={cx(classes.arrow, {
                [classes.arrowAnimation]: !disableArrowAnimation,
              })}
              onClick={onArrowClick}
            />
          </FlexContainer>
        )}
      </div>
    </React.Fragment>
  );

  function ContactInfo(contactProps: {
    text: string;
    link: string;
    newTab?: boolean;
    Icon: IconType;
    iconSize?: number;
  }) {
    const { text, link, newTab = false, Icon, iconSize = 20 } = contactProps;

    return (
      <FlexContainer
        direction="row"
        alignItems="center"
        className={classes.contactItem}
      >
        <Icon
          size={iconSize}
          color={theme.colors.primary}
          style={{ marginRight: spacing(1) }}
        />
        <a
          href={link}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
          className={classes.contactLink}
        >
          {text}
        </a>
      </FlexContainer>
    );
  }

  function renderButton(section: IScrollSection) {
    return (
      <Button
        key={section.id}
        size="small"
        className={classes.button}
        onClick={() => scrollTo(section.scrollId)}
      >
        {section.title}
      </Button>
    );
  }

  function onArrowClick() {
    if (pageSections.length) {
      scrollTo(pageSections[0].scrollId);
      setDisableArrowAnimation(true);
    }
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
