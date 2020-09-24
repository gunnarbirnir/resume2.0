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
    return pageSections.map((section) => {
      switch (section.component) {
        case 'work':
          return <WorkSection key={section.id} section={section} jobs={jobs} />;
        case 'projects':
          return <ProjectsSection key={section.id} section={section} />;
        case 'skills':
          return <SkillsSection key={section.id} section={section} />;
        case 'accolades':
          return <AccoladesSection key={section.id} section={section} />;
        case 'references':
          return <ReferencesSection key={section.id} section={section} />;
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
    allContentfulJob(sort: { order: DESC, fields: startYear }) {
      edges {
        node {
          ...Job
        }
      }
    }
  }
`;

export default ResumePage;
