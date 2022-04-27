import pin from "../../images/map-pin.svg";

function LocationPin(props) {
  return (
    <div className=" w-8 h-8 transform -translate-x-1/2 -translate-y-1/2">
      <img src={pin} alt="Pin" />
    </div>
  );
}

export default LocationPin;
