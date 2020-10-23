import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import BackgroundImage from 'gatsby-background-image';
import { RiArrowLeftSLine } from 'react-icons/ri';
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
    height: ARROW_SIZE,
    width: ARROW_SIZE,
    backgroundColor: theme.colors.mediumLightGray,
    borderRadius: '50%',
    boxShadow: '0px 3px 10px 0px rgba(0,0,0,0.75)',
  },
  activeArrowContainer: {
    cursor: 'pointer',
    backgroundColor: theme.colors.primary,
    '&:active': {
      transform: 'scale(1.1)',
    },
  },
  activeArrow: {
    '&:hover': {
      opacity: 0.9,
    },
  },
  dotContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(rgba(0,0,0,0) 80%, rgba(0,0,0,0.6))',
  },
  imgDot: {
    height: 10,
    width: 10,
    borderRadius: '50%',
    margin: '15px 4px',
    border: `1px solid ${theme.colors.white}`,
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
        // data-sal="slide-up"
        data-sal-duration="500"
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
          {renderImgDots(projectIndex)}
          {renderArrow('prev', projectIndex)}
          {renderArrow('next', projectIndex)}
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
      <FlexContainer
        justifyContent="center"
        alignItems="center"
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
        <RiArrowLeftSLine
          size={ARROW_SIZE}
          color={theme.colors.white}
          className={cx({ [classes.activeArrow]: !disabled })}
          style={{
            transform:
              direction === 'next'
                ? 'translateX(2px) rotate(180deg)'
                : 'translateX(-2px)',
          }}
        />
      </FlexContainer>
    );
  }

  function renderImgDots(projectIndex: number) {
    const dots = [];
    const imgIndex = imgSelection[projectIndex];
    const imgCount = projects[projectIndex].images.length;

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
        alignItems="flex-end"
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
