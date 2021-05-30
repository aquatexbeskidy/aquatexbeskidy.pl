// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const SEOContainer = ({ meta }) => {
  const query = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteTitle
          siteUrl
        }
      }
    }
  `);

  const { siteUrl, siteTitle } = query.site.siteMetadata;
  const { title, description, permalink } = meta;

  const hemletMetaData = [
    { name: 'description', content: `${description}` },
    { name: 'title', content: `${title}` },

    { property: 'og:url', content: `${siteUrl}${permalink}` },
    { property: 'og:title', content: `${title}` },
    { property: 'og:type', content: 'website' },
  ];

  const hemletLinks = [
    {
      href: `${siteUrl}${permalink}`,
      rel: 'canonical',
    },
  ];

  const hemletScripts = [
    {
      type: 'text/javascript',
      innerHTML: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1369004450132215');
      fbq('track', 'PageView');`,
    },
    {
      type: 'text/javascript',
      //async={true},
      src: 'https://www.googletagmanager.com/gtag/js?id=G-GF3EERM084',
    },
    {
      type: 'text/javascript',
      innerHTML: ` window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-GF3EERM084');`,
    },
  ];

  const hemletNoScripts = [
    {
      type: 'text/javascript',
      innerHTML: `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=1369004450132215&ev=PageView&noscript=1"
      />`,
    },
  ];

  return (
    <Helmet
      title={siteTitle}
      titleTemplate={`%s | ${title}`}
      meta={hemletMetaData}
      link={hemletLinks}
      script={hemletScripts}
      noscript={hemletNoScripts}
      htmlAttributes={{ lang: 'pl' }}
    />
  );
};

export default SEOContainer;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

SEOContainer.propTypes = {
  meta: PropTypes.shape({
    description: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
