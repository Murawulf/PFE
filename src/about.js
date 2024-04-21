import React, { useState } from 'react';
import aboutImage from './images/about-img.jpg';
import { firestore } from './firebase'; // Import the initialized firestore from firebase.js
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import { Link, useLocation } from 'react-router-dom';
function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'Contact'), formData);
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
        <a href="/home">acceuil</a>
          <a href="/about">À propos</a>
          <a href="/package">Forfait</a>
          <a href="/reservation">Réserver</a>
        </nav>
        <div id="menu-btn" className="fas fa-bars"></div>
      </section>
      
      {/* Heading section */}
      <div className="heading" style={{background: "url(images/header-bg-1.png) no-repeat"}}>
        <h1>about us</h1>
      </div>
      
      {/* About section */}
      <section className="home-about">
        <div className="image">
          <img src={aboutImage} alt="" />
        </div>
        <div className="content">
          <h3>Pourquoi Nous Choisir</h3>
          <p>Wanderlux, Votre Passerelle Vers Des Aventures Extraordinaires À Travers La Tunisie, Situé À Manouba. Nous Sommes Passionnés Par La Découverte, L'exploration Et La Création De Voyages Inoubliables Pour Nos Clients.

Notre Équipe Dévouée Est Composée D'experts Passionnés Par Le Tourisme Et La Culture Tunisienne. Nous Mettons Tout En Œuvre Pour Vous Offrir Un Service Personnalisé, Des Conseils Avisés Et Des Itinéraires Sur Mesure Adaptés À Vos Envies Et À Votre Budget.</p>
          <a href="/about" className="btn">en savoir plus</a>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact">
        <h3>Contactez-nous</h3>
        <form onSubmit={handleSubmit} className="book-form">
          <div className="inputBox">
            <span>Nom :</span>
            <input type="text" placeholder="entrer Votre Nom" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="inputBox">
            <span>Email :</span>
            <input type="email" placeholder="entrer Votre email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="inputBox">
            <span>Message :</span>
            <textarea placeholder="Votre message" name="message" value={formData.message} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="btn" name="send">Envoyer</button>
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
            <a href="tel:+21698740690" className="call-btn"><i className="fas fa-phone"></i> +216-98-740-690</a>
            <a href="mailto:contact@wanderlux-travel.tn" className="email-btn"><i className="fas fa-envelope"></i> contact@wanderlux-travel.tn</a>
            <a href="https://www.google.com/maps/search/?api=1&query=Route+Mateur+km7+manouba%2C+tunisia" className="map-btn"><i className="fas fa-map"></i> Route Mateur km7 manouba, tunisia</a>
          </div>

          <div className="box">
            <h3>follow us</h3>
            <a href="#"> <i className="fab fa-facebook-f"></i> facebook </a>
            <a href="#"> <i className="fab fa-twitter"></i> twitter </a>
            <a href="#"> <i className="fab fa-instagram"></i> instagram </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
