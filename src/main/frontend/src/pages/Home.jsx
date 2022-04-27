import React, { useRef, useEffect } from "react";

import Header from "../partials/Header";
import HeroHome from "../partials/HeroHome";
import PhotoSection from "../partials/PhotoSection";
import Presents from "../partials/Presents";
import Recepcion from "../partials/Recepcion";
//import MapContainer from "../maps/MapContainer";
import Testimonials from "../partials/Testimonials";
import Newsletter from "../partials/Newsletter";
import Footer from "../partials/Footer";
import SaveTheDate from "../partials/SaveTheDate";
import Rsvp from "../partials/Rsvp";

function Home() {
  const dateRef = useRef(null);
  const topRef = useRef(null);
  const rsvpRef = useRef(null);
  const locationRef = useRef(null);
  const giftRef = useRef(null);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-danse-green-125">
      {/*  Site header */}
      <Header dateRef={dateRef} topRef={topRef} rsvpRef={rsvpRef} locationRef={locationRef} giftRef={giftRef} />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <HeroHome topRef={topRef} />
        <PhotoSection />
        <SaveTheDate dateRef={dateRef} />
        <Recepcion locationRef={locationRef} />
        <Presents giftRef={giftRef} />
        <Rsvp rsvpRef={rsvpRef} />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Home;
