import React from 'react';
import { createUseStyles } from 'react-jss';
import Img from 'gatsby-image';
import cx from 'classnames';

import Button from './Button';
import LocaleSelector from '../components/LocaleSelector';
import { IPersonalInfo, ILocale, ITheme } from '../interfaces';
import { spacing } from '../utils';
import translations from '../../assets/json/translations.json';

interface IProps {
  info: IPersonalInfo | null;
  locale: ILocale;
}

const useStyles = createUseStyles((theme: ITheme) => ({
  flexContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  padding: {
    padding: spacing(3),
  },
  localeSelector: {
    textAlign: 'right',
    marginBottom: spacing(1),
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 50,
    [theme.mediaQueries.xsDown]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  profile: {
    height: 180,
    width: 180,
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

  if (!info) {
    return null;
  }

  return (
    <div className={cx(classes.flexContainer, classes.padding)}>
      <div className={classes.localeSelector}>
        <LocaleSelector locale={locale} />
      </div>
      <div className={cx(classes.contentContainer, classes.flexContainer)}>
        <div
          className={classes.content}
          data-sal="slide-up"
          data-sal-duration="500"
        >
          <Img fluid={info.profilePicture.fluid} className={classes.profile} />
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
};

export default About;
