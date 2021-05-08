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
    linkedIn
    about {
      about
    }
    profilePicture {
      fluid(maxWidth: 180) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    backgroundImage {
      fluid {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }

  fragment PageSection on ContentfulPageSection {
    id
    node_locale
    title
    component
  }

  fragment PageLayout on ContentfulPageLayout {
    id
    node_locale
    sections {
      ...PageSection
    }
  }

  fragment Job on ContentfulJob {
    id
    node_locale
    company
    jobTitle
    website
    start(formatString: "YYYY")
    end(formatString: "YYYY")
    description {
      description
    }
  }

  fragment Project on ContentfulProject {
    id
    node_locale
    title
    display
    description {
      description
    }
    images {
      fluid(maxWidth: 630) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }

  fragment Skill on ContentfulSkill {
    id
    node_locale
    title
    level
    sortIndex
  }

  fragment Accolade on ContentfulAccolade {
    id
    node_locale
    title
    description {
      description
    }
    image {
      fluid(maxWidth: 1000) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }

  fragment Reference on ContentfulReference {
    id
    node_locale
    name
    email
    jobTitle
    image {
      fluid(maxWidth: 180) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`;
