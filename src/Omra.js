import React, { useState } from 'react';
import { firestore } from './firebase'; // Import the initialized firestore from firebase.js
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { Link, useLocation } from 'react-router-dom';
function Omra() {
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Extract form data
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      num: event.target.num.value,
      Num_Inv: event.target.Num_Inv.value,
      depart: event.target.depart.value,
      arrivage: event.target.arrivage.value,
    };

    try {
      // Check if the same reservation already exists
      const reservationQuery = query(
        collection(firestore, 'omra'),
        where('name', '==', formData.name),
        where('email', '==', formData.email),
        where('num', '==', formData.num),
        where('Num_Inv', '==', formData.Num_Inv),
        where('depart', '==', formData.depart),
        where('arrivage', '==', formData.arrivage)
      );

      const querySnapshot = await getDocs(reservationQuery);

      if (!querySnapshot.empty) {
        setError('This reservation already exists.');
        return;
      }

      // Add form data to the "omra" collection
      await addDoc(collection(firestore, 'omra'), formData);
      
      console.log("Form data added to Firestore successfully!");
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error("Error adding form data to Firestore: ", error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <div>
      {/* Header section */}
      <section className="header">
        <a href="/home" className="logo">Wanderlux.tn.</a>

        <nav className="navbar">
          <a href="/home">Acceuil</a>
          <a href="/about">À propos</a>
          <a href="/package">Forfait</a>
          <a href="/reservation">Réserver</a>
        </nav>
        <div id="menu-btn" className="fas fa-bars"></div>
      </section>

      {/* Heading section */}
      <div className="heading" style={{ background: "url(images/header-bg-3.png) no-repeat" }}>
        <h1>Réserver Votre Omra</h1>
      </div>

      {/* Booking section */}
      <section className="booking">
        <h1 className="heading-title">book your trip!</h1>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="flex">
            <div className="inputBox">
              <span>Nom :</span>
              <input type="text" placeholder="entrer Votre Nom" name="name" />
            </div>
            <div className="inputBox">
              <span>email :</span>
              <input type="email" placeholder="entrer Votre email" name="email" />
            </div>
            <div className="inputBox">
              <span>Numero :</span>
              <input type="number" placeholder="entrer Votre Numero " name="num" />
            </div>
            
            <div className="inputBox">
              <span>Combien:</span>
              <input type="number" placeholder="number of guests" name="Num_Inv" />
            </div>
          
            <div className="inputBox">
              <span>Date De depart:</span>
              <input type="date" name="depart" />
            </div>
            <div className="inputBox">
              <span>Date D'arrivage:</span>
              <input type="date" name="arrivage" />
            </div>
          </div>

          <button type="submit" className="btn" name="send">Envoyer</button>
          {error && <p>{error}</p>}
        </form>
      </section>

      {/* Footer section */}
      <section className="footer">
        <div className="box-container">
          <div className="box">
            <h3>quick links</h3>
            <Link to="/home"> <i className="fas fa-angle-right"></i> home</Link>
            <Link to="/about"> <i className="fas fa-angle-right"></i> about</Link>
            <Link to="/auth"> <i className="fas fa-angle-right"></i> Authentifier</Link>
            
          </div>

          <div className="box">
            <h3>contact info</h3>
            <a href="tel:+21698740690" className="call-btn"><i className="fas fa-phone"></i> +216-98-740-320</a>
            <a href="tel:+21671601402" className="call-btn"><i className="fas fa-phone"></i> +216-71-601-402</a>
            <a href="mailto:reso@wanderlux.tn" className="email-btn"><i className="fas fa-envelope"></i> reso@wanderlux.tn</a>
            <a href="https://www.google.com/maps/search/?api=1&query=Route+Mateur+km7+manouba%2C+tunisia" className="map-btn"><i className="fas fa-map"></i> Route Mateur km7 manouba, tunisia</a>
          </div>

          <div className="box">
            <h3>follow us</h3>
            <a href="https://www.facebook.com/wander.luxtravel1"> <i className="fab fa-facebook-f"></i> facebook </a>
            <a href="https://www.instagram.com/wanderlux_travel_?igsh=MzRlODBiNWFlZA=="> <i className="fab fa-instagram"></i> instagram </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Omra;
