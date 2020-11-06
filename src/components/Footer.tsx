import React from 'react';
import { createUseStyles } from 'react-jss';
import { RiArrowUpSLine } from 'react-icons/ri';

import FlexContainer from './FlexContainer';
import ImageBlur from '../components/ImageBlur';
import { IPersonalInfo, ITheme, ILocale } from '../interfaces';
import { spacing } from '../utils';
import useTheme from '../hooks/useTheme';
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
}));

const Footer: React.FC<IProps> = ({ info, locale, scrollToTop }) => {
  const classes = useStyles();
  const theme = useTheme();

  if (!info) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <FlexContainer className={classes.content}>
          <p className={classes.name}>{info.name}</p>
          <div className={classes.backToTop} onClick={scrollToTop}>
            <p style={{ marginRight: 40 }}>{translations.backToTop[locale]}</p>
            <RiArrowUpSLine
              size={50}
              className={classes.arrow}
              color={theme.colors.white}
            />
          </div>
        </FlexContainer>
      </div>
      <div style={{ position: 'relative', height: 18, width: '100%' }}>
        <ImageBlur
          id="footer"
          src={info.backgroundImage.fluid.src}
          containerHeight="18px"
          containerWidth="100%"
          positions={[{ width: '100%', height: '100%' }]}
        />
      </div>
    </React.Fragment>
  );
};

export default Footer;
