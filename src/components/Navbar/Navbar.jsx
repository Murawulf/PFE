import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

export const NavbarLinks = [
  {
    name: "Acceuil",
    link: "/",
  },
  {
    name: "Hotels En Tunisie",
    link: "/Hotel", // Updated the link to point to the subdomain
    dropdown: true,
    sublinks: [
      "Ain Drahem", "Bizerte", "Djerba", "Douz", "Gabes", "Gafsa", "Hammamet", "Kairouan",
      "Kasserine", "Kelibia", "Kerkennah", "Korba", "Korbous", "Le Kef", "Mahdia", "Monastir",
      "Nabeul", "Nefta", "Sbeitla", "Sfax", "Sidi Bouzid", "Sousse", "Tabarka", "Tozeur",
      "Tunis", "Zaghouan", "Zarzis",
    ],
  },  
  {
    name: "Voyages Organisés",
    link: "/Voyage",
    dropdown: true,
    sublinks: [
      "Turquie", "Dubai", "Maroc", "Egypte",  
      "Nos Croisières", "Nos Voyages En Turquie", "Nos Voyages Sans Visa", 
      "Nos Voyages En Egypte", "Nos Voyages Au Maroc", "Nos Voyages À Petit Prix", 
      "Nos Voyages De Luxe", "Nos Voyages En Afrique Du Sud",
    ],
  },
  {
    name: "Omra",
    link: "/omra",
  },
  {
    name: "Circuit & Excursions",
    link: "/circuits",
  },
  {
    name: "Voiture",
    link: "/Voiture",
  },
  {
    name: "Super Promo",
    link: "/promo",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm text-black shadow-md">
        <div className="bg-gradient-to-r from-primary to-secondary text-white ">
          <div className="container py-[2px] sm:block hidden">
            <div className="flex items-center justify-between">
              <p className="text-sm">remise de 20 % sur votre prochaine réservation !</p>
              <p>Numero Tel. +91 123456789</p>
            </div>
          </div>
        </div>
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4  font-bold text-2xl">
              <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                Wanderlux-travel.tn
              </Link>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-6 ">
                {NavbarLinks.map((link) => (
                  <li key={link.name} className="py-4">
                    {link.dropdown ? (
                      // Render dropdown with sublinks
                      <div className="group relative cursor-pointer">
                        <a href={link.link} className="flex items-center gap-[2px]">
                          {link.name}{" "}
                          <span>
                            <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                          </span>
                        </a>
                        <div className={`absolute ${link.name === "Voyages Organisés" ? "-left-9" : "-left-0"} z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md`} style={{ width: "400px", minWidth: "300px" }}>
                          {link.name === "Voyages Organisés" ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-semibold mb-2">Voyages En Groupe</p>
                                {link.sublinks.slice(0, 6).map((sublink, index) => (
                                  <a
                                    key={index}
                                    href={`${link.link}/${sublink.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="p-2 hover:bg-primary/20 block"
                                    style={{ padding: "8px" }} // Add padding for spacing
                                  >
                                    {sublink}
                                  </a>
                                ))}
                              </div>
                              <div>
                                <p className="font-semibold mb-2">Voyages À La Carte</p>
                                {link.sublinks.slice(6).map((sublink, index) => (
                                  <a
                                    key={index}
                                    href={`${link.link}/${sublink.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="p-2 hover:bg-primary/20 block"
                                    style={{ padding: "8px" }} // Add padding for spacing
                                  >
                                    {sublink}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ) : (
                            // Render regular link
                            <div className="grid grid-cols-3 gap-4">
                              {link.sublinks.map((sublink, index) => (
                                <a
                                  key={index}
                                  href={`${link.link}/${sublink.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="p-2 hover:bg-primary/20 block"
                                  style={{ padding: "8px" }} // Add padding for spacing
                                >
                                  {sublink}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Render regular link
                      <NavLink to={link.link} activeClassName="active">
                        {link.name}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full"
                onClick={handleOrderPopup}
              >
                S'authentifier
              </button>
              <div className="md:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className=" cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  );
};

export default Navbar;
