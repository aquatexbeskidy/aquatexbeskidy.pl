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
    { name: 'description', content: description },

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

  return (
    <Helmet
      title={siteTitle}
      titleTemplate={`%s | ${title}`}
      meta={hemletMetaData}
      link={hemletLinks}
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
