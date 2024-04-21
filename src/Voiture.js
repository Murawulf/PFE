import React, { useState } from 'react';
import { firestore } from './firebase'; // Import the initialized firestore from firebase.js
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { Link, useLocation } from 'react-router-dom';
function Voiture() {
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Extract form data
    const formData = {
      nom: event.target.nom.value,
      email: event.target.email.value,
      Num: event.target.Num.value,
      lieu: event.target.lieu.value,
      type_v: event.target.type_v.value,
      depart: event.target.depart.value,
      fin: event.target.fin.value,
    };

    try {
      // Check if the same reservation already exists
      const reservationQuery = query(
        collection(firestore, 'Reservation_Voiture'),
        where('nom', '==', formData.nom),
        where('email', '==', formData.email),
        where('Num', '==', formData.Num),
        where('lieu', '==', formData.lieu),
        where('type_v', '==', formData.type_v),
        where('depart', '==', formData.depart),
        where('fin', '==', formData.fin)
      );

      const querySnapshot = await getDocs(reservationQuery);

      if (!querySnapshot.empty) {
        setError('This reservation already exists.');
        return;
      }

      // Add form data to the "Reservation_Voiture" collection
      await addDoc(collection(firestore, 'Reservation_Voiture'), formData);
      
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
        <a href="/home" className="logo">Wanderlux.tn</a>

        <nav className="navbar">
          <a href="/home">acceuil</a>
          <a href="/auth">Authentifier</a>
          <a href="/about">À propos</a>
          <a href="/package">Forfait</a>
          <a href="/reservation">Réserver</a>
        </nav>
        <div id="menu-btn" className="fas fa-bars"></div>
      </section>

      {/* Heading section */}
      <div className="heading" style={{ background: "url(images/header-bg-3.png) no-repeat" }}>
      
      </div>

      {/* Booking section */}
      <section className="booking">
        <h1 className="heading-title">Réserver votre voiture dès maintenant!</h1>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="flex">
            <div className="inputBox">
              <span>Nom :</span>
              <input type="text" name="nom" placeholder="Votre nom" />
            </div>
            <div className="inputBox">
              <span>Email :</span>
              <input type="email" name="email" placeholder="Votre email" />
            </div>
            <div className="inputBox">
              <span>Téléphone :</span>
              <input type="number" name="Num" placeholder="Votre numéro de téléphone" />
            </div>
            <div className="inputBox">
              <span>Lieu de prise en charge :</span>
              <input type="text" name="lieu" placeholder="Lieu de prise en charge" />
            </div>
            <div className="inputBox">
              <span>Type de voiture :</span>
              <input type="text" name="type_v" placeholder="Type de voiture désiré" />
            </div>
            <div className="inputBox">
              <span>Date de départ :</span>
              <input type="date" name="depart" />
            </div>
            <div className="inputBox">
              <span>Date fin :</span>
              <input type="date" name="fin" />
            </div>
          </div>

          <button type="submit" className="btn">Envoyer</button>
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

export default Voiture;
