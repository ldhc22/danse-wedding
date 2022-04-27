import Countdown from "../components/countdown/Countdown";
import Date from "../images/calendar-svgrepo-com.svg";

const deadline = "12 Jun 2022 00:30:00 GMT";

function SaveTheDate(props) {
  return (
    <section className="relative" ref={props.dateRef}>
      <div className=" bg-danse-green-125">
        <div className="pt-24 md:pt-28 flex flex-col items-center">
          <div className=" items-center text-center ">
            <h2 className="h2 mb-4 text-danse-green-500">Fecha del evento</h2>
            <p className="text-xl text-danse-green-500 pb-6 px-6">
              "Si pensarnos es bonito, estar juntos debe ser perfecto"
            </p>
          </div>

          <div className="h-16 w-16 flex text-center bg-danse-pink-100 rounded-full shadow flex-shrink-0 ml-3">
            <img className="w-1/2 h-1/2 m-auto" src={Date} alt="Pin" />
          </div>
              
          <div className=" items-center text-center ">
            <p className="text-xl text-danse-green-500 font-bold p-6">
              Sábado 11 de junio de 2022  a las 7:30 pm
            </p>
            <p className="text-xl text-danse-green-500 pb-6">Solo faltan:</p>
            <Countdown deadline={deadline} />
          </div>
        </div>
      </div>
    </section>
  );
}
export default SaveTheDate;
