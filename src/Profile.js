import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './firebase';

function Profile() {
  const [userData, setUserData] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = firestore.collection('users').doc(name);
        const doc = await userRef.get();
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [name]);

  // Rendering user data conditionally
  return (
    <div>
      <h1>User Profile</h1>
      {userData ? (
        <>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Add other user data here */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
