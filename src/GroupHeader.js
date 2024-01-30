import React from "react";

//Icons
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";

//Utils
import { getGroupIcons, getPriorityHeader } from "./utils";

const GroupHeader = ({ group, groupBy, groupTickets }) => {
  return (
    <div className="group-header">
      <div className="header-left">
        <div className="icons-container">{getGroupIcons(group)}</div>
        {console.log("groupBy", groupBy)}
        <div>{groupBy === "priority" ? getPriorityHeader(group) : group}</div>
        <div
          style={{
            color: "#aaa",
            fontSize: "16px",
          }}
        >
          {groupTickets.length}
        </div>
      </div>
      <div className="group-header-right">
        <div>
          <FaPlus />

          <HiDotsHorizontal />
        </div>
      </div>
    </div>
  );
};
export default GroupHeader;
