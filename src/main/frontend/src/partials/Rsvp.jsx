import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import People from "../images/user-people-svgrepo-com.svg";
import Modal from "../utils/Modal";

function Rsvp(props) {
  {
    /** State variables */
  }
  const [inputFields, setInputFields] = useState([
    { name: "", menu: "adult", allergies: "" },
  ]);
  const [errors, setErrors] = useState([{ name: false, menu: false }]);
  const [showModal, setShowModal] = useState({
    show: false,
    error: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(false);

  {
    /** Get Token from query params */
  }
  const search = new URLSearchParams(useLocation().search);

  {
    /** Handle form submit and call backend API */
  }
  const onSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    let error = [...errors];
    let modal = showModal;
    setLoading(true);
    for (let i = 0; i < inputFields.length; i++) {
      if (!inputFields[i].name) {
        error[i].name = true;
        valid = false;
      }
      if (!inputFields[i].menu) {
        error[i].menu = true;
        valid = false;
      }
    }
    setErrors(error);
    if (valid) {
      console.log(inputFields);

      let token = search.get("token");
      console.log("Token from query param: " + token);
      let url =
        window.location.protocol +
        "//" +
        window.location.host +
        "/invitation/api/v1/rsvp/";
      console.log("API URL: " + url);
      let body = JSON.stringify({
        userToken: token,
        guests: [...inputFields],
      });
      console.log("Request body: " + body);
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response: " + data);
          setLoading(false);
          if (data.code === "400") {
            modal = {
              show: true,
              error: true,
              errorMessage:
                "Hubo un problema con tu respuesta. Por favor, revisa los datos o contacta a Monse o Dany",
            };
          } else if (data.code === "409") {
            modal = {
              show: true,
              error: true,
              errorMessage:
                "Ya registraste una respuesta con este token. Por favor, contacta a Monse o Dany para actualizar tu respuesta",
            };
          } else {
            clearFields();
            handleScroll(props.rsvpRef.current);
            modal = { show: true, error: false, errorMessage: "" };
          }
          setShowModal(modal);
        })
        .catch((e) => {
          console.error("Error calling RSVP API ", e);
          setLoading(false);
          modal = {
            show: true,
            error: false,
            errorMessage:
              "Hubo un error al mandar tu respuesta. Por favor, vuelve a intentarlo o contacta a Monse o Dany",
          };
          setShowModal(modal);
        });
    } else {
      console.log("Error in guest form");
    }
  };

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  {
    /** Handle form changes */
  }
  const handleFormChange = (index, event) => {
    event.preventDefault();
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
    errors[index] = { name: false, menu: false };
    setErrors(errors);
  };
  const addFields = (index) => {
    if (inputFields.length < 10) {
      let newFields = { name: "", menu: "adult", allergies: "" };
      setInputFields([...inputFields, newFields]);
      let newErrors = { name: false, menu: false };
      setErrors([...errors, newErrors]);
    }
  };
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
    let error = [...errors];
    error.splice(index, 1);
    setErrors(error);
  };
  const clearFields = () => {
    let data = { name: "", menu: "adult", allergies: "" };
    let error = { name: false, menu: false };
    setInputFields([data]);
    setErrors([error]);
  };
  return (
    <section ref={props.rsvpRef}>
      <div className="mim-h-screen bg-danse-green-125 flex flex-col items-center py-20 md:py-28">
        <div className="text-center w-full md:w-3/4 pb-4 ">
          <h1 className="h2 text-danse-green-500 py-4">
            Confirmación de asistencia
          </h1>
          <p className="text-xl text-danse-green-500">
            Por favor, déjanos saber si nos acompañarás al evento y quiénes
            vendrán contigo antes del 23 de mayo
          </p>
        </div>
        <form className="w-full md:w-3/4" onSubmit={(e) => onSubmit(e)}>
          {inputFields.map((input, index) => {
            return (
              <div key={index} className="flex flex-wrap md:-mx-3 mb-4">
                <div className="flex flex-row justify-center items-center px-3 -mx-3">
                  <div className="h-10 w-10 flex text-center bg-danse-pink-100 rounded-full shadow flex-shrink-0 ml-3">
                    <img
                      className="w-1/2 h-1/2 m-auto"
                      src={People}
                      alt="Pin"
                    />
                  </div>
                  <h4 className="text-danse-pink-500 text-xl font-bold p-6 -mx-3">
                    Invitado {index + 1}
                  </h4>
                </div>
                <div className="w-full mb-2 md:mb-4 px-3">
                  <label className="block text-danse-green-500 text-sm font-bold mb-2">
                    Nombre
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="name"
                    placeholder="Nombre"
                    value={input.name}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                  {errors[index].name && (
                    <span className="block text-red-500 font-bold">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4 ">
                  <label className="block text-danse-green-500 text-sm font-bold mb-2">
                    Menú
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-danse-green-500 bg-danse-baige-100 "
                    name="menu"
                    value={input.menu}
                    onChange={(event) => handleFormChange(index, event)}
                  >
                    <option value="adult">Adulto</option>
                    <option value="kid">Infantil</option>
                  </select>
                  {errors[index].menu && (
                    <span className="block text-red-500 font-bold">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block text-danse-green-500 text-sm font-bold mb-2">
                    Alergias
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                    value={input.allergies}
                    name="allergies"
                    placeholder="Ninguna"
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </div>
                {inputFields.length > 1 && (
                  <div className="text-danse-green-500 w-full px-3 mb-4">
                    <button
                      className="w-full bg-slate-200 rounded shadow shadow appearance-none border py-2 px-3 text-danse-green-500 "
                      onClick={(event) => {
                        event.preventDefault();
                        removeFields(index);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          <div className="text-danse-green-500 w-full px-3 md:px-0 mb-4">
            <button
              className="w-full bg-slate-200 rounded shadow shadow appearance-none border py-2 px-3 text-danse-green-500 "
              onClick={(event) => {
                event.preventDefault();
                addFields();
              }}
            >
              Agregar invitado
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="shadow appearance-none border rounded py-2 px-5 font-bold text-danse-pink-500 bg-danse-pink-100 "
              onClick={(e) => onSubmit(e)}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <Modal
        id="modal"
        ariaLabel="modal-headline"
        show={showModal.show}
        handleClose={() =>
          setShowModal({ show: false, error: false, errorMessage: "" })
        }
        bgShow={true}
      >
        <div className="relative text-center text-danse-green-500 flex flex-col justify-center align-middle">
          <div
            className="flex flex-grow justify-end px-4 py-4"
            onClick={() =>
              setShowModal({ show: false, error: false, errorMessage: "" })
            }
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
          <h1 className="h1 pt-10 md:pt-16 px-4 pb-4 md:pb-6">
            {showModal.error ? "¡Ups!" : "Éxito"}
          </h1>
          <p className="text-xl pb-10 md:pb-16 px-4">
            {showModal.error
              ? showModal.errorMessage
              : "Hemos recibido tu respuesta. Esperamos verte pronto"}
          </p>
          <div className="flex flex-grow justify-center pb-10">
            <button
              className="shadow appearance-none border rounded py-2 px-5 font-bold text-danse-pink-500 bg-danse-pink-100 "
              onClick={() =>
                setShowModal({
                  show: false,
                  error: false,
                  errorMessage: "",
                })
              }
            >
              Aceptar
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        id="spinner"
        show={loading}
        handleClose={() => console.log("Close spinner")}
        bgShow={false}
      >
        <div className="relative h-full flex justify-center align-middle">
          <svg
            role="status"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </Modal>
    </section>
  );
}
export default Rsvp;
