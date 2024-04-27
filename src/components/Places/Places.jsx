import React from "react";
import PlaceCard from "./PlaceCard";
import Img1 from "../../assets/places/boat.jpg";
import Img2 from "../../assets/places/tajmahal.jpg";
import Img3 from "../../assets/places/water.jpg";
import Img4 from "../../assets/places/place4.jpg";
import Img5 from "../../assets/places/place5.jpg";
import Img6 from "../../assets/places/place6.jpg";

const PlacesData = [
  {
    img: Img1,
    title: "Borocay",
    location: "Philipinnes",
    description: "une île tropicale des Philippines connue pour ses plages de sable blanc et ses stations balnéaires animées.",
    price: 5400,
    type: "Détente Culturelle",
  },
  {
    img: Img2,
    title: "Taj Mahal",
    location: "Inde",
    description:
      "Le Taj Mahal est un mausolée en marbre blanc situé sur la rive sud de la rivière Yamuna dans la ville indienne d'Agra.",
    price: 4900,
    type: "Détente Culturelle",
  },
  {
    img: Img3,
    title: "Bali",
    location: "Indonésie",
    description:
      "Bali, en Indonésie, est réputée pour ses plages de sable fin, ses paysages verdoyants et sa culture riche.",
    price: 4500,
    type: "Détente Culturelle",
  },
  {
    img: Img4,
    title: "Sydney",
    location: "Australia",
    description: "Sydney est la plus grande ville d'Australie, célèbre pour son emblématique opéra et ses plages .",
    price: 3500,
    type: "Détente Culturelle",
  },
  {
    img: Img5,
    title: "Los Angeles",
    location: "États-Unis",
    description:
      "Los Angeles, souvent désignée comme la Cité des Anges, est une métropole dynamique située en Californie.",
    price: 6700,
    type: "Détente Culturelle",
  },
  {
    img: Img6,
    title: "Las Vegas",
    location: "Californie",
    description:
      "Las Vegas est une ville célèbre pour ses casinos, et sa vie nocturne animée. Surnommée Sin City.",
    price: 6100,
    type: "Détente Culturelle",
  },
];

const Places = ({ handleOrderPopup }) => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Meilleurs Endroits à Visiter
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PlacesData.map((item, index) => (
              <PlaceCard
                handleOrderPopup={handleOrderPopup}
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Places;
