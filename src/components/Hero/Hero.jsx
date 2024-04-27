import React, { useState } from "react";

const Hero = () => {
  const [destinationValue, setDestinationValue] = useState("");
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [roomsValue, setRoomsValue] = useState(1);
  const [adultsValue, setAdultsValue] = useState(1);
  const [childrenValue, setChildrenValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRoomInputClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSearch = () => {
    const searchParams = `${destinationValue}/tous/${startDateValue}-${endDateValue}`;
    const url = `https://booking.wanderlux-travel.tn/${searchParams}`;
    window.location.href = url;
  };

  return (
    <div className="bg-black/20 h-full">
      <div className="h-full flex justify-center items-center p-4 bg-primary/10">
        <div className="container">
          <div className="text-white">
            <p data-aos="fade-up" className="text-sm">
              Nos Voyages
            </p>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="font-bold text-3xl"
            >
              Recherchez votre destination
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="space-y-4 bg-white rounded-md p-4 relative flex flex-wrap items-center"
          >
            <div className="flex items-center gap-4" style={{ marginTop: "5px" }}>
              <label htmlFor="destination" className="opacity-70 w-20 text-right">
                Hotel ou ville
              </label>
              <input
                type="text"
                name="destination"
                id="destination"
                placeholder="tn-Tabarka"
                className="w-full bg-gray-100 range accent-primary focus:outline-primary focus:outline outline-1 rounded-full p-2"
                value={destinationValue}
                onChange={(e) => setDestinationValue(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="startDate" className="opacity-70 w-20 text-right">
                Arrivé
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="!placeholder-slate-400 bg-gray-100 rounded-full focus:outline-primary focus:outline outline-1 p-2"
                value={startDateValue}
                onChange={(e) => setStartDateValue(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="endDate" className="opacity-70 w-20 text-right">
                Depart
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="!placeholder-slate-400 bg-gray-100 rounded-full focus:outline-primary focus:outline outline-1 p-2"
                value={endDateValue}
                onChange={(e) => setEndDateValue(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="rooms" className="opacity-70 w-20 text-right">
                Chambre
              </label>
              <input
                type="text"
                id="rooms"
                name="rooms"
                placeholder="1"
                className="bg-gray-100 range accent-primary focus:outline-primary focus:outline outline-1 rounded-full p-2 cursor-pointer"
                onClick={handleRoomInputClick}
                value={roomsValue}
                readOnly
              />
            </div>
            <button className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-2 rounded-full duration-200 ml-auto" onClick={handleSearch}>
              Rechercher
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-lg">
            <label htmlFor="roomsModal" className="block mb-2">
              Chambre
            </label>
            <input
              type="text"
              id="roomsModal"
              placeholder="1"
              className="w-full mb-4"
              value={roomsValue}
              onChange={(e) => setRoomsValue(e.target.value)}
            />
            <label htmlFor="adultsModal" className="block mb-2">
              Adultes
            </label>
            <select
              id="adultsModal"
              className="w-full mb-4"
              value={adultsValue}
              onChange={(e) => setAdultsValue(e.target.value)}
            >
              {[...Array(10).keys()].map((adult) => (
                <option key={adult + 1} value={adult + 1}>
                  {adult + 1}
                </option>
              ))}
            </select>
            <label htmlFor="childrenModal" className="block mb-2">
              Enfants
            </label>
            <select
              id="childrenModal"
              className="w-full mb-4"
              value={childrenValue}
              onChange={(e) => setChildrenValue(e.target.value)}
            >
              {[...Array(11).keys()].map((child) => (
                <option key={child} value={child}>
                  {child}
                </option>
              ))}
            </select>
            <button className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-2 rounded-full duration-200 ml-auto" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
