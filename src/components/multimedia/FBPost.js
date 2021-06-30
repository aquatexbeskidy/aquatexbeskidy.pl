// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { mq } from '~theme';
import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const FBPost = ({ postId, postHeight }) => {
  return (
    <FBPostWrapper>
      <IFrameStyled
        src={`https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Faquatexbeskidy%2Fposts%${postId}&show_text=true`}
        scrolling="no"
        frameBorder="0"
        loading="lazy"
        allowFullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        height={postHeight}
      />
    </FBPostWrapper>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const FBPostWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  /* 4:3 Aspect Ratio */
  /* padding-top: 75%; */

  /* 3:2 Aspect Ratio */
  /* padding-top: 66.66%; */

  /* 8:5 Aspect Ratio */
  /* padding-top: 62.5%; */

  /* 1:1 Aspect Ratio */
  /* padding-top: 100%; */

  padding-top: 160%;

  ${mq.min.tablet_base} {
    padding-top: 92%;
  }

  ${mq.min.desktop_small} {
    padding-top: 100%;
  }

  ${mq.min.desktop_base} {
    /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    padding-top: 56.25%;
  }

  ${mq.min.desktop_big} {
    /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    padding-top: 56.25%;
  }
`;

const IFrameStyled = styled.iframe`
  border: none;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

FBPost.propTypes = {
  postId: PropTypes.string.isRequired,
  postHeight: PropTypes.string,
};

FBPost.defaultProps = {
  postId: '',
  postHeight: '',
};

export default FBPost;
