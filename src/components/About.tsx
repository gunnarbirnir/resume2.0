import React from 'react';
import { navigate } from 'gatsby';
import { createUseStyles } from 'react-jss';

import Button from './Button';
import { IPersonalInfo, ILocale } from '../interfaces';
import { spacing } from '../utils';

interface IProps {
  info: IPersonalInfo | null;
  locale: ILocale;
}

const useStyles = createUseStyles({
  title: {
    marginBottom: spacing(2),
  },
  info: {
    marginBottom: spacing(2),
  },
});

const About: React.FC<IProps> = ({ info, locale }) => {
  const classes = useStyles();
  const localeIS = locale === 'is';

  if (!info) {
    return null;
  }

  return (
    <div>
      <h1 className={classes.title}>{info.name}</h1>
      <p className={classes.info}>
        {info.jobTitle} - {info.email}
      </p>
      <Button onClick={() => navigate(localeIS ? '/en' : '/')}>
        {localeIS ? 'English' : 'Íslenska'}
      </Button>
    </div>
  );
};

export default About;
