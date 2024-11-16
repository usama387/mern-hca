import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="bg-green-200 text-gray-500 px-3 py-1 rounded-md font-medium w-max text-lg">
        All Doctors
      </h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
          >
            <img
              src={item.image}
              alt="doctor"
              className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
            />

            <div className="p-2 flex flex-col gap-2">
              <p className="bg-blue-200 text-gray-500 rounded-md px-2 py-1 w-max font-medium">
                {item.name}
              </p>
              <p className="bg-primary text-white rounded-md px-2 py-1 w-max font-medium">
                {item.speciality}
              </p>

              <div className="mt-2 flex items-center gap-1 text-sm">
                {/* changeAvailability id an arrow function in AdminContext with post api method that accepts docId which is here item.id to change the availability of doctor */}
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item.id)}
                  className="cursor-pointer"
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
