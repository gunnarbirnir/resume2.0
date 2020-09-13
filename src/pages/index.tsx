import React, { createRef } from 'react';
import { graphql } from 'gatsby';

import About from '../components/About';
import Layout from '../components/Layout';
import WorkSection from '../components/WorkSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import AccoladesSection from '../components/AccoladesSection';
import ReferencesSection from '../components/ReferencesSection';
import { IPersonalInfo, IPageProps, IEdges, IPageLayout } from '../interfaces';
import { getLocale, getFirstOfLocale } from '../utils';

interface IProps extends IPageProps {
  data: {
    allContentfulInfo: {
      edges: IEdges<IPersonalInfo>;
    };
    allContentfulPageLayout: {
      edges: IEdges<IPageLayout>;
    };
  };
}

const ResumePage: React.FC<IProps> = ({ data, location }) => {
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

  return (
    <Layout locale={locale} padding={false}>
      <About info={info} locale={locale} pageSections={pageSections} />
      {renderSections()}
    </Layout>
  );

  function renderSections() {
    return pageSections.map((section) => {
      switch (section.component) {
        case 'work':
          return <WorkSection key={section.id} section={section} />;
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
  }
`;

export default ResumePage;
