import styled from "styled-components";

interface Iprops {
  time: any;
  children?: any;
}

const TimeContainer = styled.div`
  min-height: 4rem;
  display: flex;
  width: 100%;
  min-width: 11.5rem;
  max-width: 12.5rem;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.fontprimary};
  border-radius: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: normal;
  gap:1rem;
  @media (max-width: 1024px) {
    min-width: unset !important;
    max-width: unset !important;
  }
`;

const Time = styled.span`
    margin: 0;
    font-size: 1.4rem;
    font-family: ${({ theme }) => theme.fontsFamily.secondary};
    // @media (min-width: 1101px) and (max-width: 1500px)
    // {
    // font-size: 0.9rem;
    // }
    // @media (max-width: 575px) {
    //   font-size: 1.1rem;
    // }

`;

const TimeLeftSmall = (props: Iprops) => {
  const { time } = props;
  // const [daysLeft, hoursLeft, minutesLeft, secondsLeft, timeUp] =
  //   useTimeLeftHook(props.time);
  return (
    <TimeContainer className="small-time">
      <Time>{time?.daysLeft}d</Time>
      <Time>{time?.hoursLeft}h</Time>
      <Time>{time?.minutesLeft}m</Time>
      <Time>{time?.secondsLeft}s</Time>
    </TimeContainer>
  );
};

export default TimeLeftSmall;
