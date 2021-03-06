// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const Video = ({ videoSrcURL, videoTitle, width, height, ...props }) => (
  <div>
    <IFrameStyled
      src={videoSrcURL}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
      width={width}
      height={height}
    />
  </div>
);
export default Video;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const IFrameStyled = styled.iframe`
  width: ${(props) => (props.width ? props.width : '230px')};
  height: ${(props) => (props.height ? props.height : '170px')};
`;
