import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/Axios";
import axios from "axios";

function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`admin/getuser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data.data;
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(phone.trim())) {
      setPhoneError("Invalid phone number");
      isValid = false;
    } else {
      setPhoneError("");
    }

    return isValid;
  };

  const handleUpdate = async () => {
    if (validateForm()) {
      const token = JSON.parse(localStorage.getItem("jwt"));

      try {
        const response = await axios.put(
          `http://localhost:3001/admin/updateuser/${id}`,
          {
            name,
            email,
            phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/users");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update User</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <div className="text-danger">{nameError}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="text-danger">{emailError}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneError && <div className="text-danger">{phoneError}</div>}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
