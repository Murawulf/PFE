import React, { useState } from 'react';
import { firestore, storage } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Dashboard() {
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    starRating: '',
    description: '',
    location: '',
    priceLogement: '',
    priceDemiPension: '',
    pricePensionComplete: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleImageUpload = async () => {
    try {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url); // Set the imageUrl state with the download URL
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };
  
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await handleImageUpload();
      const newData = { ...formData, imageUrl }; // Update formData with the imageUrl
      await addDoc(collection(firestore, 'hotels'), newData);
      console.log('Hotel data added to Firestore successfully!');
    } catch (error) {
      console.error('Error adding hotel data to Firestore: ', error);
      setError('Error adding hotel data. Please try again later.');
    }
  };
  

  return (
    <div>
      {/* Header section */}
      <section className="header">
        <a href="/home" className="logo">Wanderlux.tn.</a>
        <nav className="navbar">
          <a href="/auth">Authentifier</a>
          <a href="/about">À propos</a>
          <a href="/package">Forfait</a>
          <a href="/reservation">Réserver</a>
        </nav>
        <div id="menu-btn" className="fas fa-bars"></div>
      </section>

      {/* Heading section */}
      <div className="heading" style={{ background: "url(images/header-bg-3.png) no-repeat" }}>
        <h1>Ajouter un Hôtel</h1>
      </div>

      {/* Form section */}
      <section className="form">
        <form onSubmit={handleSubmit} className="hotel-form">
          <div className="form-group">
            <label htmlFor="name">Nom de l'Hôtel:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="starRating">Classement:</label>
            <input type="text" id="starRating" name="starRating" value={formData.starRating} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="location">Emplacement:</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="priceLogement">Prix Logement:</label>
            <input type="text" id="priceLogement" name="priceLogement" value={formData.priceLogement} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="priceDemiPension">Prix Demi-Pension:</label>
            <input type="text" id="priceDemiPension" name="priceDemiPension" value={formData.priceDemiPension} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="pricePensionComplete">Prix Pension Complète:</label>
            <input type="text" id="pricePensionComplete" name="pricePensionComplete" value={formData.pricePensionComplete} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} required />
          </div>
          <button type="submit" className="btn">Ajouter Hôtel</button>
        </form>
        {error && <p>{error}</p>}
      </section>

      {/* Footer section */}
      <section className="footer">
        <div className="box-container">
          <div className="box">
            <h3>Liens Rapides</h3>
            <a href="/"> <i className="fas fa-angle-right"></i> Accueil</a>
            <a href="/about"> <i className="fas fa-angle-right"></i> À Propos</a>
            <a href="/package"> <i className="fas fa-angle-right"></i> Forfait</a>
            <a href="/book"> <i className="fas fa-angle-right"></i> Réserver</a>
          </div>
          <div className="box">
            <h3>Infos de Contact</h3>
            <a href="tel:+21698740690" className="call-btn"><i className="fas fa-phone"></i> +216-98-740-690</a>
            <a href="mailto:contact@wanderlux-travel.tn" className="email-btn"><i className="fas fa-envelope"></i> contact@wanderlux-travel.tn</a>
            <a href="https://www.google.com/maps/search/?api=1&query=Route+Mateur+km7+manouba%2C+tunisia" className="map-btn"><i className="fas fa-map"></i> Route Mateur km7 manouba, tunisia</a>
          </div>
          <div className="box">
            <h3>Nous Suivre</h3>
            <a href="#"> <i className="fab fa-facebook-f"></i> Facebook </a>
            <a href="#"> <i className="fab fa-twitter"></i> Twitter </a>
            <a href="#"> <i className="fab fa-instagram"></i> Instagram </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
