import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import VisibilitySensor from 'react-visibility-sensor';

import Section from './Section';
import FlexContainer from './FlexContainer';
import {
  ISkill,
  IScrollSection,
  IBackgroundColor,
  ITheme,
} from '../interfaces';
import { spacing, mediaQueryDown } from '../utils';
import { SLIDE_UP_ANIMATION, SLIDE_UP_DURATION } from '../constants';

const useStyles = createUseStyles((theme: ITheme) => ({
  skill: {
    width: '30%',
    marginBottom: spacing(4),
    [theme.mediaQueries.xsDown]: {
      width: '47%',
    },
    [mediaQueryDown(350)]: {
      width: '100%',
    },
  },
  levelBackground: {
    width: '100%',
    height: 15,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 10,
    position: 'relative',
  },
  level: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    transition: 'width 500ms',
    transitionDelay: '700ms',
  },
}));

interface IProps {
  skills: ISkill[];
  section: IScrollSection;
  background: IBackgroundColor;
}

const SkillsSection: React.FC<IProps> = ({ skills, section, background }) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Section section={section} background={background}>
      <FlexContainer
        direction="row"
        wrap="wrap"
        justifyContent="space-between"
        style={{ width: '100%' }}
        data-sal={SLIDE_UP_ANIMATION}
        data-sal-duration={SLIDE_UP_DURATION}
      >
        {skills.sort(sortSkills).map(renderSkillItem)}
      </FlexContainer>
    </Section>
  );

  function renderSkillItem(skill: ISkill, index: number) {
    return (
      <VisibilitySensor
        key={skill.id}
        onChange={(visible) => !index && visible && setIsVisible(true)}
      >
        <div className={classes.skill} title={`${skill.level}%`}>
          <p style={{ marginBottom: 5 }}>{skill.title}</p>
          <div className={classes.levelBackground}>
            <div
              className={classes.level}
              style={{
                width: isVisible ? `${skill.level}%` : 0,
                borderTopRightRadius: skill.level > 95 ? 10 : 0,
                borderBottomRightRadius: skill.level > 95 ? 10 : 0,
              }}
            />
          </div>
        </div>
      </VisibilitySensor>
    );
  }

  function sortSkills(a: ISkill, b: ISkill) {
    if (a.level === b.level) {
      return a.sortIndex - b.sortIndex;
    }
    return b.level - a.level;
  }
};

export default SkillsSection;
