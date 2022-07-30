// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import React from 'react';

import { Video } from '~components';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const Spot = ({ spot }) => {
  const { videoId, videoTitle } = spot;

  return (
    <Wrapper>
      <Video videoId={videoId} srcDocCss={false} videoTitle={videoTitle} />
    </Wrapper>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 80px auto;
  padding: 0;
  position: relative;
  ${mq.min.tablet_base} {
    flex-direction: row;
  }
  ${mq.min.tablet_big} {
    padding-bottom: 20px;
  }

  div {
    max-width: 100%;
    height: 300px;
    ${mq.min.mobile_big} {
      height: 400px;
    }
    ${mq.min.tablet_base} {
      height: 500px;
    }
    ${mq.min.tablet_big} {
      height: 650px;
    }
    ${mq.min.desktop_small} {
      height: 800px;
    }
  }
`;

export default Spot;
