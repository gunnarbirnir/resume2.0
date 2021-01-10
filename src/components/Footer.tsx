import React from 'react';
import { createUseStyles } from 'react-jss';
import { RiArrowUpSLine } from 'react-icons/ri';

import FlexContainer from './FlexContainer';
import ImageBlur from '../components/ImageBlur';
import { IPersonalInfo, ITheme, ILocale } from '../interfaces';
import { spacing } from '../utils';
import { PDF_MODE } from '../constants';
import useTheme from '../hooks/useTheme';
import useWindowSize from '../hooks/useWindowSize';
import translations from '../../assets/json/translations.json';

interface IProps {
  info: IPersonalInfo | null;
  locale: ILocale;
  scrollToTop: () => void;
}

const useStyles = createUseStyles((theme: ITheme) => ({
  container: {
    justifySelf: 'flex-end',
    width: '100%',
    backgroundColor: theme.colors.darkGray,
    padding: spacing(2),
  },
  content: {
    margin: '0px auto',
    maxWidth: theme.dimensions.contentWidth,
    justifyContent: 'space-between',
    [theme.mediaQueries.xsDown]: {
      justifyContent: 'flex-end',
    },
  },
  name: {
    color: theme.colors.white,
    [theme.mediaQueries.xsDown]: {
      display: 'none',
    },
  },
  backToTop: {
    color: theme.colors.white,
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      opacity: theme.effects.hoverOpacity,
    },
  },
  arrow: {
    position: 'absolute',
    top: -13,
    right: -10,
    cursor: 'pointer',
  },
  pdfLink: {
    color: theme.colors.white,
    textDecoration: 'none',
  },
}));

const Footer: React.FC<IProps> = ({ info, locale, scrollToTop }) => {
  const classes = useStyles();
  const theme = useTheme();
  const windowSize = useWindowSize();
  const xsDown = windowSize.width <= theme.breakpoints.xs;

  if (!info) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <FlexContainer className={classes.content}>
          <p className={classes.name}>{info.name}</p>
          {PDF_MODE ? (
            <a
              className={classes.pdfLink}
              href={`https://www.gunnarbirnir.com/${
                locale === 'en-US' ? 'en' : ''
              }`}
            >
              {translations.url[locale]}
            </a>
          ) : (
            <div className={classes.backToTop} onClick={scrollToTop}>
              <p style={{ marginRight: 40 }}>
                {translations.backToTop[locale]}
              </p>
              <RiArrowUpSLine
                size={50}
                className={classes.arrow}
                color={theme.colors.white}
              />
            </div>
          )}
        </FlexContainer>
      </div>
      <ImageBlur
        id="footer"
        src={info.backgroundImage.fluid.src}
        containerHeight={xsDown ? '30px' : '15px'}
        containerWidth="100%"
        positions={[{ width: '100%', height: '100%' }]}
      />
    </React.Fragment>
  );
};

export default Footer;
