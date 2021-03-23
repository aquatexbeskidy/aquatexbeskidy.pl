// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import React from 'react';

import { ReactComponent as BrandLogo } from '../assets/icons/atb_logo.svg';
import { Nav, Link, NomadsCodes } from '~components';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const FooterContainer = () => {
  const { footer, site } = useStaticQuery(graphql`
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

  const { nomadsCodes, quickContact, links, copyright } = footer.frontmatter;
  const {
    siteMetadata: { siteTitle },
  } = site;

  return (
    <>
      <QuickContact>
        <Wrapper>
          <div>
            <Text>{quickContact.title}</Text>
            <Text>{quickContact.desc}</Text>
          </div>
          <div>
            {quickContact.link.map(({ text, url, type, icon }) => {
              return (
                <Link to={url} look={type} key={text}>
                  <PhoneIcon alt={text} src={require(`../${icon}`)} />
                  {text}
                </Link>
              );
            })}
          </div>
        </Wrapper>
      </QuickContact>

      <Footer>
        <Wrapper>
          {links.map(({ title, links, type }) => {
            return (
              <Section key={title}>
                <h3>{title}</h3>
                {type === 'nested' && <Nav links={links} />}
              </Section>
            );
          })}
        </Wrapper>

        <Section>
          <div>
            <BrandLogo title={siteTitle} alt={siteTitle} />
            <Copyright>{copyright}</Copyright>
          </div>

          <NomadsCodes nomadsCodes={nomadsCodes} />
        </Section>
      </Footer>
    </>
  );
};

export default FooterContainer;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Text = styled.p`
  &:first-child {
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    font-size: ${({ theme }) => theme.font.size.xl};
    text-align: center;
    margin-top: 0;

    ${mq.min.tablet_base} {
      text-align: left;
      margin-bottom: 0;
      margin-top: 16px;
    }
  }

  &:last-child {
    font-weight: ${({ theme }) => theme.font.weight.normal};
    font-size: ${({ theme }) => theme.font.size.base};
    margin: 5px 0 20px;
    text-align: center;
    line-height: 20px;
    max-width: 270px;
    width: 100%;

    ${mq.min.tablet_base} {
      line-height: 18px;
      text-align: left;
      margin-top: 10px;
      max-width: 100%;
    }
  }
`;

export const QuickContact = styled.section`
  background: ${({ theme }) => theme.color.primary};

  ${Wrapper} {
    padding: 20px;

    ${mq.min.tablet_base} {
      padding: 10px 20px;
    }

    &:first-child {
      color: ${({ theme }) => theme.color.white};

      justify-content: center;
      flex-direction: column;
      align-items: center;
      display: flex;

      ${mq.min.tablet_base} {
        justify-content: space-between;
        flex-direction: row;
      }
    }
    &:last-child {
      a {
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        padding: 10px 25px;

        align-items: center;
        display: flex;

        ${mq.min.tablet_base} {
          padding: 12px 30px;
        }
      }
    }
  }
`;

const PhoneIcon = styled.img`
  display: inline-block;
  margin-right: 8px;
  max-height: 15px;
  width: 15px;

  ${mq.min.tablet_base} {
    max-height: 20px;
    width: 20px;
  }
`;

const Copyright = styled.p`
  margin: 15px 0 25px;

  ${mq.min.tablet_base} {
    margin-bottom: 0;
  }
`;

export const Section = styled.section`
  padding: 40px 0;

  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  display: flex;

  ul {
    align-items: flex-start;
    flex-direction: column;
    padding: 0;

    li {
      margin-top: 1rem;
      padding: 0;

      a {
        font-size: ${({ theme }) => theme.font.size.base};

        ${mq.min.tablet_base} {
          font-size: ${({ theme }) => theme.font.size.sm};
        }

        &:focus,
        &:active,
        &.is-active {
          color: ${({ theme }) => theme.color.black};
        }

        &:hover {
          color: ${({ theme }) => theme.color.black};
          text-decoration: underline;
        }
      }
    }
  }
`;

const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.01);
  width: 100%;

  flex-wrap: wrap;
  display: flex;

  ${Wrapper} {
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: column;

    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
    width: 100%;

    ${mq.min.tablet_base} {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }

    ul {
      align-items: center;
      ${mq.min.tablet_base} {
        align-items: flex-start;
      }
      li {
        padding: 0;

        &:not(:last-child) {
          padding-bottom: 5px;

          ${mq.min.tablet_base} {
            padding-bottom: 0;
          }
        }
      }
    }

    ${Section} {
      align-items: center;
      padding: 15px 0;

      &:first-child {
        padding-top: 35px;

        ${mq.min.tablet_base} {
          padding-top: 40px;
        }
      }

      &:last-child {
        padding-bottom: 35px;

        ${mq.min.tablet_base} {
          padding-bottom: 40px;
        }
      }

      ${mq.min.tablet_base} {
        align-items: flex-start;
        padding: 40px 0;
      }
    }

    & + ${Section} {
      font-size: ${({ theme }) => theme.font.size.sm};
      padding: 0 20px 15px;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;

      div {
        &:first-child {
          text-align: center;

          ${mq.min.tablet_base} {
            text-align: left;
          }
        }
      }

      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      display: flex;

      ${mq.min.tablet_base} {
        justify-content: space-between;
        align-items: flex-end;
        flex-direction: row;
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

FooterContainer.displayName = 'FooterContainer';
