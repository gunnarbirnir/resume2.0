import React from 'react';
import { createUseStyles } from 'react-jss';

import Button from './Button';
import Image from './Image';
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
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'row',
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
      marginBottom: spacing(4),
    },
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
      <div
        className={classes.content}
        data-sal="slide-up"
        data-sal-duration="500"
      >
        <Image fluid={info.profilePicture.fluid} className={classes.profile} />
        <div>
          <h1 className={classes.title}>{info.name}</h1>
          <p className={classes.info}>{info.about.about}</p>
          {['Störf', 'Verkefni', 'Viðurkenningar', 'Kunnátta', 'Meðmæli'].map(
            renderButton
          )}
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
