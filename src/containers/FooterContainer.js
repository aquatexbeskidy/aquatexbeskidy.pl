// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import React from 'react';

import { Nav, Link } from '~components';
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
  return (
    <>
      <QuickContact>
        <Wrapper>
          <Content>
            <Text>{footer.frontmatter.quickContact.title}</Text>
            <Text>{footer.frontmatter.quickContact.desc}</Text>
          </Content>
          <LinkWrapper>
            {footer.frontmatter.quickContact.link.map(({ text, url, type, icon }) => {
              return (
                <Link to={url} look={type} key={text}>
                  <PhoneIcon src={require(`../${icon}`)} />
                  {text}
                </Link>
              );
            })}
          </LinkWrapper>
        </Wrapper>
      </QuickContact>
      <Footer>
        <Wrapper>
          {footer.frontmatter.links.map(({ title, links, type }) => {
            return (
              <Section key={title}>
                <NavHeading>{title}</NavHeading>
                {type === 'nested' && <Nav links={links} />}
              </Section>
            );
          })}
        </Wrapper>
        <Section>
          <CopyrightWrapper>
            <ATBLogo
              src={require(`../${footer.frontmatter.atbLogo}`)}
              alt={site.siteMetadata.siteTitle}
              title={site.siteMetadata.siteTitle}
            />
            <Copyright>{footer.frontmatter.copyright}</Copyright>
          </CopyrightWrapper>
          {footer.frontmatter.nomadsCodes.map(({ madeBy, name, url, icon }) => {
            return (
              <NCWrapper key={name}>
                <NCAbout>{madeBy}</NCAbout>
                <NCLink href={url} target="_blank">
                  <NCLogo src={require(`../${icon}`)} alt={name} title={name} />
                </NCLink>
              </NCWrapper>
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

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Text = styled.p``;

const LinkWrapper = styled.div``;

const Content = styled.div``;

const NCLink = styled.a``;

export const QuickContact = styled.section`
  background: ${({ theme }) => theme.color.primary};
  ${Wrapper} {
    padding: 20px;
    ${mq.min.tablet_base} {
      padding: 0 20px;
    }
    &:first-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      ${mq.min.tablet_base} {
        flex-direction: row;
        justify-content: space-between;
      }
      color: ${({ theme }) => theme.color.white};
      ${Text} {
        &:first-child {
          font-weight: ${({ theme }) => theme.font.weight.semibold};
          font-size: ${({ theme }) => theme.font.size.xl};
          margin-top: 0;
          text-align: center;
          ${mq.min.tablet_base} {
            text-align: left;
            margin-bottom: 0;
            margin-top: 16px;
          }
        }
        &:last-child {
          margin: 5px 0 20px;
          line-height: 20px;
          text-align: center;
          font-weight: ${({ theme }) => theme.font.weight.normal};
          font-size: ${({ theme }) => theme.font.size.base};
          ${mq.min.tablet_base} {
            text-align: left;
            line-height: 18px;
          }
        }
      }
    }
    &:last-child {
      a {
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        display: flex;
        align-items: center;
        padding: 10px 25px;
        ${mq.min.tablet_base} {
          padding: 12px 30px;
        }
      }
    }
  }
`;

const PhoneIcon = styled.img`
  display: inline-block;
  max-height: 15px;
  width: 15px;
  margin-right: 8px;
  ${mq.min.tablet_base} {
    max-height: 20px;
    width: 20px;
  }
`;

const CopyrightWrapper = styled.div``;

const ATBLogo = styled.img`
  max-width: 100%;
  height: auto;
`;

const Copyright = styled.p`
  margin-top: 10px;
  ${mq.min.mobile_big} {
    margin-top: 0;
  }
`;

const NCWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NCAbout = styled.p`
  margin-right: 10px;
`;

const NCLogo = styled.img`
  width: 20px;
`;

export const Section = styled.section`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  display: flex;
  padding: 40px 0;
  ul {
    align-items: flex-start;
    flex-direction: column;
    padding: 0;
    li {
      margin-top: 1rem;
      padding: 0;
      a {
        font-size: ${({ theme }) => theme.font.size.sm};
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

const NavHeading = styled.h3``;

const Footer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  background: rgba(0, 0, 0, 0.01);
  width: 100%;
  ${Wrapper} {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 20px;
    & + ${Section} {
      padding: 0 20px 10px;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      font-size: ${({ theme }) => theme.font.size.sm};
      ${mq.min.mobile_big} {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

FooterContainer.displayName = 'FooterContainer';
