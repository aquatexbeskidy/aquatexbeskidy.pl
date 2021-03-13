// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import React from 'react';

import { Nav, Link } from '~components';
import ATBLogo from '../assets/icons/atb_logo.svg';
import NCLogo from '../assets/icons/nc_sygnet_mono.svg';
import PhoneIcon from '../assets/icons/phone.svg';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const FooterContainer = () => {
  const { footer } = useStaticQuery(graphql`
    {
      site: site {
        ...SITE_METADATA
      }

      footer: mdx(
        fileAbsolutePath: { regex: "/markdown/navigations/" }
        frontmatter: { title: { eq: "Footer" } }
      ) {
        ...FOOTER_NAV_FRAGMENT
      }
    }
  `);
  return (
    <>
      <QuickContact>
        <div>
          <p>{footer.frontmatter.quickContact.title}</p>
          <p>{footer.frontmatter.quickContact.desc}</p>
        </div>
        <div>
          {footer.frontmatter.quickContact.link.map(({ text, url, type }) => {
            return (
              <Link to={url} look={type} key={text}>
                {text}
              </Link>
            );
          })}
        </div>
      </QuickContact>
      <Footer>
        {footer.frontmatter.links.map(({ title, links, type }) => {
          return (
            <Section key={title}>
              <h3>{title}</h3>
              {type === 'nested' && <Nav links={links} />}
            </Section>
          );
        })}
        <Section>
          <div>
            <img src={ATBLogo} />
            <p>{footer.frontmatter.copyright}</p>
          </div>
          {footer.frontmatter.nomadsCodes.map(({ madeBy, name, url }) => {
            return (
              <div key={name}>
                <p>{madeBy}</p>
                <a href={url} target="_blank">
                  <img src={NCLogo} alt={name} title={name} />
                </a>
              </div>
            );
          })}
        </Section>
      </Footer>
    </>
  );
};

export default FooterContainer;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const QuickContact = styled.section`
  display: flex;
  background: ${({ theme }) => theme.color.primary};
  justify-content: space-between;
  align-items: center;
  div {
    &:first-child {
      color: ${({ theme }) => theme.color.white};
      p {
        &:first-child {
          font-weight: ${({ theme }) => theme.font.weight.semibold};
          font-size: ${({ theme }) => theme.font.size.xl};
          margin-bottom: 0;
        }
        &:last-child {
          margin: 5px 0 20px;
          font-weight: ${({ theme }) => theme.font.weight.normal};
          font-size: ${({ theme }) => theme.font.size.sm};
        }
      }
    }
    &:last-child {
      a {
        padding-left: 50px;
        position: relative;
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        &::before {
          display: block;
          content: '';
          position: absolute;
          top: 50%;
          left: 25px;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          background-image: url(${PhoneIcon});
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
      }
    }
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-wrap: wrap;
`;

export const Section = styled.section`
  background: rgba(0, 0, 0, 0.01);
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: calc(100% / 3);
  display: flex;
  padding: 40px 0;
  &:last-child {
    background: transparent;
    flex-basis: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0;
    div {
      &:first-child {
        p {
          margin-top: 0;
        }
      }
      &:last-child {
        display: flex;
        align-items: center;
        p {
          margin-right: 10px;
        }
        img {
          width: 20px;
          height: auto;
        }
      }
    }
  }

  ul {
    align-items: flex-start;
    flex-direction: column;
    padding: 0;
    li {
      margin-top: 1rem;
      padding: 0;
      a {
        &:hover,
        &:focus,
        &:active,
        &.is-active {
          color: ${({ theme }) => theme.color.black};
          text-decoration: none;
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

FooterContainer.displayName = 'FooterContainer';
