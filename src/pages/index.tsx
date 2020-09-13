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
        ref: createRef(),
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
          return (
            <WorkSection
              title={section.title}
              ref={section.ref}
              key={section.id}
            />
          );
        case 'projects':
          return (
            <ProjectsSection
              title={section.title}
              ref={section.ref}
              key={section.id}
            />
          );
        case 'skills':
          return (
            <SkillsSection
              title={section.title}
              ref={section.ref}
              key={section.id}
            />
          );
        case 'accolades':
          return (
            <AccoladesSection
              title={section.title}
              ref={section.ref}
              key={section.id}
            />
          );
        case 'references':
          return (
            <ReferencesSection
              title={section.title}
              ref={section.ref}
              key={section.id}
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
  }
`;

export default ResumePage;
