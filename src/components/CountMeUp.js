// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import CountUp from 'react-countup';
import { mq } from '~theme';
import { Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const CountMeUp = ({ homeCountUp }) => {
  const {
    title,
    subTitle,
    count,
    score,
    iconSmile,
    iconStars,
    iconGoogle,
    opinions,
    googleOpinions,
  } = homeCountUp;

  return (
    <Wrapper>
      {title && <Header>{title}</Header>}
      {subTitle && <SubHeader>{subTitle}</SubHeader>}
      {iconSmile && iconSmile.includes('/icons/') && (
        <Inner>
          <Image alt={title} src={require(`../${iconSmile}`)} />
        </Inner>
      )}
      {count > 0 && <CountUp className="countUp" separator="" end={count} start={0} />}
      <ScoreWrapper>
        {score && <Score>{score}</Score>}
        {iconStars && iconStars.includes('/icons/') && (
          <div>
            <img alt={title} src={require(`../${iconStars}`)} />
          </div>
        )}
        {iconGoogle && iconGoogle.includes('/icons/') && (
          <div>
            <img alt={title} src={require(`../${iconGoogle}`)} />
          </div>
        )}
      </ScoreWrapper>
      <OpinionsWrapper>
        {opinions.map(({ user, message }, index) => (
          <Opinion key={index}>
            <p>{user}</p>
            {message && <span>{message}</span>}
          </Opinion>
        ))}
      </OpinionsWrapper>
      <Link to={googleOpinions} look="buttonTertiary" target="_blank">
        Czytaj więcej
      </Link>
    </Wrapper>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Header = styled.h2`
  flex-basis: 100%;
  text-align: center;
  margin-bottom: 15px;
  font-size: ${({ theme }) => theme.font.size.xxxl};

  ${mq.min.desktop_small} {
    margin: 0 0 10px;
  }
`;

const SubHeader = styled.p`
  flex-basis: 100%;
  text-align: center;
  margin: 10px 0 0;
  font-weight: 400;
  line-height: 20px;
  font-size: ${({ theme }) => theme.font.size.xl};

  ${mq.min.desktop_small} {
    margin: 15px 0 20px;
  }
`;

const ScoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;

  div {
    margin-right: 8px;
  }
`;

const Score = styled.div`
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const OpinionsWrapper = styled.div`
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;

  ${mq.min.tablet_big} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 28px;
  }
`;

const Opinion = styled.div`
  padding: 10px 15px;
  border-radius: 4px;
  box-shadow: 0 0px 10px -1px #0000001a, 0 2px 4px -2px #0000001a;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;

  ${mq.min.tablet_big} {
    padding: 15px 25px;
    height: 250px;
  }

  p {
    font-size: ${({ theme }) => theme.font.size.xl};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.color.primary};
    text-align: left;
    width: 100%;
  }

  span {
    line-height: 18px;

    ${mq.min.tablet_base} {
      line-height: 24px;
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 60px auto 80px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  ${mq.min.desktop_base} {
    padding: 0;
  }

  .countUp {
    font-size: ${({ theme }) => theme.font.size.xxxl};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.color.primary};
    margin-bottom: 20px;
  }
`;

const Inner = styled.div`
  margin: 20px 0 10px;
`;

const Image = styled.img`
  height: 50px;
  width: 50px;

  ${mq.min.tablet_base} {
    height: 60px;
    width: 60px;
  }

  ${mq.min.tablet_big} {
    height: 65px;
    width: 65px;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

CountMeUp.displayName = 'CountMeUp';

CountMeUp.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  count: PropTypes.number,
};

CountMeUp.defaultProps = {
  title: '',
  icon: '',
  count: 0,
};

export default CountMeUp;
