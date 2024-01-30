import React, { useState, useEffect } from "react";
import Axios from "axios";

//Icons
import { TbListDetails } from "react-icons/tb";

//Components
import Card from "./Card";
import GroupHeader from "./GroupHeader";

//Styles
import "./styles.css";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(
    sessionStorage.getItem("groupBy") || "status"
  );
  const [sortBy, setSortBy] = useState(
    sessionStorage.getItem("sortBy") || "priority"
  );
  const [showDetailsDropdown, setDetailsDropdown] = useState(
    sessionStorage.getItem("groupBy") || sessionStorage.getItem("sortBy")
      ? true
      : false
  );

  useEffect(() => {
    // Fetch data from the provided API
    Axios.get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => {
        setTickets(res.data.tickets);
        setUsers(res.data.users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const groupAndSortTickets = () => {
    let groupedTickets = {};

    // Grouping tickets based on the selected grouping option
    if (groupBy === "status") {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const status = ticket.status;
        acc[status] = [...(acc[status] || []), ticket];
        return acc;
      }, {});
    } else if (groupBy === "user") {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const user = users.find((u) => u.id === ticket.userId) || {
          name: "NA",
        };
        acc[user.name] = [...(acc[user.name] || []), ticket];
        return acc;
      }, {});
    } else if (groupBy === "priority") {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const priority = ticket.priority;
        acc[priority] = [...(acc[priority] || []), ticket];
        return acc;
      }, {});
    }
    // Sorting tickets based on the selected sorting option
    for (const group in groupedTickets) {
      groupedTickets[group] = groupedTickets[group].sort((a, b) => {
        if (sortBy === "priority") {
          return b.priority - a.priority;
        } else if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }
    return groupedTickets;
  };

  const handleDropDownSelect = (e, parameter) => {
    if (parameter === "groupBy") {
      setGroupBy(e.target.value);
      sessionStorage.setItem("groupBy", e.target.value);
    } else if (parameter === "sortBy") {
      setSortBy(e.target.value);
      sessionStorage.setItem("sortBy", e.target.value);
    }
  };
  const groupedAndSortedTickets = groupAndSortTickets();

  return (
    <div className="kanban-board">
      {/* Header */}
      <div>
        <button onClick={() => setDetailsDropdown(!showDetailsDropdown)}>
          <div className="detailsButtonText">
            <TbListDetails />
            Details
          </div>
        </button>
      </div>
      {showDetailsDropdown && (
        <div className="container">
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="groupingLabel" htmlFor="groupBy">
                Grouping:
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="orderingLabel" htmlFor="sortBy">
                Ordering:
              </label>
            </div>
          </div>

          <div>
            <div>
              <select
                value={groupBy}
                onChange={(e) => handleDropDownSelect(e, "groupBy")}
              >
                <option value="status">By Status</option>
                <option value="user">By User</option>
                <option value="priority">By Priority</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => handleDropDownSelect(e, "sortBy")}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <div className="kanban">
        {Object.entries(groupedAndSortedTickets).map(
          ([group, groupTickets]) => {
            return (
              <div key={group} className="column">
                <GroupHeader
                  group={group}
                  groupBy={groupBy}
                  groupTickets={groupTickets}
                />
                {groupTickets.map((ticket) => {
                  return <Card ticket={ticket} />;
                })}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
