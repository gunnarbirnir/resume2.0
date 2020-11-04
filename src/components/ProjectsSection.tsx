import React, { useState, createRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { RiArrowLeftSLine } from 'react-icons/ri';
import Img, { FluidObject } from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';
import cx from 'classnames';

import Section from './Section';
import FlexContainer from './FlexContainer';
import {
  IProject,
  IScrollSection,
  ITheme,
  IBackgroundColor,
} from '../interfaces';
import { spacing, shadeColor, getBackgroundColor } from '../utils';
import useTheme from '../hooks/useTheme';
import useWindowSize from '../hooks/useWindowSize';
import useObjectSizes from '../hooks/useObjectSizes';

interface IProps {
  projects: IProject[];
  section: IScrollSection;
  background: IBackgroundColor;
}

const ARROW_SIZE = 40;

const useStyles = createUseStyles((theme: ITheme) => ({
  project: {
    position: 'relative',
    padding: spacing(3),
    marginBottom: spacing(2),
    borderRadius: theme.dimensions.borderRadiusLg,
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
      height: 250,
    },
  },
  portraitContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    visibility: 'hidden',
    width: '70%',
    height: 350,
    [theme.mediaQueries.smDown]: {
      width: '50%',
      height: 300,
    },
    [theme.mediaQueries.xsDown]: {
      width: '100%',
      height: 250,
    },
  },
  portraitImage: {
    margin: spacing(0, 1),
    position: 'relative',
  },
  arrowContainer: {
    position: 'absolute',
    top: `calc(50% - ${ARROW_SIZE / 2}px)`,
    height: ARROW_SIZE,
    width: ARROW_SIZE,
    backgroundColor: theme.colors.mediumLightGray,
    borderRadius: '50%',
    boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.5)',
  },
  activeArrowContainer: {
    cursor: 'pointer',
    backgroundColor: theme.colors.primary,
    '&:active': {
      transform: 'scale(1.1)',
    },
    '&:hover': {
      backgroundColor: shadeColor(
        theme.colors.primary,
        theme.effects.hoverShade
      ),
    },
  },
  dotContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(rgba(0,0,0,0) 80%, rgba(0,0,0,0.3))',
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

  const [imgContainerRefs, setImgContainerRefs] = useState<
    React.RefObject<HTMLDivElement>[]
  >([]);
  const imgContainerSizes = useObjectSizes(imgContainerRefs);
  const [imgSelection, setImgSelection] = useState<number[]>(
    projects.map((_) => 0)
  );

  useEffect(() => {
    setImgContainerRefs(projects.map((_) => createRef()));
  }, [projects]);

  useEffect(() => {
    setImgSelection(projects.map((_) => 0));
  }, [projects, windowSize.width]);

  return (
    <Section section={section} background={background}>
      {projects.map(renderProject)}
    </Section>
  );

  function renderProject(project: IProject, projectIndex: number) {
    const isOdd = projectIndex % 2;
    const isPortrait = project.display === 'portrait';

    return (
      <FlexContainer
        key={project.id}
        className={classes.project}
        style={{
          backgroundColor: getBackgroundColor(background, true),
          flexDirection: xsDown ? 'column' : isOdd ? 'row-reverse' : 'row',
        }}
        data-sal="slide-up"
        data-sal-duration="500"
      >
        <div
          className={classes.imageArea}
          ref={imgContainerRefs[projectIndex]}
        />
        <div
          className={
            isPortrait ? classes.portraitContainer : classes.imageContainer
          }
          style={
            xsDown
              ? { marginBottom: spacing(3) }
              : isOdd
              ? { marginLeft: spacing(4) }
              : { marginRight: spacing(4) }
          }
        >
          {isPortrait ? (
            renderPortraitImages(project.images, projectIndex)
          ) : (
            <React.Fragment>
              <BackgroundImage
                fluid={project.images[imgSelection[projectIndex]].fluid}
                style={{ height: '100%', width: '100%' }}
              />
              {project.images.length && renderImgDots(projectIndex)}
              {project.images.length && renderArrow('prev', projectIndex)}
              {project.images.length && renderArrow('next', projectIndex)}
            </React.Fragment>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h3 className={classes.title}>{project.title}</h3>
          <p>{project.description.description}</p>
        </div>
      </FlexContainer>
    );
  }

  function renderPortraitImages(
    images: { fluid: FluidObject }[],
    projectIndex: number
  ) {
    const imgIndex = imgSelection[projectIndex];
    const displayImgs: ((children: React.ReactNode) => React.ReactNode)[] = [];
    const containerSize = imgContainerSizes[projectIndex] || {
      width: 0,
      height: 0,
    };
    let widthUsed = 0;

    images.slice(imgIndex).forEach((img, index) => {
      const imgWidth = img.fluid.aspectRatio * containerSize.height;
      const imgHeight = imgWidth * (1 / img.fluid.aspectRatio);

      if (imgWidth < containerSize.width - widthUsed) {
        widthUsed += imgWidth;
        displayImgs.push((children: React.ReactNode) => (
          <div
            key={index}
            className={classes.portraitImage}
            style={{ width: imgWidth, maxHeight: imgHeight }}
          >
            <Img
              fluid={img.fluid}
              style={{
                boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
              }}
              imgStyle={{
                objectFit: 'contain',
                objectPosition: '50% 0%',
                userSelect: 'none',
              }}
            />
            {children}
          </div>
        ));
      }
    });

    const displayArrows = images.length > displayImgs.length;
    return displayImgs.map((img, index) =>
      img(
        <React.Fragment>
          {displayArrows &&
            index === 0 &&
            renderArrow('prev', projectIndex, displayImgs.length)}
          {displayArrows &&
            index === displayImgs.length - 1 &&
            renderArrow('next', projectIndex, displayImgs.length)}
        </React.Fragment>
      )
    );
  }

  function renderArrow(
    direction: 'prev' | 'next',
    projectIndex: number,
    imagesDisplayed: number = 1
  ) {
    const horizontalPos = -15;
    const imgIndex = imgSelection[projectIndex];
    const disabled =
      (direction === 'prev' && imgIndex <= 0) ||
      (direction === 'next' &&
        imgIndex + imagesDisplayed >= projects[projectIndex].images.length);
    const onClick =
      direction === 'prev'
        ? () => prevImage(projectIndex, imagesDisplayed)
        : () => nextImage(projectIndex, imagesDisplayed);

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

  function prevImage(projectIndex: number, imagesDisplayed: number) {
    const selection = { ...imgSelection };
    const current = --selection[projectIndex];
    if (current >= 0) {
      setImgSelection(selection);
    }
  }

  function nextImage(projectIndex: number, imagesDisplayed: number) {
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
