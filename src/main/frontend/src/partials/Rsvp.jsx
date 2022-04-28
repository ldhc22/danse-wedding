import { useForm } from "react-hook-form";
import React, { useState } from "react";
import People from "../images/user-people-svgrepo-com.svg";

function Rsvp(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(inputFields);
    /** TODO
     * Implementar servicio
     */
  };
  const [inputFields, setInputFields] = useState([
    { name: "", menu: "adult", allergies: "" },
  ]);
  const handleFormChange = (index, event) => {
    event.preventDefault();
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const addFields = (index) => {
    if (inputFields.length < 10) {
      let newFields = { name: "", menu: "adult", allergies: "" };
      setInputFields([...inputFields, newFields]);
    }
  };
  const removeFields = (index, input) => {
    input = { name: "", menu: "adult", allergies: "" };
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  return (
    <section ref={props.rsvpRef}>
      <div className="mim-h-screen bg-danse-green-125 flex flex-col items-center py-20 md:py-28">
        <div className="text-center w-full md:w-3/4 pb-4 ">
          <h1 className="h2 text-danse-green-500 py-4">Confirmación de asistencia</h1>
          <p className="text-xl text-danse-green-500" >
            Por favor, déjanos saber si nos acompañarás al evento y quiénes
            vendrán contigo antes del 23 de mayo
          </p>
        </div>
        <form className="w-full md:w-3/4" onSubmit={handleSubmit(onSubmit)}>
          {inputFields.map((input, index) => {
            return (
              <div key={index} className="flex flex-wrap md:-mx-3 mb-4">
                <div className="flex flex-row justify-center items-center px-3 -mx-3">
                  <div className="h-10 w-10 flex text-center bg-danse-pink-100 rounded-full shadow flex-shrink-0 ml-3">
                    <img className="w-1/2 h-1/2 m-auto" src={People} alt="Pin" />
                  </div>
                  <h4 className="text-danse-pink-500 text-xl font-bold p-6 -mx-3">Invitado {index + 1}</h4>
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
                  {errors.name && (
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
                  {errors.menu && <span className="block text-red-500 font-bold">Este campo es requerido</span>}
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
                        removeFields(index, input);
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
            <button className="shadow appearance-none border rounded py-2 px-5 font-bold text-danse-pink-500 bg-danse-pink-100 " onClick={onSubmit}>Enviar</button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default Rsvp;
