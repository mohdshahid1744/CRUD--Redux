import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Style/users.css'
import axiosInstance from "../../Utils/Axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwt"));

    if (!token) {
      navigate("/admin");
    } else {
      const fetchData = async () => {
        try {
          const res = await axiosInstance.get("admin/getuser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(res.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [navigate]);

  const handleDelete = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const res = await axiosInstance.delete(`admin/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.msg === "delete successfully") {
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
        setSearchResult(updatedUsers);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const res = await axiosInstance.post(
        "admin/searchuser",
        { name: search },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResult(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    axiosInstance.defaults.headers.common["Authorization"] = null;
    navigate("/admin");
  };

  return  (
    <div className="user-details-container">
      <h2>User Details</h2>
      <Link className="add-user-link" to={"/create"}>
        Add user
      </Link>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{marginRight:'5px'}}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {search && searchResults.length > 0
            ? searchResults.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link className="edit-link" to={`/update/${user._id}`}>
                      Edit
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link className="edit-link" to={`/update/${user._id}`}>
                      Edit
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;