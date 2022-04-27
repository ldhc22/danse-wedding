import React, { useState } from "react";
import Modal from "../utils/Modal";

import HeroImage from "../images/hero-image.png";

function HeroHome(props) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  return (
    <section className="relative" ref={props.topRef}>
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#cd90a8" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#ffdae9" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 ">
        {/* Hero content */}
        <div className="pt-28 pb-14 md:pt-24 md:pb-10  h-screen ">
          {/* Section header */}
          <div className="bg-slate-200 rounded-lg h-full ">
            <div className="flex flex-col text-center py-10 md:py-14 px-2 md:px-4 bg-ring-two-background md:bg-hex-background bg-full bg-no-repeat h-full w-full">
            <div className="flex flex-col justify-center basis-1/4"></div>
            <div className="flex flex-col justify-center max-w-md basis-1/4 pt-10 md:pt-0 mx-auto">
                <p
                  className="text-md md:text-lg text-danse-green-500"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  Deseando compartir <br />
                  la alegría de nuestra unión
                </p>
              </div>
              <div className="flex flex-col justify-center basis-1/4">
                <h1
                 className="text-5xl md:text-4xl font-extrabold leading-tighter tracking-tighter font-astral"
                  data-aos="zoom-y-out"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-danse-pink-100 to-danse-pink-500">
                    Monse & Dany
                  </span>
                </h1>
              </div>
              <div className="flex flex-col justify-center basis-1/4 max-w-md md:w-3/4 mx-auto">
                <p
                  className="text-md md:text-lg text-danse-green-500"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  Nos complace invitarlos a celebrar <br/>
                  nuestro matrimonio
                  
                </p> 
              </div>
              <div className=" basis-1/4">
                  <span
                  className="inline-block align-middle text-md md:text-lg text-danse-green-500"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                 El día 11 de Junio de 2022 <br/>
                 a las 7:30 pm
                </span>
              </div>
              <div className="flex flex-col justify-center basis-1/4"></div>
            </div>
          </div>
          {/* Hero image 
            <div>
              <div
                className="relative flex justify-center mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="450"
              >
                <div className="flex flex-col justify-center">
                  <img
                    className="mx-auto"
                    src={HeroImage}
                    width="768"
                    height="432"
                    alt="Hero"
                  />
                  <svg
                    className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto"
                    width="768"
                    height="432"
                    viewBox="0 0 768 432"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <defs>
                      <linearGradient
                        x1="50%"
                        y1="0%"
                        x2="50%"
                        y2="100%"
                        id="hero-ill-a"
                      >
                        <stop stopColor="#FFF" offset="0%" />
                        <stop stopColor="#EAEAEA" offset="77.402%" />
                        <stop stopColor="#DFDFDF" offset="100%" />
                      </linearGradient>
                      <linearGradient
                        x1="50%"
                        y1="0%"
                        x2="50%"
                        y2="99.24%"
                        id="hero-ill-b"
                      >
                        <stop stopColor="#FFF" offset="0%" />
                        <stop stopColor="#EAEAEA" offset="48.57%" />
                        <stop stopColor="#DFDFDF" stopOpacity="0" offset="100%" />
                      </linearGradient>
                      <radialGradient
                        cx="21.152%"
                        cy="86.063%"
                        fx="21.152%"
                        fy="86.063%"
                        r="79.941%"
                        id="hero-ill-e"
                      >
                        <stop stopColor="#4FD1C5" offset="0%" />
                        <stop stopColor="#81E6D9" offset="25.871%" />
                        <stop stopColor="#338CF5" offset="100%" />
                      </radialGradient>
                      <circle id="hero-ill-d" cx="384" cy="216" r="64" />
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <circle
                        fillOpacity=".04"
                        fill="url(#hero-ill-a)"
                        cx="384"
                        cy="216"
                        r="128"
                      />
                      <circle
                        fillOpacity=".16"
                        fill="url(#hero-ill-b)"
                        cx="384"
                        cy="216"
                        r="96"
                      />
                      <g fillRule="nonzero">
                        <use fill="#000" xlinkHref="#hero-ill-d" />
                        <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d" />
                      </g>
                    </g>
                  </svg>
                </div>
                <button
                  className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setVideoModalOpen(true);
                  }}
                  aria-controls="modal"
                >
                  <svg
                    className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                    <path d="M10 17l6-5-6-5z" />
                  </svg>
                  <span className="ml-3">Watch the full video (2 min)</span>
                </button>
              </div>
                  
              {/* Modal 
              
              <Modal
                id="modal"
                ariaLabel="modal-headline"
                show={videoModalOpen}
                handleClose={() => setVideoModalOpen(false)}
              >
                <div className="relative pb-9/16">
                  <iframe
                    className="absolute w-full h-full"
                    src="https://player.vimeo.com/video/174002812"
                    title="Video"
                    allowFullScreen
                  ></iframe>
                </div>
              </Modal>
              
            </div>*/}
        </div>
      </div>
    </section>
  );
}

export default HeroHome;