import { LiaCircle } from "react-icons/lia";
import { TbProgress } from "react-icons/tb";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

export const getPriorityHeader = (priority) => {
  switch (priority) {
    case "0":
      return "No Priority";
    case "1":
      return "Low";
    case "2":
      return "Medium";
    case "3":
      return "High";
    case "4":
      return "Urgent";
  }
};
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getGroupIcons = (value) => {
  switch (value) {
    case "Todo":
      return <LiaCircle color="#aaa" size="16" />;
    case "In progress":
      return <TbProgress color="red" size="16" />;
    case "Backlog":
      return <MdOutlinePendingActions color="orange" size="16" />;
    default:
      const randomColor = getRandomColor();
      return <FaUserCircle color={randomColor} />;
  }
};
