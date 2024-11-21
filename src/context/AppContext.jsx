import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // function to calculate patient age using its dob
  const calculateAge = (dob) => {
    const today = new Date();
    const birthdate = new Date(dob);

    let age = today.getFullYear() - birthdate.getFullYear();

    return age;
  };

  // slot date format function
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const currency = "PKR";

  // this object contains data to be accessed and passing it as prop in provider
  const value = {
    calculateAge,
    slotDateFormat,
    currency,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
