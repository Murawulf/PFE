import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // Added missing icon imports
import aboutImage from './images/about-img.jpg';
import slide1Image from './images/home-slide-1.jpg';
import Voy1 from './images/voy1.jpg';
import Voy2 from './images/voy2.jpg';
import Voy3 from './images/voy3.jpg';
import Hotel1 from './images/hotel1.jpg';
import Hotel2 from './images/hotel2.jpg';
import Hotel3 from './images/hotel3.jpg';
import slide2Image from './images/home-slide-2.jpg';
import slide3Image from './images/home-slide-3.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


function SmallSuperPromo() {
  const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1, // Show all images at once
  slidesToScroll: 1, // Scroll one image at a time
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  nextArrow: <FontAwesomeIcon icon={faChevronRight} />,
  prevArrow: <FontAwesomeIcon icon={faChevronLeft} />
};

}

function Home() {
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const name = location.state?.name;

  useEffect(() => {
    // Retrieve user data from session storage
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Initialize Swiper
    new Swiper('.home-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }, []);

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const handleLogout = () => {
    // Clear user data from session storage
    sessionStorage.removeItem('userData');
    // Reload the page
    window.location.reload();
  };

  const renderProfileDropdownContent = () => {
    if (user) {
      return (
        <>
          <Link to={`/profile/${name}`}>Modifier Profile</Link>
          <a href="#" onClick={handleLogout}>Déconnexion</a>
        </>
      );
    } else {
      return (
        <Link to="/auth">Se connecter</Link>
      );
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 50,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };


  const hotelLocations = [
    "Ain Drahem",
    "Bizerte",
    "Djerba",
    "Douz",
    "Gabes",
    "Gafsa",
    "Hammamet",
    "Kairouan",
    "Kasserine",
    "Kelibia",
    "Kerkennah",
    "Korba",
    "Korbous",
    "Le Kef",
    "Mahdia",
    "Monastir",
    "Nabeul",
    "Nefta",
    "Sbeitla",
    "Sfax",
    "Sidi Bouzid",
    "Sousse",
    "Tabarka",
    "Tozeur",
    "Tunis",
    "Zaghouan"
  ];
  

  return (
    <div>
      <section className="header1">
        <Link to="/home" className="logo">Wanderlux-travel.tn</Link>
        <navbar>
          <Link to="/comite" className="logo1">Associations & Entreprises</Link>
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          <Link to="/groupe" className="logo1">Amicales & Groupes</Link>
        </navbar>

        <div className="profile-dropdown">
          <div className="profile-icon" onClick={toggleProfileDropdown}>
            <FontAwesomeIcon icon={faUser} />
            {user && <span>&nbsp;&nbsp;{name}</span>}
          </div>
          {profileDropdownVisible && (
            <div className="dropdown-content">
              {renderProfileDropdownContent()}
            </div>
          )}
        </div>
      </section>

      <section className="header">
        <nav className="navbar">
          <a href="/home">Acceuil</a>
          <div className="dropdown">
            &nbsp;&nbsp; &nbsp;&nbsp;
            <button className="dropbtn">Hotels En Tunisie</button>
            <div className="dropdown-content">
              {hotelLocations.map(location => (
                <Link key={location} to={`/hotel?location=${location}`}>{location}</Link>
              ))}
            </div>
          </div>
          <a href="/reservation">Voyage</a>
          <a href="/omra">Omra</a>
          <a href="/reservation">Circuit & Excursions</a>
          <a href="/voiture">Voiture</a>
          <a href="/reservation">Super Promo</a>
          <Link to="/about">Contact</Link>
        </nav>
        <div id="menu-btn" className="fas fa-bars"></div>
      </section>

      {/* Search Box */}
     <section className="search-box">
  <form>
    <div className="input-group">
      <span className="icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
      <label>Destination</label>
      <input type="text" placeholder="Destination" />
    </div>
    <div className="input-group">
      <span className="icon"><FontAwesomeIcon icon={faCalendarAlt} /></span>
      <label>Arrivée</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="date" placeholder="Arrivée" />
    </div>
    <div className="input-group">
      <span className="icon"><FontAwesomeIcon icon={faCalendarAlt} /></span>
      <label>Départ</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="date" placeholder="Départ" />
    </div>
    <div className="input-group">
      <label>Chambres</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <select>
        {[...Array(10).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>{num + 1}</option>
        ))}
      </select>
      <label>Adultes</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <select>
        {[...Array(10).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>{num + 1}</option>
        ))}
      </select>
      <label>Enfants</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <select>
        {[...Array(10).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>{num + 1}</option>
        ))}
      </select>
    </div>
    <button type="submit">Rechercher</button>
  </form>
</section>


      
      <section className="super-promo">
        <Slider {...settings}>
          <div>
            <img src={slide1Image} alt="Slide 1" />
          </div>
          <div>
            <img src={slide2Image} alt="Slide 2" />
          </div>
          <div>
            <img src={slide3Image} alt="Slide 3" />
          </div>
          {/* Add more slides as needed */}
        </Slider>
        <div className="promo-content">
        <h2>explorer, découvrir, voyager</h2>
                <h3>Découvrez de nouveaux endroits</h3>      
        </div>
      </section>

      <div className="small-super-promo">
      <div className="promo-content">
        <h3>VOYAGES ORGANISÉS</h3>
        <p>Trouvez les meilleures destinations avec nos idées de voyage !</p>
      </div>
      <Slider {...settings}>
        <div>
          <img src={Voy1} alt="Slide 1" />
        </div>
        <div>
          <img src={Voy2} alt="Slide 2" />
        </div>
        <div>
          <img src={Voy3} alt="Slide 3" />
        </div>
      </Slider>
    </div>
    <div className="small-super-promo2">
      <div className="promo-content">
        <h3>HOTELS EN TUNISIE</h3>
        <p>Trouvez les meilleures promotions du moment</p>
      </div>
      <Slider {...settings}>
        <div>
          <img src={Hotel1} alt="hotel1" />
        </div>
        <div>
          <img src={Hotel2} alt="Slide 2" />
        </div>
        <div>
          <img src={Hotel3} alt="Slide 3" />
        </div>
      </Slider>
    </div>
      <section className="home-about">
        <div className="image">
          <img src={aboutImage} alt=""/>
        </div>
        <div className="content">
          <h3>À propos de nous</h3>
          <p>Chez Wanderlux, nous croyons que chaque voyage est une opportunité de créer des souvenirs durables et de vivre des expériences uniques. Que vous souhaitiez explorer les sites historiques fascinants, vous détendre sur les magnifiques plages méditerranéennes, ou découvrir les trésors cachés de nos régions pittoresques, nous sommes là pour vous aider à réaliser vos rêves de voyage.</p>
          <Link to="about" className="btn">en savoir plus</Link>
        </div>
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

export default Home;
