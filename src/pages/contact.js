// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import React from 'react';

import { RootContainer } from '~containers';
import { QuickContact } from '~containers/FooterContainer';
import { MapLeaflet, Link } from '~components';
import PinIcon from '../assets/icons/pin.svg';
import PhoneIcon from '../assets/icons/phone.svg';
import MailIcon from '../assets/icons/mail.svg';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const ContactPage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    content: {
      frontmatter: { contact },
    },
  },
}) => (
  <RootContainer meta={meta}>
    <ContactWrapper>
      <ContentWrapper>
        <h2>{contact.title}</h2>
        <p>{contact.subTitle}</p>
        <div>
          {contact.buttons.map(({ text, url, type }, index) => (
            <Link to={url} look={type} key={index}>
              {text}
            </Link>
          ))}
        </div>
      </ContentWrapper>
      {typeof window !== 'undefined' && (
        <MapLeaflet
          title={contact.pinTitle}
          address={contact.pinDesc}
          height="500px"
          width="100%"
        />
      )}
    </ContactWrapper>
  </RootContainer>
);

export default ContactPage;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const commonIconCss = css`
  display: block;
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const ContactWrapper = styled.div`
  margin-bottom: 50px;
  & + ${QuickContact} {
    display: none;
  }
  .leaflet-popup-content {
    p {
      margin: 10px 0 0;
    }
  }
`;

const ContentWrapper = styled.div`
  margin-bottom: 50px;
  h2 {
    margin: 30px 0 50px;
  }
  p {
    width: 100%;
    max-width: 450px;
    line-height: 30px;
  }
  div {
    display: flex;
    flex-direction: column;
    a {
      flex: 1 1 auto;
      max-width: 180px;
      text-align: right;
      position: relative;
      margin-top: 15px;
      font-weight: ${({ theme }) => theme.font.weight.semibold};
      &:first-child {
        color: ${({ theme }) => theme.color.primary};
        max-width: 210px;
        pointer-events: none;
        &::before {
          ${commonIconCss}
          left: -5px;
          width: 35px;
          height: 35px;
          background-image: url(${PinIcon});
        }
      }
      &:nth-child(2) {
        &::before {
          ${commonIconCss}
          left: 25px;
          width: 20px;
          height: 20px;
          background-image: url(${PhoneIcon});
        }
      }
      &:last-child {
        padding-right: 20px;
        padding-left: 35px;
        &::before {
          ${commonIconCss}
          left: 15px;
          width: 20px;
          height: 20px;
          background-image: url(${MailIcon});
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  {
    page: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/contact/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/contact/" } } }
    ) {
      ...CONTACT_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────
