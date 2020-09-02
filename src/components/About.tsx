import React from 'react';
import { createUseStyles } from 'react-jss';

import Button from './Button';
import { IPersonalInfo, ILocale, ITheme } from '../interfaces';
import { spacing } from '../utils';

interface IProps {
  info: IPersonalInfo | null;
  locale: ILocale;
}

const useStyles = createUseStyles((theme: ITheme) => ({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
    maxWidth: 600,
  },
  title: {
    marginBottom: spacing(2),
  },
  info: {
    marginBottom: spacing(3),
  },
  button: {
    marginRight: spacing(1),
    marginBottom: spacing(1),
  },
}));

const About: React.FC<IProps> = ({ info, locale }) => {
  const classes = useStyles();
  const localeIS = locale === 'is';

  if (!info) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1 className={classes.title}>{info.name}</h1>
        <p className={classes.info}>{info.about.about}</p>
        {['Störf', 'Verkefni', 'Viðurkenningar', 'Kunnátta', 'Meðmæli'].map(
          renderButton
        )}
      </div>
    </div>
  );

  function renderButton(text: string) {
    return (
      <Button size="small" onClick={() => null} className={classes.button}>
        {text}
      </Button>
    );
  }
};

export default About;
