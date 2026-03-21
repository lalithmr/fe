import { useEffect, useState } from "react";

function AdminDashboard() {
const [data, setData] = useState([]);
const [search, setSearch] = useState("");

const API = import.meta.env.VITE_API_URL;

useEffect(() => {
fetch(`${API}/api/registrations`)
.then(res => res.json())
.then(setData)
.catch(err => console.error(err));
}, []);

const deleteUser = async (id) => {
await fetch(`${API}/api/registrations/${id}`, {
method: "DELETE",
});

```
setData(data.filter(item => item.id !== id));
```

};

const filtered = data.filter(item =>
item.studentName?.toLowerCase().includes(search.toLowerCase())
);

return ( <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-6">


  <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

  <input
    placeholder="Search student..."
    className="mb-4 p-2 rounded bg-gray-800 w-full"
    onChange={(e) => setSearch(e.target.value)}
  />

  <div className="overflow-auto rounded-xl shadow-lg">
    <table className="w-full text-left">
      <thead className="bg-gray-800">
        <tr>
          <th className="p-3">Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Level</th>
          <th>Batch</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {filtered.map(item => (
          <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800">
            <td className="p-3">{item.studentName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.level}</td>
            <td>{item.batch}</td>
            <td>
              <button
                onClick={() => deleteUser(item.id)}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>

</div>


);
}

export default AdminDashboard;
