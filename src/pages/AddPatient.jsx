import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddPatient = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("laki-laki");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://patient-api-three.vercel.app/patients",
        {
          name,
          gender,
          age,
          address,
          diagnosis,
          treatment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/admin");
    } catch (error) {
      console.error("Error adding data : ", error);
    }
  };

  return (
    <div>
      <Link to="/admin">Kembali</Link>
      <h2>Tambah Data Pasien</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nama : </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender : </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="laki-laki">Laki - laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
        </div>
        <div>
          <label htmlFor="age">Umur : </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="address">Alamat : </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="diagnosis">Diagnosis : </label>
          <input
            type="text"
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="treatment">Perawatan : </label>
          <input
            type="text"
            id="treatment"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          />
        </div>
        <button type="submit">Tambah</button>
      </form>
    </div>
  );
};

export default AddPatient;
