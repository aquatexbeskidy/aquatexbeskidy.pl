// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { getSrcSet } from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled, { css, createGlobalStyle } from 'styled-components';

import { Link } from '~components';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const CustomModal = ({ homeInfoModal }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const afterOpenModal = () => sessionStorage.setItem('alreadyShow', 'already shown');

  const {
    title,
    mainText,
    subText,
    summaryText,
    warning,
    success,
    info,
    infoContent,
    image,
    buttons,
  } = homeInfoModal;
  const { childImageSharp } = image;

  const background = getSrcSet(childImageSharp).split(',')[2].split(' ')[0];

  useEffect(() => {
    let modalVisibleStatus = sessionStorage.getItem('alreadyShow');
    setTimeout(() => {
      if (modalVisibleStatus != 'already shown') {
        handleModalOpen();
      }
    }, 500);
  });

  return (
    <>
      <ModalGlobalCSS />
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={handleModalClose}
        className="SGModal"
        ariaHideApp={false}
        overlayClassName="SGModalOverlay"
      >
        <div>
          <Heading>{title}</Heading>
          <ContentWrapper>
            {mainText}
            <StrongWarning>{warning}</StrongWarning>
            {subText}
            <StrongSuccess>{success}</StrongSuccess>
            {summaryText}
            <Info>
              <StrongInfo>{info}</StrongInfo>
              <StrongInfoContent>{infoContent}</StrongInfoContent>
            </Info>
          </ContentWrapper>
          <BannerWrapper style={{ backgroundImage: `url(${background})` }} />
          <ActionsWrapper>
            {buttons &&
              buttons.map(({ title, link, type }, index) => (
                <Link to={link} look={type} key={index}>
                  {title}
                </Link>
              ))}
          </ActionsWrapper>
          <CloseButton aria-label="close-button" onClick={handleModalClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
            </svg>
          </CloseButton>
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const ModalGlobalCSS = createGlobalStyle`
  .SGModalOverlay {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffffd9;
  }
  .SGModal {
    position: absolute;
    top: 10%;
    left: 0;
    outline: none;
    background: #fff;
    padding: 30px 20px 40px;
    margin: 0 20px;
    line-height: 25px;
    border-radius: 4px;
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);

    ${mq.min.desktop_small} {
      top: 50%;
      transform: translateY(-50%);
      padding-right: 30px;
      padding-left: 30px;
      line-height: 28px;
      margin: 0 20%;
    }
  }
`;

const Heading = styled.h3`
  margin-top: 10px;
  text-align: center;
  font-size: 1.3rem;
`;

const ActionsWrapper = styled.div`
  margin-top: 35px;
  a {
    &:first-child {
      margin-right: 10px;
    }
    &:last-child {
      color: ${({ theme }) => theme.color.black};
      background: ${({ theme }) => theme.color.whiteDark};
      border-color: ${({ theme }) => theme.color.whiteDark};
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 5px;
  background-color: transparent;
  cursor: pointer;
  border: 0;

  ${mq.min.desktop_small} {
    top: 20px;
    right: 22px;
  }
`;

const ContentWrapper = styled.div`
  margin: 20px 0 10px;
  text-align: justify;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const BannerWrapper = styled.div`
  background-repeat: no-repeat;
  background-position: left;
  background-size: cover;

  justify-content: flex-start;
  align-items: flex-start;
  display: none;

  width: 100%;
  margin: 20px 0 40px;
  min-height: 280px;

  ${mq.min.tablet_base} {
    display: flex;
  }

  ${mq.min.desktop_small} {
    min-height: 350px;
  }
`;

const StrongWarning = styled.strong`
  margin: 0 7px;
  color: ${({ theme }) => theme.color.danger};
`;

const StrongSuccess = styled.strong`
  margin: 0 7px;
  color: ${({ theme }) => theme.color.primary};
`;

const Info = styled.div`
  margin: 20px 0 0;
`;

const StrongInfo = styled.strong`
  margin-right: 5px;
`;

const StrongInfoContent = styled.strong`
  color: ${({ theme }) => theme.color.primary};
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────
