import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/EventCard/EventCard";
import styles from "../styles/styles";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const { allEvents } = useSelector((state) => state.events);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <Header activeHeading={4} />
      {allEvents &&
        allEvents.map((i) => {
          return (
            <div className={`${styles.section} mt-8`}>
              <EventCard active={true} data={i} />
            </div>
          );
        })}

      <Footer />
    </div>
  );
};

export default EventsPage;
