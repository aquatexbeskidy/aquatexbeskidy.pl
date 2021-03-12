// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { SIZE_400_225 } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const [fwidth, fheight] = SIZE_400_225.split('x');

const Video = ({ videoId, videoTitle, width, height }) => {
  const srcDocStyles = css`
    * {
      padding: 0;
      margin: 0;
      overflow: hidden;
    }

    html,
    body {
      height: 100%;
    }

    img,
    span {
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    span {
      height: 1.5em;
      text-align: center;
      font: 48px/1.5 sans-serif;
      color: white;
      text-shadow: 0 0 0.5em black;
    }
  `;

  /*
    -> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#srcdoc
    Inline HTML to embed, overriding the src attribute. If a browser does not
    support the srcdoc attribute, it will fall back to the URL in the src attribute.
  */
  const srcdoc = `
    <style>${srcDocStyles}</style>
    <a href="https://www.youtube.com/embed/${videoId}?autoplay=1">
      <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${videoId}">
      <span>▶</span>
    </a>
  `; // TODO: svg icon instead of <span>▶</span>

  return (
    <div>
      <IFrameStyled
        src={`https://www.youtube.com/embed/${videoId}`}
        srcDoc={srcdoc}
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
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const IFrameStyled = styled.iframe`
  height: ${({ height }) => (height ? height : `${fheight}px`)};
  width: ${({ width }) => (width ? width : `${fwidth}px`)};
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

Video.defaultProps = {
  videoId: '',
  videoTitle: '',
  width: `${fwidth}px`,
  height: `${fheight}px`,
};

export default Video;
