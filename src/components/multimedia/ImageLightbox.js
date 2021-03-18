// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { ReactComponent as ToggleActive } from '../../assets/icons/lightbox/toggle_active.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/lightbox/arrow_right.svg';
import { ReactComponent as ArrowLeft } from '../../assets/icons/lightbox/arrow_left.svg';
import { ReactComponent as Toggle } from '../../assets/icons/lightbox/toggle.svg';
import { ReactComponent as Close } from '../../assets/icons/lightbox/close.svg';

import { lightBoxAcceptableKeys, isElementOutViewport } from '~utils';
import { useEventListener, useScrollLock } from '~hooks';
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

const Lightbox = ({ thumbnails, images, currentImageId, isPreviewsDefault, isOpen, onClose }) => {
  const { enableScrollLock, disableScrollLock } = useScrollLock();
  const [isPreviews, setIsPreviews] = useState(isPreviewsDefault);
  const [currentIdx, setCurrentIdx] = useState(0);
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
        const options = {
          behavior: 'smooth',
          inline: 'center',
          block: 'end',
        };

        if (thumbnail) {
          isElementOutViewport(thumbnail) && thumbnail.scrollIntoView(options);
          thumbnail.classList.add(isActive);
        }
      }
    }
  };

  const handlePrevious = () =>
    setCurrentIdx((index) => {
      const current = (index + imagesLength - 1) % imagesLength;
      handleCurrentThumnail(current);
      return current;
    });

  const handleNext = () =>
    setCurrentIdx((index) => {
      const current = (index + 1) % imagesLength;
      handleCurrentThumnail(current);
      return current;
    });

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
    isOpen && setCurrentIdx(currentImageId);
  }, [currentImageId]);

  useEffect(() => {
    if (isPreviews || currentIdx) {
      handleCurrentThumnail(currentIdx);
    }
  }, [isPreviews, currentIdx]);

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
          <Counter>{counterValue}</Counter>

          <Navigation>
            {thumbnails && (
              <Button onClick={() => setIsPreviews((prev) => !prev)}>
                {isPreviews ? <ToggleActive /> : <Toggle />}
              </Button>
            )}
            <Button ref={closeButtonRef} onClick={onClose}>
              <Close />
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
              <ArrowLeft />
            </Button>
            <Button onClick={handleNext}>
              <ArrowRight />
            </Button>
          </Navigation>
        </Body>

        {isPreviews && thumbnails && (
          <Footer>
            <FooterInner ref={thumbnailsWrapperRef} style={{ width: `${100 * imagesLength}%` }}>
              {thumbnails.map(({ id, childrenImageSharp }, index) => (
                <Button
                  key={id}
                  onClick={() => {
                    setCurrentIdx(() => {
                      handleCurrentThumnail(index);
                      return index;
                    });
                  }}
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

  ${mq.max.tablet_big} {
    font-size: ${({ theme }) => theme.font.size.xxl};
  }
`;

const Button = styled.button`
  background-color: transparent;
  -webkit-appearance: none;
  outline: none;
  border: none;
  padding: 0;

  cursor: pointer;
`;

const Navigation = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;

  ${Button} {
    margin: 0 20px;
  }
`;

const Body = styled.div`
  min-height: 100vh;
  max-height: 100%;

  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mq.min.desktop_base} {
    max-width: 80vw;
    ${padding}
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
    position: fixed;
    padding: 0 2vw;
    z-index: 899;
    width: 100%;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;

    ${Button} {
      align-items: center;
      display: flex;

      height: 100vh;
      width: 50vw;

      box-shadow: none;
      outline: none;

      &:nth-child(1) {
        justify-content: flex-start;
      }
      &:nth-child(2) {
        justify-content: flex-end;
      }
    }
  }
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.color.white};
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
    position: relative;
    opacity: 0.5;

    &:hover,
    &.is-active {
      border: 2px solid ${({ theme }) => theme.color.primary};
      opacity: 1;
    }
  }
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.color.white};

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
      margin: 0 2px;
    }
  }
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
