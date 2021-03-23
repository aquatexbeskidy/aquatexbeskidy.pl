// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import React from 'react';

import { Link } from '~components';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const NomadsCodes = ({ nomadsCodes }) =>
  nomadsCodes.map(({ madeBy, name, url, icon }) => (
    <Wrapper key={name}>
      {madeBy && <P>{madeBy}</P>}

      <Link to={url}>
        <Logo src={require(`../${icon}`)} alt={name} title={name} />
      </Link>
    </Wrapper>
  ));

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const Logo = styled.img`
  width: 20px;

  ${mq.min.tablet_base} {
    width: 25px;
  }
`;

const P = styled.p`
  margin: 0 10px;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

NomadsCodes.displayName = 'NomadsCodes';

export default NomadsCodes;
