// import React, { useEffect, useState } from "react";
// import "./App.css";

// const API = "https://sweet-light-production.up.railway.app/api/viewUser/";

// function App() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Form state for Add / Edit
//   const [form, setForm] = useState({ id: "", name: "", address: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchUsers();
//     // eslint-disable-next-line
//   }, []);

//   async function fetchUsers() {
//     setLoading(true);
//     try {
//       const res = await fetch(API);
//       const users = await res.json();
//       setData(users);
//     } catch (err) {
//       setMessage("Failed to fetch users.");
//     }
//     setLoading(false);
//   }

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!form.id || !form.name || !form.address) {
//       setMessage("Please enter all data.");
//       return;
//     }
//     if (editingId) {
//       // Update
//       try {
//         await fetch(`${API}${editingId}/`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(form),
//         });
//         setMessage("User updated!");
//       } catch (err) {
//         setMessage("Failed to update user.");
//       }
//     } else {
//       // Create
//       try {
//         await fetch(API, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(form),
//         });
//         setMessage("User added!");
//       } catch (err) {
//         setMessage("Failed to add user.");
//       }
//     }
//     setForm({ id: "", name: "", address: "" });
//     setEditingId(null);
//     fetchUsers();
//   }

//   function handleEdit(item) {
//     setForm({ id: item.id, name: item.name, address: item.address });
//     setEditingId(item.id);
//     setMessage("");
//   }

//   function handleCancelEdit() {
//     setForm({ id: "", name: "", address: "" });
//     setEditingId(null);
//     setMessage("");
//   }

//   async function handleDelete(id) {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await fetch(`${API}${id}/`, { method: "DELETE" });
//       setMessage("User deleted!");
//       fetchUsers();
//     } catch (err) {
//       setMessage("Failed to delete user.");
//     }
//   }

//   return (
//     <div className="classic-container">
//       <h2>User Management</h2>
//       <div className="classic-card">
//         <form className="classic-form" onSubmit={handleSubmit}>
//           <label>
//             ID:
//             <input
//               type="number"
//               name="id"
//               placeholder="Id"
//               value={form.id}
//               onChange={handleChange}
//               disabled={editingId !== null}
//             />
//           </label>
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={form.name}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Address:
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={form.address}
//               onChange={handleChange}
//             />
//           </label>
//           <div className="form-btns">
//             <button type="submit" className="classic-btn">
//               {editingId ? "Update" : "Add"}
//             </button>
//             {editingId && (
//               <button type="button" onClick={handleCancelEdit} className="classic-btn cancel-btn">
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//         {message && <div className="classic-msg">{message}</div>}
//       </div>

//       <div className="classic-table-container">
//         {loading ? (
//           <p style={{ textAlign: "center" }}>Loading...</p>
//         ) : data.length === 0 ? (
//           <p style={{ textAlign: "center" }}>No users found.</p>
//         ) : (
//           <table className="classic-table">
//             <thead>
//               <tr>
//                 <th style={{ width: 70 }}>ID</th>
//                 <th style={{ width: 160 }}>Name</th>
//                 <th>Address</th>
//                 <th style={{ width: 150 }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 <tr key={item.id}>
//                   <td>{item.id}</td>
//                   <td>{item.name}</td>
//                   <td>{item.address}</td>
//                   <td>
//                     <button onClick={() => handleEdit(item)} className="classic-table-btn">
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item.id)}
//                       className="classic-table-btn delete-btn"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <div style={{textAlign: "center", marginTop: 18, color: "#888", fontSize: 13}}>
//         © Classic CRUD UI example
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://demoproject-19nd.onrender.com/api/viewUser/";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: "", name: "", address: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API);
      setData(response.data);
    } catch (error) {
      setMessage("Failed to fetch users.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id || !form.name || !form.address) {
      setMessage("Please enter all data.");
      return;
    }

    try {
      if (editingId) {
        // Update
        await axios.put(`${API}${editingId}/`, form);
        setMessage("User updated successfully!");
      } else {
        // Create
        await axios.post(API, form);
        setMessage("User added successfully!");
      }

      setForm({ id: "", name: "", address: "" });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      setMessage("Failed to save user.");
    }
  };

  const handleEdit = (user) => {
    setForm({ id: user.id, name: user.name, address: user.address });
    setEditingId(user.id);
    setMessage("");
  };

  const handleCancelEdit = () => {
    setForm({ id: "", name: "", address: "" });
    setEditingId(null);
    setMessage("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}${id}/`);
      setMessage("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      setMessage("Failed to delete user.");
    }
  };

  return (
    <div className="classic-container">
      <h2>User Management</h2>

      <div className="classic-card">
        <form className="classic-form" onSubmit={handleSubmit}>
          <label>
            ID:
            <input
              type="number"
              name="id"
              value={form.id}
              placeholder="ID"
              onChange={handleChange}
              disabled={editingId !== null}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Name"
              onChange={handleChange}
            />
          </label>

          <label>
            Address:
            <input
              type="text"
              name="address"
              value={form.address}
              placeholder="Address"
              onChange={handleChange}
            />
          </label>

          <div className="form-btns">
            <button type="submit" className="classic-btn">
              {editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} className="classic-btn cancel-btn">
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && <div className="classic-msg">{message}</div>}
      </div>

      <div className="classic-table-container">
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : data.length === 0 ? (
          <p style={{ textAlign: "center" }}>No users found.</p>
        ) : (
          <table className="classic-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.address}</td>
                  <td>
                    <button className="classic-table-btn" onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button
                      className="classic-table-btn delete-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;