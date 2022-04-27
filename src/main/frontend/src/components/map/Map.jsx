import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";

function Map(props) {
  return (
    <div className="w-full h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCFfjXl47ZltGKZIOGMTQj25sUrEty4FUc" }}
        defaultCenter={props.location}
        defaultZoom={props.zoomLevel}
      >
        <LocationPin
          lat={props.location.lat}
          lng={props.location.lng}
          text={props.location.address}
        />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
