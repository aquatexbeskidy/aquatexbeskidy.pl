// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import PropTypes from 'prop-types';
import React from 'react';
import CookieConsent from 'react-cookie-consent';

import { Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const CookieInfo = ({ content, buttonContent }) => {
  return (
    <CookieConsent
      buttonText="Rozumiem"
      expires={100}
      style={{ background: '#1f262e', padding: '8px 25px', alignItems: 'center' }}
      contentStyle={{}}
      buttonStyle={{
        color: '#ffffff',
        fontWeight: '500',
        background: '#176ED3',
        borderRadius: '30px',
        padding: '8px 18px',
        marginLeft: '25px',
      }}
    >
      Ta strona korzysta z plików cookies, aby świadczyć usługi na najwyższym poziomie. Więcej
      informacji na ten temat znajdziesz w{' '}
      <Link to="/privacy-policy/" look="secondary" style={{ fontWeight: '500' }}>
        Polityce prywatności
      </Link>
      .
    </CookieConsent>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

CookieInfo.displayName = 'CookieInfo';

CookieInfo.propTypes = {
  content: PropTypes.string,
  buttonContent: PropTypes.string,
};

CookieInfo.defaultProps = {
  content: '',
  buttonContent: '',
};

export default CookieInfo;
