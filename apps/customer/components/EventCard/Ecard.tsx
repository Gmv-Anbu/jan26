import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 30%;
    flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const EventDate = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ButtonPrimary = styled.button`
  background-color: #0070f3;
  color: #fff;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #0060df;
  }
`;

const EventCard = ({ imgSrc, date, location, title, description }) => {
  return (
    <CardContainer>
      <div>
        <Image src={imgSrc} height={246} width={452} alt="event" />
        <EventDate>EVENTS start's in: {date}</EventDate>
      </div>
      <div>
        <p>{location}</p>
        <Title>{title}</Title>
        <Description>{description}</Description>
    
      </div>
    </CardContainer>
  );
};

export default EventCard;
