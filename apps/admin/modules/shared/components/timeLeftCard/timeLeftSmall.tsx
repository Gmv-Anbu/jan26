import styled from "styled-components";
import useTimeLeftHook from "../../../../hooks/useTimeLeftHook";

interface Iprops {
  time: number;
  children?: any;
}

const TimeContainer = styled.div`
  min-height: 4rem;
  display: flex;
  width: 100%;
  min-width: 11.5rem;
  max-width: 12.5rem;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.fontprimary};
  padding: 0.9rem;
  background-color: ${({theme}) => theme.colors.secondaryButton};
  border-radius: 1rem;
  // font-family: Roobert;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: normal;
`;

const Time = styled.span`
    margin: 0;
`;

const TimeLeftSmall = (props: Iprops) => {
  const [daysLeft, hoursLeft, minutesLeft, secondsLeft, timeUp] =
    useTimeLeftHook(props.time);
  return (
    <TimeContainer>
      <Time>{hoursLeft}h</Time>
      <Time>{minutesLeft}m</Time>
      <Time>{secondsLeft}s</Time>
    </TimeContainer>
  );
};

export default TimeLeftSmall;
