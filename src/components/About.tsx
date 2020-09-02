import React from 'react';
import { Link } from 'gatsby';

import { IPersonalInfo, ILocale } from '../interfaces';

interface IProps {
  info: IPersonalInfo | null;
  locale: ILocale;
}

const About: React.FC<IProps> = ({ info, locale }) => {
  const localeIS = locale === 'is';

  if (!info) {
    return null;
  }

  return (
    <div>
      <h1>{info.name}</h1>
      <p>
        {info.jobTitle} - {info.email}
      </p>
      <Link to={localeIS ? '/en' : '/'}>
        {localeIS ? 'English' : 'Íslenska'}
      </Link>
    </div>
  );
};

export default About;
