// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import PropTypes from 'prop-types';
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
        frameborder="0"
        loading="lazy"
        allowfullscreen="true"
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
  margin-top: 20px;
`;

const IFrameStyled = styled.iframe`
  border: none;
  overflow: hidden;
  width: 600px;
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
