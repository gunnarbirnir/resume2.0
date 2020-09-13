import React from 'react';

import Section from './Section';
import { IScrollSection } from '../interfaces';

interface IProps {
  section: IScrollSection;
}

const SkillsSection: React.FC<IProps> = ({ section }) => {
  return <Section section={section} background="gray" />;
};

export default SkillsSection;
