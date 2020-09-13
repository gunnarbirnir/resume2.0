import React from 'react';

import Section from './Section';

interface IProps {
  title: string;
}

const ProjectsSection = React.forwardRef(({ title }: IProps, ref) => {
  return <Section title={title} ref={ref} />;
});

export default ProjectsSection;
