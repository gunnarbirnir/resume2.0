import React from 'react';

import Section from './Section';
import { IScrollSection, IBackgroundColor } from '../interfaces';

interface IProps {
  section: IScrollSection;
  background: IBackgroundColor;
}

const ProjectsSection: React.FC<IProps> = ({ section, background }) => {
  return <Section section={section} background={background} />;
};

export default ProjectsSection;
