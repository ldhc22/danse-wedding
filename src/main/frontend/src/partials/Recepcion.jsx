import React from "react";
import MapPin from "../images/map-pin.svg";
import Map from "../components/map/Map";

const location = {
  address:
    "Carr Toluca - México km 63.5, Delegación Sta Ana Tlapaltitlán, 50160 Toluca de Lerdo, Méx.",
  lat: 19.28765523148615,
  lng: -99.62699541937965,
};

function Recepcion(props) {
  return (
    <section ref={props.locationRef} className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-danse-green-500 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-24 md:pt-28">
          {/* Section header */}
          <div className="max-w-4xl mx-auto text-center text-danse-green-500">
            <h2 className="h2 mb-4">Lugar del evento</h2>
            <p className="text-xl text-danse-green-500 pb-10">
              "De todos los lugares en los que he estado, mi favorito es a tu
              lado"
            </p>
          </div>
        </div>

        <div>
          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-2 items-start md:max-w-4xl pb-12 md:pb-20">
            {/* 1st item direction */}
            <div className="h-64 md:h-full relative flex flex-col items-center justify-center px-6 py-16 bg-danse-baige-100 rounded shadow-xl">
              <div className="h-16 w-16 flex text-center bg-danse-pink-100 rounded-full shadow flex-shrink-0 ml-3">
                <img className="w-1/2 h-1/2 m-auto" src={MapPin} alt="Pin" />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Radisson del Rey Toluca
              </h4>
              <p className="text-gray-600 text-center">
                Carr Toluca - México km 63.5, Delegación Sta Ana Tlapaltitlán,
                50160 Toluca de Lerdo, Méx.
              </p>
            </div>

            {/* 2nd item map */}
            <div className="h-64 md:h-full relative flex flex-col items-center bg-danse-baige-100 rounded shadow-xl ">
              <Map location={location} zoomLevel={15} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Recepcion;
