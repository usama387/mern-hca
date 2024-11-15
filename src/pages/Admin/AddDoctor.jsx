import { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {


  // state variables to hold and update data when data is from is filled by user and input fields change
  const [docImg, setDocImg] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [experience, setExperience] = useState("1 Year");

  const [fees, setFees] = useState("");

  const [about, setAbout] = useState("");

  const [speciality, setSpeciality] = useState("General Physician");

  const [degree, setDegree] = useState("");

  const [address1, setAddress1] = useState("");

  const [address2, setAddress2] = useState("");

  const { backendUrl, atoken } = useContext(AdminContext);

  // on submit function
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image is required");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("email", email);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // console.log form data
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setSpeciality("General Physician");
        setExperience("1 year");
        setFees("");
        setAbout("");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="m-5 w-full p-2" onSubmit={onSubmitHandler}>
      <p className="mb-3 text-lg font-medium bg-green-200 text-gray-500 w-max px-4 py-2 rounded-md">
        New Doctor
      </p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* Image Upload Logic */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-image">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="doc-image"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <p className="bg-green-200 text-gray-500 w-max px-4 py-2 rounded-md font-medium">
            Upload an image
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-500 font-medium">Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                required
                className="border rounded px-3 py-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-500 font-medium">Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                required
                className="border rounded px-3 py-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-500 font-medium">Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                required
                className="border rounded px-3 py-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-500 font-medium">Doctor Experience</p>
              <select
                name=""
                id=""
                className="border rounded px-3 py-2"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              >
                <option value="1 Year">1 Year</option>
                <option value="1 Year">2 Year</option>
                <option value="1 Year">3 Year</option>
                <option value="1 Year">4 Year</option>
                <option value="1 Year">5 Year</option>
                <option value="1 Year">6 Year</option>
                <option value="1 Year">7 Year</option>
                <option value="1 Year">8 Year</option>
                <option value="1 Year">9 Year</option>
                <option value="1 Year">10 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-500 font-medium">Fee</p>
              <input
                type="number"
                placeholder="Fee"
                required
                className="border rounded px-3 py-2"
                onChange={(e) => setFees(e.target.value)}
                value={fees}
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-500 font-medium">Specialty</p>
              <select
                name=""
                id=""
                className="border rounded px-3 py-2"
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-500 font-medium">Education</p>
              <input
                type="text"
                placeholder="Education"
                required
                className="border rounded px-3 py-2"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-500 font-medium">Address</p>
              <input
                type="text"
                placeholder="address 1"
                required
                className="border rounded px-3 py-2"
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
              />
              <input
                type="text"
                placeholder="address 2"
                required
                className="border rounded px-3 py-2"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2 text-gray-500 font-medium">About Doctor</p>
          <textarea
            placeholder="write about doctor"
            required
            rows={5}
            className="w-full px-4 pt-2 border rounded"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-300 px-10 py-3 mt-4 rounded-full text-gray-600 text-base font-medium"
        >
          Add Now
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
