import React from 'react';


function Reservation() {
  // Retrieve destination from the URL
  const destination = new URLSearchParams(window.location.search).get('title') || '';

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
      <div className="heading" style={{ background: "url(images/header-bg-3.png) no-repeat" }}>
        <h1>Réserver</h1>
      </div>

      {/* Booking section */}
      <section className="booking">
        <h1 className="heading-title">Réserver maintenant!</h1>

        <form action="book_form.php" method="post" className="book-form">
          <div className="flex">
            <div className="inputBox">
              <span>name :</span>
              <input type="text" placeholder="entrer Votre Nom" name="name" />
            </div>
            <div className="inputBox">
              <span>email :</span>
              <input type="email" placeholder="entrer Votre  email" name="email" />
            </div>
            <div className="inputBox">
              <span>phone :</span>
              <input type="number" placeholder="entrer Votre numero" name="phone" />
            </div>
            <div className="inputBox">
              <span>address :</span>
              <input type="text" placeholder="entrer Votre addresse" name="address" />
            </div>
            <div className="inputBox">
              <span>how many :</span>
              <input type="number" placeholder="numero d'invité" name="guests" />
            </div>
            
            <input type="hidden" name="price" value={new URLSearchParams(window.location.search).get('price') || ''} />
            <div className="inputBox">
              <span>Départ :</span>
              <input type="date" name="arrivals" />
            </div>
            <div className="inputBox">
              <span> Arrivé</span>
              <input type="date" name="leaving" />
            </div>
          </div>

          <input type="submit" value="submit" className="btn" name="send" />
        </form>
      </section>

      {/* Footer section */}
      <section className="footer">
        <div className="box-container">
          <div className="box">
            <h3>quick links</h3>
            <a href="/home"> <i className="fas fa-angle-right"></i> home</a>
            <a href="/about"> <i className="fas fa-angle-right"></i> about</a>
            <a href="/auth"> <i className="fas fa-angle-right"></i> Authentifier</a>
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

export default Reservation;
