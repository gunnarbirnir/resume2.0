import React from 'react';
import { createUseStyles } from 'react-jss';

import Section from './Section';
import FlexContainer from './FlexContainer';
import { IScrollSection, IJob, ITheme } from '../interfaces';
import { spacing } from '../utils';

interface IProps {
  jobs: IJob[];
  section: IScrollSection;
}

const MARKER_SIZE = 28;
const LINE_WIDTH = 4;

const useStyles = createUseStyles((theme: ITheme) => ({
  years: {
    width: 100,
    textAlign: 'right',
    [theme.mediaQueries.xsDown]: {
      display: 'none',
    },
  },
  mobileYears: {
    fontWeight: 'bold',
    marginRight: 6,
    color: theme.colors.primary,
    [theme.mediaQueries.xsUp]: {
      display: 'none',
    },
  },
  title: {
    margin: '4px 0px',
    '&:hover': {
      color: theme.colors.primary,
    },
  },
  jobTitle: {
    color: theme.colors.primary,
    marginBottom: spacing(1),
    [theme.mediaQueries.xsDown]: {
      color: theme.colors.textSecondary,
    },
  },
  marker: {
    zIndex: 2,
    marginLeft: spacing(1),
    marginRight: spacing(2),
    height: MARKER_SIZE,
    width: MARKER_SIZE,
    borderRadius: '50%',
    border: `4px solid ${theme.colors.primary}`,
    backgroundColor: theme.colors.lightGray,
    [theme.mediaQueries.xsDown]: {
      marginLeft: 0,
    },
  },
  line: {
    zIndex: 1,
    position: 'absolute',
    top: MARKER_SIZE / 2,
    bottom: `calc(-${spacing(4)} - ${MARKER_SIZE / 2}px)`,
    left: `calc(-${spacing(2)} - ${MARKER_SIZE / 2}px - ${LINE_WIDTH / 2}px)`,
    width: LINE_WIDTH,
    backgroundColor: theme.colors.primary,
  },
}));

const WorkSection: React.FC<IProps> = ({ jobs, section }) => {
  const classes = useStyles();

  return (
    <Section section={section} background="gray">
      <div style={{ maxWidth: 865, margin: '0px auto' }}>
        {jobs.map((job, index) => (
          <FlexContainer key={job.id} direction="row" alignItems="flex-start">
            <FlexContainer direction="row" alignItems="center">
              <p key={job.id} className={classes.years}>
                {getYearsString(job)}
              </p>
              <div className={classes.marker} />
            </FlexContainer>
            <div style={{ marginBottom: spacing(4), position: 'relative' }}>
              <div data-sal="slide-right" data-sal-duration="500">
                <a
                  href={job.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <h3 key={job.id} className={classes.title}>
                    {job.company}
                  </h3>
                </a>
                <p className={classes.jobTitle}>
                  <span className={classes.mobileYears}>
                    {getYearsString(job)}
                  </span>
                  {job.jobTitle}
                </p>
                <p>{job.description.description}</p>
              </div>
              {index < jobs.length - 1 && <div className={classes.line} />}
            </div>
          </FlexContainer>
        ))}
      </div>
    </Section>
  );

  function getYearsString(job: IJob) {
    return `${job.start}${
      job.end && job.start !== job.end ? ` - ${job.end}` : ''
    }`;
  }
};

export default WorkSection;
