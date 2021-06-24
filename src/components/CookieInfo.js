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
            btnAccText
            btnDecText
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
    cookies: { content, browserName, btnAccText, btnDecText, privacyLink, expiresDays },
  } = query.site.siteMetadata;

  return (
    <CookieConsent
      enableDeclineButton={true}
      buttonText={btnAccText}
      declineButtonText={btnDecText}
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
        lineHeight: '25px',
        margin: '10px 25px 0 0',
      }}
      declineButtonStyle={{
        color: '#176ED3',
        fontWeight: '500',
        borderRadius: '30px',
        border: '1px solid #176ED3',
        background: 'transparent',
        padding: '10px 28px',
        margin: '10px 20px 0 0',
      }}
      buttonStyle={{
        color: '#ffffff',
        fontWeight: '500',
        background: '#176ED3',
        borderRadius: '30px',
        border: '1px solid #176ED3',
        padding: '10px 28px',
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
