import React from 'react';

import Layout from '../components/Layout';

const NotFoundPage: React.FC = () => {
  return (
    <Layout info={null} locale="en-US" seo={{ title: 'Page not found' }}>
      <h1>404 Page not found</h1>
    </Layout>
  );
};

export default NotFoundPage;
