import React, { useRef } from 'react';
import { graphql } from 'gatsby';

import Header from '../components/Header';
import Layout from '../components/Layout';
import WorkSection from '../components/WorkSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import AccoladesSection from '../components/AccoladesSection';
import ReferencesSection from '../components/ReferencesSection';
import {
  IPersonalInfo,
  IPageProps,
  IEdges,
  IPageLayout,
  IJob,
  IProject,
  ISkill,
  IAccolade,
} from '../interfaces';
import { getLocale, getFirstOfLocale, getAllForLocale } from '../utils';
import useObjectSize from '../hooks/useObjectSize';

interface IProps extends IPageProps {
  data: {
    allContentfulInfo: {
      edges: IEdges<IPersonalInfo>;
    };
    allContentfulPageLayout: {
      edges: IEdges<IPageLayout>;
    };
    allContentfulJob: {
      edges: IEdges<IJob>;
    };
    allContentfulProject: {
      edges: IEdges<IProject>;
    };
    allContentfulSkill: {
      edges: IEdges<ISkill>;
    };
    allContentfulAccolade: {
      edges: IEdges<IAccolade>;
    };
  };
}

const ResumePage: React.FC<IProps> = ({ data, location }) => {
  const headerRef = useRef(null);
  const headerSize = useObjectSize(headerRef);

  const locale = getLocale(location.pathname);
  const info = getFirstOfLocale(data.allContentfulInfo.edges, locale);
  const pageLayout = getFirstOfLocale(
    data.allContentfulPageLayout.edges,
    locale
  );
  const pageSections = pageLayout
    ? pageLayout.sections.map((section) => ({
        ...section,
        scrollId: `${section.component}-${section.id}`,
      }))
    : [];
  const jobs = getAllForLocale(data.allContentfulJob.edges, locale);
  const projects = getAllForLocale(data.allContentfulProject.edges, locale);
  const skills = getAllForLocale(data.allContentfulSkill.edges, locale);
  const accolades = getAllForLocale(data.allContentfulAccolade.edges, locale);

  return (
    <Layout
      locale={locale}
      padding={false}
      pageSections={pageSections}
      headerSize={headerSize}
    >
      <div ref={headerRef}>
        <Header
          info={info}
          locale={locale}
          pageSections={pageSections}
          contentSize={headerSize}
        />
      </div>
      {renderSections()}
    </Layout>
  );

  function renderSections() {
    return pageSections.map((section, index) => {
      const background = index % 2 ? 'white' : 'gray';
      switch (section.component) {
        case 'work':
          return (
            <WorkSection
              key={section.id}
              jobs={jobs}
              section={section}
              background={background}
            />
          );
        case 'projects':
          return (
            <ProjectsSection
              key={section.id}
              projects={projects}
              section={section}
              background={background}
            />
          );
        case 'skills':
          return (
            <SkillsSection
              key={section.id}
              skills={skills}
              section={section}
              background={background}
            />
          );
        case 'accolades':
          return (
            <AccoladesSection
              key={section.id}
              accolades={accolades}
              section={section}
              background={background}
            />
          );
        case 'references':
          return (
            <ReferencesSection
              key={section.id}
              section={section}
              background={background}
            />
          );
      }
    });
  }
};

export const query = graphql`
  query InfoQuery {
    allContentfulInfo {
      edges {
        node {
          ...PersonalInfo
        }
      }
    }
    allContentfulPageLayout {
      edges {
        node {
          ...PageLayout
        }
      }
    }
    allContentfulJob(sort: { fields: start, order: DESC }) {
      edges {
        node {
          ...Job
        }
      }
    }
    allContentfulProject(sort: { fields: published, order: DESC }) {
      edges {
        node {
          ...Project
        }
      }
    }
    allContentfulSkill {
      edges {
        node {
          ...Skill
        }
      }
    }
    allContentfulAccolade(sort: { fields: date }) {
      edges {
        node {
          ...Accolade
        }
      }
    }
  }
`;

export default ResumePage;
