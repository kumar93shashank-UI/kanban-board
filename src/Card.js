import React from "react";

//Icons
import { GoDotFill } from "react-icons/go";
import { FaExclamation } from "react-icons/fa6";

//Utils
import { getGroupIcons } from "./utils";

const Card = ({ ticket }) => {
  return (
    <div key={ticket.id} className="ticket">
      <div className="ticket-header-container">
        <div className="ticket-id">{ticket.id}</div>
        {getGroupIcons()}
      </div>
      <div>{ticket.title}</div>
      <div className="ticket-footer-container">
        <div className="exclamation-container">
          <FaExclamation />
        </div>
        <div className="ticket-tags-container">
          <div className="dots-container">
            <GoDotFill />
          </div>
          {ticket.tag[0]}
        </div>
      </div>
    </div>
  );
};
export default Card;
