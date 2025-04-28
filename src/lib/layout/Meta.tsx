import { Helmet } from "react-helmet";

const APP_NAME = "name-to-ethnicity";

const Meta = () => {
  return (
    <Helmet>
      <title>N2E</title>
      <meta name="description" content="name-to-ethnicity official website" />

      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FFFFFF" />

      <link rel="shortcut icon" href="/favicon.ico" />
    </Helmet>
  );
};

export default Meta;
