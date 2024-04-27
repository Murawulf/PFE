import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';

function Hotel() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Function to show modal
  const showModal = (hotel) => {
    setSelectedHotel(hotel);
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'hotels'));
        const fetchedHotels = [];
        querySnapshot.forEach((doc) => {
          fetchedHotels.push({ id: doc.id, ...doc.data() });
        });
        setHotels(fetchedHotels);
      } catch (error) {
        console.error('Error fetching hotels: ', error);
        setError('Error fetching hotels. Please try again later.');
      }
    };

    fetchHotels();
  }, []);

  return (
    <div>
   
      {/* Heading section */}
      <div className="heading" style={{ background: "url(images/header-bg-3.png) no-repeat" }}>
        <h1>Hotels</h1>
      </div>

      {/* Main content section */}
      <section className="main-content">
        <h2>Hotels</h2>
        <div className="hotels-container">
          {hotels.map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              <img src={hotel.imageUrl} alt={hotel.name} />
              <div className="hotel-details">
                <h3 style={{ color: "goldenrod", fontSize: "2rem" }}>{hotel.name}</h3>
                <p><i className="fas fa-map-marker-alt"></i> {hotel.location}</p>
                <div className="star-rating">
                  {[...Array(parseInt(hotel.starRating))].map((_, index) => (
                    <span key={index} className="star">&#9733;</span>
                  ))}
                </div>
                <p>{hotel.description}</p>
                <p>Price (Demi-Pension): {hotel.priceDemiPension}</p>
                <button className="tarif-btn" onClick={() => showModal(hotel)}>Tarifs</button>
                {/* Rest of the prices in modal */}
              </div>
            </div>
          ))}
        </div>
        {error && <p>{error}</p>}
      </section>


      {/* Modal */}
      {modalVisible && selectedHotel && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <h2>Prices for {selectedHotel.name}</h2>
            <p>Price (Demi-Pension): {selectedHotel.priceDemiPension}</p>
            <p>Price (Logement): {selectedHotel.priceLogement}</p>
            <p>Price (Pension Complète): {selectedHotel.pricePensionComplete}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hotel;
