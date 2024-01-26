import React from "react";
import styled from "styled-components";
import EventCard from "./Ecard";

 const EventContainer =styled.div`
 display: flex;
 width:100%;
 gap:4rem;
}
 `


const events = [
  {
    id:0,
    imgSrc: '/images/customer/Events/Rectangle 2750.png',
    date: "14d : 23h : 05m : 14s",
    location: "Singapore",
    title:
      "Futuregrail CEO Ali Nael to hold Singapore town hall with employees on Monday",
    description:
      "How you approach data will define what’s possible for your organization. Data engineers, data scientists, application developers, and a host of other data professionals who depend on the Snowflake Data Cloud continue to thrive thanks to a decade of technology breakthroughs. But that journey is only the beginning."
  },
  {
    imgSrc: '/images/customer/Events/Rectangle 2751.png',
    date: "22d : 03h : 18m : 09s",
    location: "San Francisco, USA",
    title: "Tech Summit 2022: The Future of Technology",
    description:
      "Join us for a day of insightful talks and networking with industry leaders and experts. Learn about the latest trends and innovations in technology and how they will shape our future."
  },
  {
    imgSrc: '/images/customer/Events/Rectangle 2752.png',
    date: "22d : 03h : 18m : 09s",
    location: "San Francisco, USA",
    title: "Tech Summit 2022: The Future of Technology",
    description:
      "Join us for a day of insightful talks and networking with industry leaders and experts. Learn about the latest trends and innovations in technology and how they will shape our future."
  }
];

const EventsPage = () => {
  return (
    <EventContainer>
      {events.map((event) => (
        <EventCard
          key={event.id}
          imgSrc={event.imgSrc}
          date={event.date}
          location={event.location}
          title={event.title}
          description={event.description}
        />
      ))}
    </EventContainer>
  );
};

export default EventsPage;
