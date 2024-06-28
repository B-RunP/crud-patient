import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        "https://patient-api-three.vercel.app/patients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setPatients(response.data); // Set the patients data
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message); // Set error message
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Rumah Sakit Sehat Waras</h2>
      <h3>Data Pasien</h3>
      <table border="1">
        <tr>
          <th>Nomor</th>
          <th>Id Pasien</th>
          <th>Nama</th>
          <th>Jenis Kelamin</th>
          <th>Umur</th>
          <th>Alamat</th>
          <th>Diagnosis</th>
          <th>Perawatan</th>
          <th>Aksi</th>
        </tr>
        {patients.map((patient, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{patient.id}</td>
            <td>{patient.name}</td>
            <td>{patient.gender}</td>
            <td>{patient.age}</td>
            <td>{patient.address}</td>
            <td>{patient.diagnosis}</td>
            <td>{patient.treatment}</td>
            <td>
              <button>Ubah</button>
              <button>Hapus</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AdminPage;
