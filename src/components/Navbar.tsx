import React from 'react';
import { createUseStyles } from 'react-jss';
import cx from 'classnames';

import FlexContainer from './FlexContainer';
import Button from './Button';
import { ITheme, ILocale, IScrollSection } from '../interfaces';
import { spacing, scrollTo } from '../utils';
import useTheme from '../hooks/useTheme';
import useWindowSize from '../hooks/useWindowSize';
import useScrollPosition from '../hooks/useScrollPosition';

interface IProps {
  locale: ILocale;
  pageSections: IScrollSection[];
}

const useStyles = createUseStyles((theme: ITheme) => ({
  container: {
    zIndex: 5,
    position: 'fixed',
    width: '100%',
    height: theme.dimensions.navbarHeight,
    transition: 'transform 100ms',
    backgroundColor: theme.colors.white,
    padding: spacing(0, 2),
    boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.35)',
    [theme.mediaQueries.xsDown]: {
      display: 'none !important',
    },
  },
  hide: {
    transform: `translateY(-${theme.dimensions.navbarHeight}px)`,
    boxShadow: 'none',
  },
  content: {
    margin: '0px auto',
  },
  button: {
    marginRight: 4,
    marginLeft: 4,
  },
}));

const Navbar: React.FC<IProps> = ({ locale, pageSections }) => {
  const classes = useStyles();
  const theme = useTheme();
  const windowSize = useWindowSize();
  const scrollPos = useScrollPosition();
  const hideNavbar =
    !scrollPos || scrollPos < windowSize.height - theme.dimensions.navbarHeight;

  return (
    <FlexContainer
      justifyContent="center"
      alignItems="center"
      className={cx(classes.container, { [classes.hide]: hideNavbar })}
    >
      <div className={classes.content}>{pageSections.map(renderButton)}</div>
    </FlexContainer>
  );

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
};

export default Navbar;
