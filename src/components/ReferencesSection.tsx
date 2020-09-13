import React from 'react';

import Section from './Section';
import { IScrollSection } from '../interfaces';

interface IProps {
  section: IScrollSection;
}

const ReferencesSection: React.FC<IProps> = ({ section }) => {
  return <Section section={section} background="gray" />;
};

export default ReferencesSection;
