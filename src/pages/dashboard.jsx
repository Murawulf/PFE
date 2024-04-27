import React, { useState, useEffect } from 'react';
import { firestore, storage } from './firebase';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


function Dashboard() {
  const [error, setError] = useState(null);
  const [hotelImage, setHotelImage] = useState(null);
  const [hotelImageUrl, setHotelImageUrl] = useState('');
  const [hotelFormData, setHotelFormData] = useState({
    name: '',
    starRating: '',
    description: '',
    location: '',
    priceLogement: '',
    priceDemiPension: '',
    pricePensionComplete: ''
  });
  const [hotelFormVisible, setHotelFormVisible] = useState(false); // State to track hotel form visibility

  const [carImage, setCarImage] = useState(null);
  const [carImageUrl, setCarImageUrl] = useState('');
  const [carFormData, setCarFormData] = useState({
    nom: '',
    carburant: '', // Diesel or Essence
    prix_jour: '',
    prix_mois: '',
    description: '',
    categorie: '', // Citadine, Sedan, SUV, etc.
    disponibility: {} // Initialize disponibility as an empty object
  });
  const [carFormVisible, setCarFormVisible] = useState(false); // State to track car form visibility

  const [selectedDate, setSelectedDate] = useState(''); // Initialize selectedDate as an empty string
  const [carDisponibility, setCarDisponibility] = useState(''); // State to track car disponibility

  useEffect(() => {
    // Fetch disponibility for selected date
    if (selectedDate && carFormData.disponibility[selectedDate]) {
      setCarDisponibility(carFormData.disponibility[selectedDate]);
    } else {
      setCarDisponibility('');
    }
  }, [selectedDate, carFormData]);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setSelectedDate(getCurrentDate()); // Initialize selectedDate after the component mounts
  }, []);

  const handleHotelChange = (e) => {
    setHotelFormData({ ...hotelFormData, [e.target.name]: e.target.value });
  };

  const handleHotelImageChange = (e) => {
    setHotelImage(e.target.files[0]);
  };

  const handleHotelImageUpload = async () => {
    try {
      const storageRef = ref(storage, `images/${hotelImage.name}`);
      await uploadBytes(storageRef, hotelImage);
      const url = await getDownloadURL(storageRef);
      setHotelImageUrl(url); // Set the hotelImageUrl state with the download URL
    } catch (error) {
      console.error('Error uploading image: ', error);
      setError('Error uploading image. Please try again with a different image.');
    }
  };
  
  const handleHotelSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Wait for image upload to complete and get the URL
      await handleHotelImageUpload();
      // Update hotelFormData with the hotelImageUrl
      const newData = { ...hotelFormData, imageUrl: hotelImageUrl };
      // Add the updated hotelFormData to Firestore
      await addDoc(collection(firestore, 'hotels'), newData);
      console.log('Hotel data added to Firestore successfully!');
    } catch (error) {
      console.error('Error adding hotel data to Firestore: ', error);
      setError('Error adding hotel data. Please try again later.');
    }
  };

  const toggleHotelFormVisibility = () => {
    setHotelFormVisible(!hotelFormVisible); // Toggle hotel form visibility
  };

  const handleCarChange = (e) => {
    setCarFormData({ ...carFormData, [e.target.name]: e.target.value });
  };

  const handleCarImageChange = (e) => {
    setCarImage(e.target.files[0]);
  };

  const handleCarImageUpload = async () => {
    try {
      const storageRef = ref(storage, `images/${carImage.name}`);
      await uploadBytes(storageRef, carImage);
      const url = await getDownloadURL(storageRef);
      setCarImageUrl(url); // Set the carImageUrl state with the download URL
    } catch (error) {
      console.error('Error uploading image: ', error);
      setError('Error uploading image. Please try again with a different image.');
    }
  };
  
  const handleCarSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Wait for image upload to complete and get the URL
      await handleCarImageUpload();
      // Update carFormData with the carImageUrl and initialize disponibility with current date set to 'disponible'
      const newData = { ...carFormData, imageUrl: carImageUrl, disponibility: { [getCurrentDate()]: 'disponible' } };
      // Add the updated carFormData to Firestore
      await addDoc(collection(firestore, 'voitures'), newData);
      console.log('Car data added to Firestore successfully!');
      setCarFormData({
        nom: '',
        carburant: '',
        prix_jour: '',
        prix_mois: '',
        description: '',
        categorie: '',
        disponibility: { [getCurrentDate()]: 'disponible' } // Reset disponibility after submission
      });
      setCarFormVisible(false); // Hide the car form after submission
    } catch (error) {
      console.error('Error adding car data to Firestore: ', error);
      setError('Error adding car data. Please try again later.');
    }
  };

  const toggleCarFormVisibility = () => {
    setCarFormVisible(!carFormVisible); // Toggle car form visibility
  };

  const handleDisponibilityChange = async () => {
    try {
      const carDocRef = doc(firestore, 'voitures', 'CAR_ID'); // Replace 'CAR_ID' with the actual ID of the car document
      await updateDoc(carDocRef, {
        [`disponibility.${selectedDate}`]: carDisponibility
      });
      console.log('Car disponibility updated successfully!');
    } catch (error) {
      console.error('Error updating car disponibility: ', error);
      setError('Error updating car disponibility. Please try again later.');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar section */}
      <div className="sidebar">
        <div className="sidebar-header">Dashboard</div>
        <nav className="sidebar-nav">
          <a href="/home">Home</a>
          <a href="/auth">Authentifier</a>
          <a href="/about">À propos</a>
          <a href="/package">Forfait</a>
          <a href="/reservation">Réserver</a>
        </nav>
      </div>

      {/* Main content section */}
      <div className="main-content">
   
        {/* Hotel form section */}
        <div className="heading" style={{ background: "url(images/header-bg-3.png) no-repeat" }} onClick={toggleHotelFormVisibility}>
          <h1>Ajouter un Hôtel</h1>
        </div>
        {hotelFormVisible && (
          <section className="form">
            <form onSubmit={handleHotelSubmit} className="hotel-form">
              <div className="form-group">
                <label htmlFor="name">Nom de l'Hôtel:</label>
                <input type="text" id="name" name="name" value={hotelFormData.name} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="starRating">Classement:</label>
                <input type="text" id="starRating" name="starRating" value={hotelFormData.starRating} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={hotelFormData.description} onChange={handleHotelChange} required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="location">Emplacement:</label>
                <input type="text" id="location" name="location" value={hotelFormData.location} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="priceLogement">Prix Logement:</label>
                <input type="text" id="priceLogement" name="priceLogement" value={hotelFormData.priceLogement} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="priceDemiPension">Prix Demi-Pension:</label>
                <input type="text" id="priceDemiPension" name="priceDemiPension" value={hotelFormData.priceDemiPension} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="pricePensionComplete">Prix Pension Complète:</label>
                <input type="text" id="pricePensionComplete" name="pricePensionComplete" value={hotelFormData.pricePensionComplete} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="hotelImage">Image:</label>
                <input type="file" id="hotelImage" name="hotelImage" onChange={handleHotelImageChange} required />
              </div>
              <button type="submit" className="btn">Ajouter Hôtel</button>
            </form>
            {error && <p>{error}</p>}
          </section>
        )}

        {/* Car form section */}
        <div className="heading" style={{ background: "url(images/header-bg-3.png) no-repeat" }} onClick={toggleCarFormVisibility}>
          <h1>Ajouter une Voiture</h1>
        </div>
        {carFormVisible && (
          <section className="form">
            <form onSubmit={handleCarSubmit} className="car-form">
              <div className="form-group">
                <label htmlFor="nom">Nom de la Voiture:</label>
                <input type="text" id="nom" name="nom" value={carFormData.nom} onChange={handleCarChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="carburant">Carburant:</label>
                <select id="carburant" name="carburant" value={carFormData.carburant} onChange={handleCarChange} required>
                  <option value="">Sélectionnez le carburant</option>
                  <option value="diesel">Diesel</option>
                  <option value="essence">Essence</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="prix_jour">Prix par jour:</label>
                <input type="text" id="prix_jour" name="prix_jour" value={carFormData.prix_jour} onChange={handleCarChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="prix_mois">Prix par mois:</label>
                <input type="text" id="prix_mois" name="prix_mois" value={carFormData.prix_mois} onChange={handleCarChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={carFormData.description} onChange={handleCarChange} required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="categorie">Catégorie:</label>
                <select id="categorie" name="categorie" value={carFormData.categorie} onChange={handleCarChange} required>
                  <option value="">Sélectionnez la catégorie</option>
                  <option value="citadine">Citadine</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  {/* Add more categories as needed */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="carImage">Image:</label>
                <input type="file" id="carImage" name="carImage" onChange={handleCarImageChange} required />
              </div>
              <button type="submit" className="btn">Ajouter Voiture</button>
            </form>
            {error && <p>{error}</p>}
          </section>
        )}

        {/* Car disponibility section */}
        <section className="car-disponibility">
          <h2>Modifier la disponibilité de la voiture pour la date sélectionnée</h2>
          <p>Date sélectionnée: {selectedDate}</p>
          <div className="form-group">
            <label htmlFor="carDisponibility">Disponibilité:</label>
            <select id="carDisponibility" name="carDisponibility" value={carDisponibility} onChange={(e) => setCarDisponibility(e.target.value)}>
              <option value="">Sélectionnez la disponibilité</option>
              <option value="disponible">Disponible</option>
              <option value="non-disponible">Non disponible</option>
            </select>
          </div>
          <button onClick={handleDisponibilityChange} className="btn">Modifier Disponibilité</button>
          {error && <p>{error}</p>}
        </section>

      </div>
    </div>
  );
}

export default Dashboard;
