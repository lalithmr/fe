import { useEffect, useState } from "react";
import { deleteRegistration, getRegistrations } from "../services/api";

function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchData() {
    try {
      setLoading(true);
      setError("");
      const registrations = await getRegistrations();
      setData(registrations);
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load registrations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this registration?");
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteRegistration(id);
      fetchData();
    } catch (deleteError) {
      alert(deleteError.message || "Unable to delete registration.");
    }
  }

  return (
    <section className="section">
      <div className="section__header">
        <span className="section-kicker">Admin</span>
        <h2>Registration Dashboard</h2>
        <p>Review and manage camp registrations from one place.</p>
      </div>

      <div className="form-card admin-card">
        {loading ? <p>Loading registrations...</p> : null}
        {error ? <p className="form-error">{error}</p> : null}

        {!loading && !error ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Parent</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Level</th>
                  <th>Batch</th>
                  <th>Has Set</th>
                  <th>Need Set</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.studentName}</td>
                    <td>{item.age}</td>
                    <td>{item.parentName}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.level}</td>
                    <td>{item.batch}</td>
                    <td>{item.hasChessSet}</td>
                    <td>{item.needsPremiumChessSet}</td>
                    <td>
                      <button
                        type="button"
                        className="admin-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Admin;
