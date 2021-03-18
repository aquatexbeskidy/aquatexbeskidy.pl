// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { useEventListener, useScrollLock } from '~hooks';
import { lightBoxAcceptableKeys } from '~utils';
import { animationKeyframes, mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = animationKeyframes({
  from: {
    opacity: 0,
    transform: 'translateY(1vh)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  properties: '500ms',
});

const isElementOutViewport = (node) => {
  var rect = node.getBoundingClientRect();
  return (
    rect.bottom < 0 ||
    rect.right < 0 ||
    rect.left > window.innerWidth - 100 ||
    rect.top > window.innerHeight - 100
  );
};

const Lightbox = ({ thumbnails, images, currentImageId, isPreviewsDefault, isOpen, onClose }) => {
  const { enableScrollLock, disableScrollLock } = useScrollLock();
  const [currentIdx, setCurrentIdx] = useState(currentImageId);
  const [isPreviews, setIsPreviews] = useState(isPreviewsDefault);
  const thumbnailsWrapperRef = useRef();
  const closeButtonRef = useRef();

  const gatsbyImageWrapper = '.gatsby-image-wrapper';
  const isActive = 'is-active';

  if (thumbnails.length !== images.length) return null;

  const imagesLength = images.length;
  const counterValue = `${currentIdx + 1} / ${imagesLength}`;

  const handleCurrentThumnail = (index) => {
    if (!thumbnailsWrapperRef.current) {
      return;
    }

    if (isPreviews && thumbnails) {
      const buttons = [...thumbnailsWrapperRef.current.querySelectorAll('button')];

      if (buttons) {
        buttons.forEach((button, i) => {
          button.querySelector(gatsbyImageWrapper).classList.remove(isActive);
        });

        const thumbnail = buttons[index].querySelector(gatsbyImageWrapper);

        if (thumbnail && isElementOutViewport(thumbnail)) {
          thumbnail.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
          thumbnail.classList.add(isActive);
        }
      }
    }
  };

  const handlePrevious = () => {
    handleCurrentThumnail(currentIdx);
    setCurrentIdx((index) => {
      const current = (index + imagesLength - 1) % imagesLength;
      handleCurrentThumnail(current);
      return current;
    });
  };

  const handleNext = () => {
    setCurrentIdx((index) => {
      const current = (index + 1) % imagesLength;
      handleCurrentThumnail(current);
      return current;
    });
  };

  useEventListener('keydown', (event) => {
    const [left, right, escape] = lightBoxAcceptableKeys;
    const { key } = event;

    if (lightBoxAcceptableKeys.includes(key)) {
      event.preventDefault();
      key === left && handlePrevious();
      key === right && handleNext();
      key === escape && onClose();
    }
  });

  useEffect(() => {
    isOpen &&
      setCurrentIdx(() => {
        handleCurrentThumnail(currentImageId);
        return currentImageId;
      });
  }, [currentImageId]);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current.focus();
      enableScrollLock();
      return undefined;
    }
    disableScrollLock();
    return undefined;
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <FocusLock>
      <Wrapper>
        <Header>
          <Counter children={counterValue} />

          <Navigation>
            {thumbnails && (
              <Button onClick={() => setIsPreviews((prev) => !prev)}>
                <Icon>
                  {isPreviews ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      height="24"
                      width="24"
                    >
                      <path d="M6 18h12c3.311 0 6-2.689 6-6s-2.689-6-6-6h-12.039c-3.293.021-5.961 2.701-5.961 6 0 3.311 2.688 6 6 6zm12-10c-2.208 0-4 1.792-4 4s1.792 4 4 4 4-1.792 4-4-1.792-4-4-4z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      height="24"
                      width="24"
                    >
                      <path d="M18 18h-12c-3.311 0-6-2.689-6-6s2.689-6 6-6h12.039c3.293.021 5.961 2.701 5.961 6 0 3.311-2.688 6-6 6zm0-10h-12c-2.208 0-4 1.792-4 4s1.792 4 4 4h12c2.208 0 4-1.792 4-4 0-2.199-1.778-3.986-3.974-4h-.026zm-12 1c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z" />
                    </svg>
                  )}
                </Icon>
              </Button>
            )}
            <Button ref={closeButtonRef} onClick={onClose}>
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
                </svg>
              </Icon>
            </Button>
          </Navigation>
        </Header>

        <Body>
          <GatsbyImage
            image={getImage(images[currentIdx].childrenImageSharp[0])}
            title={images[currentIdx].name}
            alt={images[currentIdx].name}
          />

          <Navigation>
            <Button onClick={handlePrevious}>
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                </svg>
              </Icon>
            </Button>
            <Button onClick={handleNext}>
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
                </svg>
              </Icon>
            </Button>
          </Navigation>
        </Body>

        {isPreviews && thumbnails && (
          <Footer>
            <FooterInner ref={thumbnailsWrapperRef} style={{ width: `${100 * imagesLength}%` }}>
              {thumbnails.map(({ id, childrenImageSharp }, index) => (
                <Button
                  key={id}
                  onClick={() =>
                    setCurrentIdx(() => {
                      handleCurrentThumnail(index);
                      return index;
                    })
                  }
                >
                  <GatsbyImage image={getImage(childrenImageSharp[0])} title="" alt="" />
                </Button>
              ))}
            </FooterInner>
          </Footer>
        )}
      </Wrapper>
    </FocusLock>,
    document.querySelector('#___gatsby'),
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const padding = css`
  padding: 12px;

  ${mq.min.tablet_big} {
    padding: 12px 2vw;
  }
`;

const Wrapper = styled.div`
  background: rgb(255 255 255 / 98%);
  min-height: 100vh;
  min-width: 100vw;

  position: fixed;
  z-index: 900;
  left: 0;
  top: 0;
`;

const Counter = styled.p`
  align-self: center;
`;

const Navigation = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const Button = styled.button`
  background-color: transparent;
  -webkit-appearance: none;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 2px rgba(0 0 0 0 / 90%);
  }

  cursor: pointer;
`;

const Body = styled.div`
  ${padding}

  min-height: 100vh;
  max-height: 100%;

  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mq.min.desktop_base} {
    max-width: 80vw;
  }

  .gatsby-image-wrapper {
    background-color: #fafafa;
    animation: ${fadeUp};
    width: 100%;

    ${mq.min.desktop_base} {
      max-width: 1024px;
    }
  }

  ${Navigation} {
    justify-content: space-between;
    align-items: center;
    display: flex;

    position: fixed;
    padding: 0 2vw;
    z-index: 899;
    width: 100%;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }
`;

const Header = styled.header`
  background-color: rgba(0, 0, 0, 0.04);
  justify-content: space-between;
  display: flex;
  ${padding}

  position: fixed;
  z-index: 999;
  width: 100%;
  left: 0;
  top: 0;
`;

const FooterInner = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }

  white-space: nowrap;
  overflow-x: scroll;

  .gatsby-image-wrapper {
    border: 2px solid transparent;
    &.is-active {
      border: 2px solid ${({ theme }) => theme.color.primary};
    }
  }
`;

const Footer = styled.footer`
  background-color: rgba(0, 0, 0, 0.04);

  display: flex;
  ${padding}

  position: fixed;
  z-index: 999;
  width: 100%;
  bottom: 0;
  left: 0;

  ${Button} {
    display: inline-block;
    position: relative;

    ${mq.max.desktop_small} {
      &:not(:first-child) {
        margin-left: 6px;
      }
    }

    ${mq.min.desktop_small} {
      margin: 4px 6px;
    }
  }
`;

const Icon = styled.div`
  margin: 0 6px;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Lightbox.propTypes = {
  thumbnails: PropTypes.arrayOf(PropTypes.object).isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentImageId: PropTypes.number.isRequired,
  isPreviewsDefault: PropTypes.bool,
  isOpen: PropTypes.bool,
};

Lightbox.defaultProps = {
  isPreviewsDefault: true,
  currentImageId: 0,
  isOpen: false,
};

export default Lightbox;
