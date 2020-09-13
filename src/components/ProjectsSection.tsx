import React from 'react';

import Section from './Section';
import { IScrollSection } from '../interfaces';

interface IProps {
  section: IScrollSection;
}

const ProjectsSection: React.FC<IProps> = ({ section }) => {
  return <Section section={section} />;
};

export default ProjectsSection;
