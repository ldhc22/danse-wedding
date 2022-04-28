import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Heart from "../images/gift-heart.svg";

const handleScroll = (ref) => {
  window.scrollTo({
    top: ref.offsetTop,
    left: 0,
    behavior: "smooth",
  });
};

function Header(props) {
  const [top, setTop] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { search } = useLocation();

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 bg-opacity-70 transition duration-300 ease-in-out ${
        !top && "bg-danse-green-100 backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link
              to={{
                pathname: "/",
                search: search,
              }}
              className="block"
              aria-label="Cruip"
              onClick={() => {
                handleScroll(props.topRef.current);
              }}
            >
              <div className="h-12 w-12 flex text-center bg-danse-pink-100 rounded-full shadow flex-shrink-0 ml-3">
                <img className="w-1/2 h-1/2 m-auto" src={Heart} alt="Pin" />
              </div>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            {/* Mobile menu*/}
            <section className="flex lg:hidden flex-grow justify-end ">
              <div
                className={isNavOpen ? "space-y-2 hidden" : "space-y-2 block"}
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                <span className="block h-0.5 w-8 animate-pulse bg-danse-green-500"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-danse-green-500"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-danse-green-500"></span>
              </div>
              <div
                className={
                  isNavOpen
                    ? "block absolute w-full top-0 left-0 z-10"
                    : "hidden"
                }
              >
                <div
                  className="absolute top-0 right-0 px-4 py-4"
                  onClick={() => setIsNavOpen(false)}
                >
                  <svg
                    className="h-8 w-8 text-danse-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <ul className=" flex flex-col items-center justify-between min-h-[250px]">
                  <li className="flex flex-col items-center p-4 text-danse-green-500 border-b border-danse-baige-500 mt-16 uppercase w-full bg-opacity-90 transition duration-300 ease-in-out bg-danse-green-100 backdrop-blur-sm shadow-lg">
                    <Link
                      to={{
                        pathname: "/",
                        hash: "#saveTheDate",
                        search: search,
                      }}
                      onClick={() => {
                        handleScroll(props.dateRef.current);
                        setIsNavOpen(false);
                      }}
                    >
                      Fecha
                    </Link>
                  </li>
                  <li className="flex flex-col items-center p-4 text-danse-green-500 border-b border-danse-baige-500 uppercase w-full bg-opacity-90 transition duration-300 ease-in-out bg-danse-green-100 backdrop-blur-sm shadow-lg">
                    <Link
                      to={{
                        pathname: "/",
                        hash: "#bestPlace",
                        search: search,
                      }}
                      onClick={() => {
                        handleScroll(props.locationRef.current);
                        setIsNavOpen(false);
                      }}
                    >
                      Lugar
                    </Link>
                  </li>
                  <li className="flex flex-col items-center p-4 text-danse-green-500 border-b border-danse-baige-500 uppercase w-full bg-opacity-90 transition duration-300 ease-in-out bg-danse-green-100 backdrop-blur-sm shadow-lg">
                    <Link
                      to={{
                        pathname: "/",
                        hash: "#youAreMyGift",
                        search: search,
                      }}
                      onClick={() => {
                        handleScroll(props.giftRef.current);
                        setIsNavOpen(false);
                      }}
                    >
                      Mesa de regalos
                    </Link>
                  </li>
                  <li className=" flex flex-col items-center p-4 text-danse-green-500 border-b border-danse-baige-500 uppercase w-full bg-opacity-90 transition duration-300 ease-in-out bg-danse-green-100 backdrop-blur-sm shadow-lg">
                    <Link
                      to={{
                        pathname: "/",
                        hash: "#confirmacion",
                        search: search,
                      }}
                      onClick={() => {
                        handleScroll(props.rsvpRef.current);
                        setIsNavOpen(false);
                      }}
                    >
                      Confirmación
                    </Link>
                  </li>
                </ul>
              </div>
            </section>
            {/* Desktop menu */}
            <ul className="flex-grow justify-end flex-wrap items-center hidden lg:flex">
              <li className="px-2 text-gray-700 hover:text-gray-900 hover:bg-gray-300  rounded ">
                <Link
                  to={{
                    pathname: "/",
                    hash: "#saveTheDate",
                    search: search,
                  }}
                  onClick={() => {
                    handleScroll(props.dateRef.current);
                  }}
                >
                  Fecha
                </Link>
              </li>
              <li className="px-2 text-gray-700 hover:text-gray-900 hover:bg-gray-300  rounded ">
                <Link
                  to={{
                    pathname: "/",
                    hash: "#bestPlace",
                    search: search,
                  }}
                  onClick={() => {
                    handleScroll(props.locationRef.current);
                  }}
                >
                  Lugar
                </Link>
              </li>
              <li className="px-2 text-gray-700 hover:text-gray-900 hover:bg-gray-300  rounded ">
                <Link
                  to={{
                    pathname: "/",
                    hash: "#youAreMyGift",
                    search: search,
                  }}
                  onClick={() => {
                    handleScroll(props.giftRef.current);
                  }}
                >
                  Mesa de regalos
                </Link>
              </li>
              <li className="px-2 text-gray-700 hover:text-gray-900 hover:bg-gray-300  rounded ">
                <Link
                  to={{
                    pathname: "/",
                    hash: "#confirmacion",
                    search: search,
                  }}
                  onClick={() => {
                    handleScroll(props.rsvpRef.current);
                  }}
                >
                  Confirmación
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
