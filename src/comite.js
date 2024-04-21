import React, { useState } from 'react';
import { firestore } from './firebase'; // Import the initialized firestore from firebase.js
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import { Link, useLocation } from 'react-router-dom';
function Comite() {
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Extract form data
    const formData = {
      comiteName: event.target.comiteName.value,
      numberOfMembers: event.target.numberOfMembers.value,
      civility: event.target.civility.value,
      contactName: event.target.contactName.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      address: event.target.address.value,
    };

    try {
      // Add form data to the "Comite_Entreprise" collection
      await addDoc(collection(firestore, 'Comite_Entreprise'), formData);
      
      console.log("Form data added to Firestore successfully!");
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error("Error adding form data to Firestore: ", error);
      // Optionally, you can show an error message to the user here
      setError(error.message);
    }
  };

  return (
    <div>
      {/* Header section */}
      <section className="header">
        <a href="/home" className="logo">Wanderlux.tn.</a>
        <nav className="navbar">
        <a href="/home">acceuil</a>
          <a href="/about">À propos</a>
          <a href="/package">Forfait</a>
          <a href="/reservation">Réserver</a>
        </nav>
        <div id="menu-btn" className="fas fa-bars"></div>
      </section>

      {/* Heading section */}
      <div className="heading" style={{background: "url(images/header-bg-3.png) no-repeat"}}>
        <h1>Inscription Comité</h1>
      </div>

      {/* Booking section */}
      <section className="booking">
        <h1 className="heading-title">Votre Comité d’Entreprise n’est pas encore partenaire ?</h1>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="flex">
            <div className="inputBox">
              <span>Nom du comité ou de l’Amicale *</span>
              <input type="text" placeholder="Entrer le nom du comité ou de l’Amicale" name="comiteName" required />
            </div>
            <div className="inputBox">
              <span>Nombre d’adhérent *</span>
              <input type="number" placeholder="Entrer le nombre d’adhérent" name="numberOfMembers" required />
            </div>
            <div className="inputBox">
              <span>Civilité *</span>
              <select name="civility" required>
                <option value="Mr">Mr</option>
                <option value="Mme">Mme</option>
              </select>
            </div>
            <div className="inputBox">
              <span>Nom du Contact *</span>
              <input type="text" placeholder="Entrer le nom du contact" name="contactName" required />
            </div>
            <div className="inputBox">
              <span>Téléphone *</span>
              <input type="tel" placeholder="Entrer votre téléphone" name="phone" required />
            </div>
            <div className="inputBox">
              <span>Email *</span>
              <input type="email" placeholder="Entrer votre email" name="email" required />
            </div>
            <div className="inputBox">
              <span>Adresse *</span>
              <input type="text" placeholder="Entrer votre adresse" name="address" required />
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

export default Comite;
