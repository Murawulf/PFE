import React, { useState, useEffect } from 'react';
import { app, googleProvider } from './firebase'; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore'; 
import './App.css'; // Updated CSS file path
import { Link, useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const auth = getAuth(app); 
const db = getFirestore(app); 

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // State to hold logged-in user
  const [isSignUp, setIsSignUp] = useState(true); // State to manage sign up/login toggle
  const navigate = useNavigate(); // Use the useNavigate hook to navigate programmatically

  // Check if user is logged in on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Pass the user to the parent component
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(collection(db, 'users'), user.uid), {
        name: name,
        email: email,
        role: role
      });
      window.alert('Signup successful!');
      setUser(user); // Update user state after successful signup
      navigate('/home', { state: { displayName: user.displayName } });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Fetch user data from the database based on the user's UID
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        // Get the user's name from the database document
        const userName = userDoc.data().name;
        setUser(user);
        // Store user data in session storage
        sessionStorage.setItem('userData', JSON.stringify(user));
        // Redirect to home page with the user's name passed as state
        navigate('/home', { state: { name: userName } });
      } else {
        console.error('User data not found.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // Check if the user exists in the database
      const userDoc = await getDoc(doc(db, 'users', user.uid));
  
      // If the user doesn't exist, create a new document in the users collection
      if (!userDoc.exists()) {
        await setDoc(doc(collection(db, 'users'), user.uid), {
          name: user.displayName,
          email: user.email,
          role: 'user' // Assuming the default role is 'user'
        });
      }
  
      // Fetch additional user data from the database
      const userData = userDoc.exists() ? userDoc.data() : null;
  
      // Update user state with the fetched user object
      setUser(user);
  
      // Pass the user data as state when navigating to home
      navigate('/home', { state: { userData: userData } });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setUser(null); // Update user state to null
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <header className="header">
        <a href="/home" className="logo">Wanderlux.tn.</a>
        <nav className="navbar">
          <a href="/home">acceuil</a>
          <Link to="/about">À propos</Link>
          <Link to="/package">Forfait</Link>
          <Link to="/reservation">Réserver</Link>
          {user && ( // Render user information if user is logged in
            <div className="profile-icon" onClick={handleLogout}>
              <FontAwesomeIcon icon={faUser} /> {/* Icon for user profile */}
              <span>{user.displayName}</span> {/* User's name */}
            </div>
          )}
        </nav>
        <div id="menu-btn" className="fas fa-bars"></div>
      </header>

      <div className="auth-container">
        <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
        {isSignUp ? (
          <form onSubmit={handleSignup}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign Up</button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
          </form>
        )}

        <div className="auth-toggle">
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
          </button>
        </div>

        <div className="google-signin">
          <button onClick={handleGoogleSignIn}>
            Sign Up with Google
          </button>
        </div>

        {error && <p>{error}</p>}
      </div>

      <footer className="footer">
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
      </footer>
    </div>
  );
};

export default Auth;
