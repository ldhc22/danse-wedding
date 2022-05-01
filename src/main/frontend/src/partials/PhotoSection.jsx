import React, { useState } from "react";
import DanseImage from "../images/K & D-136.jpg";

function PhotoSection() {
  return (
    <section className="relative">
      <div className="md:grid md:grid-cols-12 max-w-xl md:max-w-none md:w-full bg-danse-baige-100">
        <div className="flex-col md:col-span-8 md:h-screen md:transform gradient-mask-b-0 md:gradient-mask-r-0 overflow-y-clip">
          <img
            className="relative object-cover h-80 md:h-screen md:transform md:scale-110"
            src={DanseImage}
            alt="DanSe"
          />
        </div>
        <div className="flex-col flex justify-center md:col-span-4 bg-danse-baige-100 md:transform md:-translate-x-12 md:-skew-x-12 h-60 md:h-screen gradient-mask-t-20 md:gradient-mask-l-20">
          <div
            className="w-3/4 md:transform md:skew-x-12 md:translate-x-6 mx-auto "
            data-aos="fade-in"
          >
            <h1 className="text-center text-xl md:text-2xl text-danse-green-500 transition duration-300 ease-in-out">
              No será perfecto. Pero, ¿tiene que serlo?
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhotoSection;
