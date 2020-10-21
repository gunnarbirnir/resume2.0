import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import BackgroundImage from 'gatsby-background-image';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import cx from 'classnames';

import Section from './Section';
import FlexContainer from './FlexContainer';
import {
  IProject,
  IScrollSection,
  ITheme,
  IBackgroundColor,
} from '../interfaces';
import { spacing } from '../utils';
import useTheme from '../hooks/useTheme';
import useWindowSize from '../hooks/useWindowSize';

interface IProps {
  projects: IProject[];
  section: IScrollSection;
  background: IBackgroundColor;
}

const ARROW_SIZE = 40;

const useStyles = createUseStyles((theme: ITheme) => ({
  project: {
    marginBottom: spacing(2),
    '&:not(:last-child)': {
      marginBottom: spacing(4),
    },
  },
  title: {
    marginBottom: spacing(1),
  },
  imageContainer: {
    position: 'relative',
    width: '60%',
    height: 350,
    [theme.mediaQueries.xsDown]: {
      width: '100%',
      height: 200,
    },
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  arrowContainer: {
    position: 'absolute',
    top: `calc(50% - ${ARROW_SIZE / 2}px)`,
  },
  activeArrowContainer: {
    cursor: 'pointer',
    '&:active': {
      transform: 'scale(1.1)',
    },
  },
  arrowBackground: {
    height: ARROW_SIZE,
    width: ARROW_SIZE,
    backgroundColor: theme.colors.white,
    transform: 'scale(0.8)',
    borderRadius: '50%',
    boxShadow: '0px 3px 10px 0px rgba(0,0,0,0.75)',
  },
  arrow: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  activeArrow: {
    '&:hover': {
      opacity: 0.9,
    },
  },
  dotContainer: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
  },
  imgDot: {
    height: 10,
    width: 10,
    borderRadius: '50%',
    margin: '0px 4px',
    border: `1px solid ${theme.colors.white}`,
    boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.75)',
  },
}));

const ProjectsSection: React.FC<IProps> = ({
  projects,
  section,
  background,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const windowSize = useWindowSize();
  const xsDown = windowSize.width <= theme.breakpoints.xs;
  const [imgSelection, setImgSelection] = useState<number[]>(
    projects.map((_) => 0)
  );

  return (
    <Section section={section} background={background}>
      {projects.slice(0, 1).map(renderProject)}
    </Section>
  );

  function renderProject(project: IProject, projectIndex: number) {
    const isOdd = projectIndex % 2;

    return (
      <FlexContainer
        key={project.id}
        className={classes.project}
        style={{
          flexDirection: xsDown ? 'column' : isOdd ? 'row-reverse' : 'row',
        }}
        data-sal-duration="500"
        data-sal="slide-up"
      >
        <div
          className={classes.imageContainer}
          style={
            xsDown
              ? { marginBottom: spacing(2) }
              : isOdd
              ? { marginLeft: spacing(4) }
              : { marginRight: spacing(4) }
          }
        >
          <BackgroundImage
            fluid={project.images[imgSelection[projectIndex]].fluid}
            className={classes.backgroundImage}
            onClick={() => nextImage(projectIndex)}
          />
          {renderArrow('prev', projectIndex)}
          {renderArrow('next', projectIndex)}
          {renderImgDots(projectIndex)}
        </div>
        <div style={{ flex: 1 }}>
          <h3 className={classes.title}>{project.title}</h3>
          <p>{project.description.description}</p>
        </div>
      </FlexContainer>
    );
  }

  function renderArrow(direction: 'prev' | 'next', projectIndex: number) {
    const horizontalPos = -15;
    const imgIndex = imgSelection[projectIndex];
    const disabled =
      (direction === 'prev' && imgIndex <= 0) ||
      (direction === 'next' &&
        imgIndex >= projects[projectIndex].images.length - 1);
    const onClick =
      direction === 'prev'
        ? () => prevImage(projectIndex)
        : () => nextImage(projectIndex);

    return (
      <div
        className={cx(classes.arrowContainer, {
          [classes.activeArrowContainer]: !disabled,
        })}
        style={
          direction === 'prev'
            ? { left: horizontalPos }
            : { right: horizontalPos }
        }
        onClick={disabled ? undefined : onClick}
      >
        <div className={classes.arrowBackground} />
        <IoIosArrowDropleftCircle
          size={ARROW_SIZE}
          color={disabled ? theme.colors.mediumLightGray : theme.colors.primary}
          className={cx(classes.arrow, { [classes.activeArrow]: !disabled })}
          style={{
            transform: direction === 'next' ? 'rotate(180deg)' : undefined,
          }}
        />
      </div>
    );
  }

  function renderImgDots(projectIndex: number) {
    const imgIndex = imgSelection[projectIndex];
    const imgCount = projects[projectIndex].images.length;

    const dots = [];
    for (var i = 0; i < imgCount; i++) {
      const index = i;
      const isCurrent = i === imgIndex;
      dots.push(
        <div
          key={index}
          className={classes.imgDot}
          style={{
            backgroundColor: isCurrent ? theme.colors.white : undefined,
            cursor: isCurrent ? 'auto' : 'pointer',
          }}
          onClick={
            !isCurrent ? () => goToImage(projectIndex, index) : undefined
          }
        />
      );
    }

    return (
      <FlexContainer
        direction="row"
        justifyContent="center"
        className={classes.dotContainer}
      >
        {dots}
      </FlexContainer>
    );
  }

  function prevImage(projectIndex: number) {
    const selection = { ...imgSelection };
    const current = --selection[projectIndex];
    if (current >= 0) {
      setImgSelection(selection);
    }
  }

  function nextImage(projectIndex: number) {
    const selection = { ...imgSelection };
    const current = ++selection[projectIndex];
    if (current < projects[projectIndex].images.length) {
      setImgSelection(selection);
    }
  }

  function goToImage(projectIndex: number, imgIndex: number) {
    const selection = { ...imgSelection };
    selection[projectIndex] = imgIndex;
    setImgSelection(selection);
  }
};

export default ProjectsSection;
