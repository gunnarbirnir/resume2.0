import React from 'react';

import Section from './Section';

interface IProps {
  title: string;
}

const SkillsSection = React.forwardRef(({ title }: IProps, ref) => {
  return <Section title={title} ref={ref} background="gray" />;
});

export default SkillsSection;
