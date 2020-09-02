import React from 'react';
import { graphql } from 'gatsby';

import About from '../components/About';
import SEO from '../components/SEO';
import { IPersonalInfo, IPageProps, IEdges } from '../interfaces';
import { getLocale, getFirstOfLocale } from '../utils';

interface IProps extends IPageProps {
  data: {
    allContentfulInfo: {
      edges: IEdges<IPersonalInfo>;
    };
  };
}

const ResumePage: React.FC<IProps> = ({ data, location }) => {
  const locale = getLocale(location.pathname);
  const info = getFirstOfLocale(data.allContentfulInfo.edges, locale);

  return (
    <React.Fragment>
      <SEO locale={locale} />
      <About info={info} locale={locale} />
    </React.Fragment>
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
  }
`;

export default ResumePage;
