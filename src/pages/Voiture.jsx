import React, { useState, useEffect } from 'react';
import { firestore } from './firebase'; // Import the initialized firestore from firebase.js
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { Link } from 'react-router-dom';

function Voiture() {
  const [error, setError] = useState(null);
  const [cars, setCars] = useState([]); // State to store the list of cars
  const [selectedCar, setSelectedCar] = useState({ nom: '', categorie: '' }); // State to store the selected car

  // Function to fetch the list of cars from Firestore
  const fetchCars = async () => {
    try {
      const carsCollection = collection(firestore, 'voitures');
      const carsSnapshot = await getDocs(carsCollection);
      const carsData = carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(carsData);
    } catch (error) {
      console.error('Error fetching cars: ', error);
      setError('Error fetching cars. Please try again later.');
    }
  };

  useEffect(() => {
    fetchCars(); // Fetch cars when the component mounts
  }, []);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Extract form data
    const formData = {
      nom: event.target.nom.value,
      email: event.target.email.value,
      Num: event.target.Num.value,
      lieu: event.target.lieu.value,
      type_v: event.target.type_v.value, // Use the selected car's category from form input
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

  // Function to handle selecting a car
  const handleCarSelect = (car) => {
    setSelectedCar(car); // Set the selected car
  };

  return (
    <div>
    
      <div className="heading" style={{ background: "url(images/header-bg-3.png) no-repeat" }}>
        <h1>Nos Voitures</h1>
      </div>

      {/* Cars section */}
      <section className="cars">
        {cars.map((car) => (
          <div key={car.id} className={`car ${car.disponibility === 'non-disponible' ? 'unavailable' : ''}`}>
            <h2>{car.nom}</h2>
            <p><strong>Catégorie:</strong> {car.categorie}</p>
            <p><strong>Prix par jour:</strong> {car.prix_jour}</p>
            <p><strong>Prix par mois:</strong> {car.prix_mois}</p>
            {car.imageUrl && <img src={car.imageUrl} alt={car.nom} />}
            <br></br>
            <br></br>
            <button onClick={() => handleCarSelect(car)}>Réserver</button>
          </div>
        ))}
      </section>

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
              <input type="text" name="type_v" value={selectedCar.categorie} readOnly />
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

    
    </div>
  );
}

export default Voiture;
