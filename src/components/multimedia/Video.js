// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const Video = ({ videoId, videoTitle, width, height }) => (
  <div>
    <IFrameStyled
      src={`https://www.youtube.com/embed/${videoId}`}
      title={videoTitle}
      loading="lazy"
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

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const IFrameStyled = styled.iframe`
  width: ${({ width }) => (width ? width : '230px')};
  height: ${({ height }) => (height ? height : '170px')};
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Video.propTypes = {
  videoId: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Video;
