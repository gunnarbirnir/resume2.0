import { graphql } from 'gatsby';

export const query = graphql`
  fragment PersonalInfo on ContentfulInfo {
    id
    node_locale
    name
    email
    jobTitle
    about {
      about
    }
    profilePicture {
      fluid(maxWidth: 400) {
        ...GatsbyContentfulFluid
      }
    }
  }
`;
