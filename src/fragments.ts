import { graphql } from 'gatsby';

export const query = graphql`
  fragment PersonalInfo on ContentfulInfo {
    id
    node_locale
    name
    email
    jobTitle
    phoneNumber
    facebook
    about {
      about
    }
    profilePicture {
      fluid(maxWidth: 180) {
        ...GatsbyContentfulFluid
      }
    }
    backgroundImage {
      fluid {
        ...GatsbyContentfulFluid
      }
    }
  }

  fragment PageSection on ContentfulPageSection {
    id
    node_locale
    title
  }

  fragment PageLayout on ContentfulPageLayout {
    id
    node_locale
    sections {
      ...PageSection
    }
  }
`;
