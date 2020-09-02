import React from 'react';

import Layout from '../components/Layout';

const NotFoundPage: React.FC = () => {
  return (
    <Layout seo={{ locale: 'en-US', title: 'Page not found' }}>
      <h1>404</h1>
    </Layout>
  );
};

export default NotFoundPage;
