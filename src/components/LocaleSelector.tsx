import React from 'react';
import { createUseStyles } from 'react-jss';
import { navigate } from 'gatsby';

import { ILocale, ITheme } from '../interfaces';
import useGlobalStyles from '../hooks/useGlobalStyles';

interface IProps {
  locale: ILocale;
}

const useStyles = createUseStyles((theme: ITheme) => ({
  text: {
    fontSize: 18,
    userSelect: 'none',
  },
  selected: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  notSelected: {
    cursor: 'pointer',
    '&:hover': {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  },
}));

const LocaleSelector: React.FC<IProps> = ({ locale }) => {
  const classes = useStyles();
  const global = useGlobalStyles();
  const localeIS = locale === 'is';

  return (
    <div className={global.hidePdf}>
      <p className={classes.text}>
        {renderLocaleItem('IS', localeIS)}
        {' / '}
        {renderLocaleItem('EN', !localeIS)}
      </p>
    </div>
  );

  function renderLocaleItem(text: string, selected: boolean) {
    return (
      <span
        onClick={() => !selected && navigate(localeIS ? '/en' : '/')}
        className={selected ? classes.selected : classes.notSelected}
      >
        {text}
      </span>
    );
  }
};

export default LocaleSelector;
