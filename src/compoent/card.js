import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./card.css";

const Card = ({ name, item, HandleSelectCard, id }) => {
  return (
    <div
      className="card"
      key={id}
      onClick={(e) => {
        let value = item;
        HandleSelectCard(value);
      }}
    >
      <div className="CardBody">
        <div>{name}</div>
        <div className="subTitle">1 units</div>
      </div>
    </div>
  );
};

export default Card;
