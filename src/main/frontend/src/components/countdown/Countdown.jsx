import { useState, useEffect } from "react";

function Countdown(props) {
  const [clock, setClock] = useState([
    { days: 0, hours: 0, minutes: 0, seconds: 0 },
  ]);

  const useMount = (mount) => {
    useEffect(mount, []);
  };

  const getTimeLeft = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      setClock({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      setClock({ days, hours, minutes, seconds });
    }
  };
  useMount(() => {
    getTimeLeft(props.deadline);
    setInterval(() => {
      getTimeLeft(props.deadline);
    }, 1000);
  });
  return (
    <div className="flex flex-row justify-center items-center gap-2 md:gap-10 items-start px-2  pb-12 md:pb-20">
      <div className="text-danse-green-500 h-24 w-1/4 flex flex-col items-center justify-center py-16 bg-danse-baige-100 rounded shadow-xl">
        <span className="text-3xl">{clock.days}</span> Días
      </div>
      <div className="text-danse-green-500 h-24 w-1/4 flex flex-col items-center justify-center py-16 bg-danse-baige-100 rounded shadow-xl">
        <span className="text-3xl">{clock.hours}</span> Horas
      </div>
      <div className="text-danse-green-500 h-24 w-1/4 flex flex-col items-center justify-center py-16 bg-danse-baige-100 rounded shadow-xl">
        <span className="text-3xl">{clock.minutes}</span> Min
      </div>
      <div className="text-danse-green-500 h-24 w-1/4 flex flex-col items-center justify-center py-16 bg-danse-baige-100 rounded shadow-xl">
        <span className="text-3xl">{clock.seconds}</span> Seg
      </div>
    </div>
  );
}

export default Countdown;
