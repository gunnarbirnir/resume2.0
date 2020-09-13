import React from 'react';
import { graphql } from 'gatsby';

import About from '../components/About';
import Layout from '../components/Layout';
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

  return (
    <Layout locale={locale} padding={false}>
      <About
        info={info}
        locale={locale}
        pageSections={pageLayout ? pageLayout.sections : []}
      />
    </Layout>
  );
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
