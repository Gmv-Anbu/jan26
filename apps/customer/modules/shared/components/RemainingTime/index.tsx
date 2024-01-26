import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimeFlex = styled.div`
  max-width: 70%;
  margin: 0 auto;
  justify-content: space-around;
  display: flex;
  span {
    color: ${({ theme }) => theme.colors.white};
    font-size: 2.5rem;
    font-weight: 600;
  }
  span b {
    font-weight: normal;
    font-size: 1.8rem;
    display: inline-block;
    margin-left: 0.4rem;
  }
`;

const TimerLeft = (props: any) => {
  const { endDate } = props;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const timegetter = setInterval(() => {
      if (timeLeft(endDate)) {
        const { hours, minutes, seconds } = timeLeft(endDate);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, 1000);
    return () => clearInterval(timegetter);
  }, [endDate]);

  function timeLeft(date) {
    if (date) {
      const now = new Date();
      const diff = new Date(date).valueOf() - now.valueOf();
      const hours = Math.floor(diff / 3.6e6);
      const minutes = Math.floor((diff % 3.6e6) / 6e4);
      const seconds = Math.floor((diff % 6e4) / 1000);
      if (hours < 0 || minutes < 0 || seconds < -1) {
        setExpired(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }
      return { hours, minutes, seconds };
    }
    return null;
  }

  return (
    <div>
      {!expired ? (
        <TimeFlex>
          <span>
            {hours < 10 ? `0${hours}` : hours}
            <b>hr</b>
          </span>
          <span>
            {minutes < 10 ? `0${minutes}` : minutes}
            <b>Min</b>
          </span>
          <span>
            {seconds < 10 ? `0${seconds}` : seconds}
            <b>Sec</b>
          </span>
        </TimeFlex>
      ) : (
        'Expired'
      )}
    </div>
  );
};

export default TimerLeft;
