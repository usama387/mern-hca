import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { atoken, appointments, getAllAppointments, cancelAppointmentAsAdmin } =
    useContext(AdminContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  return (
    <div className="w-full max-w-6xl m-5 bg-blue-100 p-4 rounded-md">
      <p className="mb-3 text-lg font-medium bg-blue-300 text-gray-800 px-2 py-1 w-max rounded-md">
        Booked Appointments
      </p>
      <div className="rounded text-base font-semibold text-gray-500 max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>Sr.</p>
          <p>Patient:</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt=""
                className="w-8 rounded-full"
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                src={item.docData.image}
                alt=""
                className="w-8 rounded-full bg-gray-200"
              />
              <p>{item.docData.name}</p>
            </div>
            <p className="flex items-center gap-2">
              <span>{item.amount}</span>
              <span>{currency}</span>
            </p>
            {item.cancelled === true ? (
              <p className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer">
                Cancelled
              </p>
            ) : (
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer"
                onClick={() => cancelAppointmentAsAdmin(item.id)}
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
