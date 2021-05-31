// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import CookieConsent from 'react-cookie-consent';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import { Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const CookieInfo = ({}) => {
  const query = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          fbPixelId
          googleId
          cookies {
            content
            browserName
            btnText
            privacyLink
            expiresDays
          }
        }
      }
    }
  `);

  const {
    fbPixelId,
    googleId,
    cookies: { content, browserName, btnText, privacyLink, expiresDays },
  } = query.site.siteMetadata;

  return (
    <CookieConsent
      buttonText={btnText}
      cookieName={browserName}
      expires={expiresDays}
      style={{
        background: '#ffffff',
        color: '#1f262e',
        padding: '10px 35px 20px',
        alignItems: 'center',
        boxShadow: 'rgb(0 0 0 / 14%) 0px 0px 9px 0px',
      }}
      contentStyle={{
        flex: '1 0 230px',
        lineHeight: '20px',
        margin: '10px 20px 0 0',
      }}
      buttonStyle={{
        color: '#ffffff',
        fontWeight: '500',
        background: '#176ED3',
        borderRadius: '30px',
        padding: '12px 30px',
        margin: '10px 0 0',
      }}
      onAccept={() => {
        if (window.fbq) {
          fbq('init', `${fbPixelId}`);
          fbq('track', 'PageView');
        }
        if (window.gtag) {
          gtag('js', new Date());
          gtag('config', `${googleId}`);
        }
      }}
    >
      {content}
      <Link to="/privacy-policy/" look="secondary" style={{ fontWeight: '500', marginLeft: '5px' }}>
        {privacyLink}
      </Link>
      .
    </CookieConsent>
  );
};

export default CookieInfo;
