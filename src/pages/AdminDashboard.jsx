import { useEffect, useMemo, useState } from "react";
import { deleteRegistration, getRegistrations } from "../services/api";

const ADMIN_SESSION_KEY = "chesscamp-admin-session";
const ADMIN_USER_ID = import.meta.env.VITE_ADMIN_USER_ID || "admin";
const ADMIN_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD || "ChessIQ@2026";

function getStoredSession() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(ADMIN_SESSION_KEY) === "active";
}

function formatTimestamp(value) {
  if (!value) {
    return "Not synced yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredSession);
  const [credentials, setCredentials] = useState({
    userId: "",
    password: "",
  });
  const [authError, setAuthError] = useState("");

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [batchFilter, setBatchFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [lastUpdated, setLastUpdated] = useState(null);

  async function loadRegistrations() {
    try {
      setLoading(true);
      setError("");
      const data = await getRegistrations();
      setRegistrations(Array.isArray(data) ? data : []);
      setLastUpdated(new Date());
    } catch (loadError) {
      setError(loadError.message || "Unable to load registrations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    loadRegistrations();
  }, [isAuthenticated]);

  const filteredRegistrations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return registrations.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          item.studentName,
          item.parentName,
          item.email,
          item.phone,
          item.batch,
          item.level,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(normalizedSearch),
          );

      const matchesBatch =
        batchFilter === "All" || item.batch === batchFilter;
      const matchesLevel =
        levelFilter === "All" || item.level === levelFilter;

      return matchesSearch && matchesBatch && matchesLevel;
    });
  }, [registrations, searchTerm, batchFilter, levelFilter]);

  const stats = useMemo(() => {
    const total = registrations.length;
    const morning = registrations.filter(
      (item) => item.batch === "Morning",
    ).length;
    const evening = registrations.filter(
      (item) => item.batch === "Evening",
    ).length;
    const premiumSets = registrations.filter(
      (item) => item.needsPremiumChessSet === "Yes",
    ).length;

    return [
      {
        label: "Total Registrations",
        value: total,
        note: "All submitted students",
      },
      {
        label: "Morning Batch",
        value: morning,
        note: "Students preferring morning",
      },
      {
        label: "Evening Batch",
        value: evening,
        note: "Students preferring evening",
      },
      {
        label: "Premium Set Requests",
        value: premiumSets,
        note: "Students needing a premium set",
      },
    ];
  }, [registrations]);

  function handleCredentialChange(event) {
    const { name, value } = event.target;
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }));
    setAuthError("");
  }

  function handleLogin(event) {
    event.preventDefault();

    const enteredUserId = credentials.userId.trim();
    if (
      enteredUserId === ADMIN_USER_ID &&
      credentials.password === ADMIN_PASSWORD
    ) {
      window.localStorage.setItem(ADMIN_SESSION_KEY, "active");
      setIsAuthenticated(true);
      setCredentials({
        userId: "",
        password: "",
      });
      setAuthError("");
      return;
    }

    setAuthError("Invalid admin user ID or password.");
  }

  function handleLogout() {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setRegistrations([]);
    setSearchTerm("");
    setBatchFilter("All");
    setLevelFilter("All");
    setError("");
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Delete this registration from the dashboard?",
    );
    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteRegistration(id);
      setRegistrations((current) => current.filter((item) => item.id !== id));
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete registration.");
    } finally {
      setDeletingId("");
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="admin-auth-shell">
        <section className="admin-auth-panel">
          <div className="admin-auth-copy">
            <span className="section-kicker">Admin Access</span>
            <h1>ChessIQ Control Room</h1>
            <p>
              Sign in with the admin user ID and password to review camp
              registrations, search applicants, and manage enrollment flow.
            </p>
          </div>

          <form className="admin-auth-card" onSubmit={handleLogin}>
            <label className="form-field">
              <span>User ID</span>
              <input
                name="userId"
                value={credentials.userId}
                onChange={handleCredentialChange}
                autoComplete="username"
                placeholder="Enter admin user ID"
                required
              />
            </label>

            <label className="form-field">
              <span>Password</span>
              <input
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleCredentialChange}
                autoComplete="current-password"
                placeholder="Enter password"
                required
              />
            </label>

            {authError ? (
              <p className="form-error" role="alert">
                {authError}
              </p>
            ) : null}

            <button type="submit" className="hero__cta admin-auth-button">
              Unlock Dashboard
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-dashboard-shell">
      <section className="admin-dashboard-hero">
        <div>
          <span className="section-kicker">Admin Dashboard</span>
          <h1>ChessIQ Enrollment Command Center</h1>
          <p>
            Track registrations, filter enrollment activity, and act on student
            records from one dedicated workspace.
          </p>
        </div>

        <div className="admin-dashboard-actions">
          <div className="admin-dashboard-status">
            <span>Last synced</span>
            <strong>{formatTimestamp(lastUpdated)}</strong>
          </div>
          <button
            type="button"
            className="admin-secondary-button"
            onClick={loadRegistrations}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button
            type="button"
            className="admin-secondary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </section>

      <section className="admin-stats-grid">
        {stats.map((item) => (
          <article key={item.label} className="admin-stat-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </section>

      <section className="admin-workspace">
        <div className="admin-toolbar">
          <label className="admin-toolbar-field">
            <span>Search</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, parent, email, phone"
            />
          </label>

          <label className="admin-toolbar-field">
            <span>Batch</span>
            <select
              value={batchFilter}
              onChange={(event) => setBatchFilter(event.target.value)}
            >
              <option value="All">All</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </label>

          <label className="admin-toolbar-field">
            <span>Level</span>
            <select
              value={levelFilter}
              onChange={(event) => setLevelFilter(event.target.value)}
            >
              <option value="All">All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </label>
        </div>

        {error ? (
          <p className="form-error admin-error" role="alert">
            {error}
          </p>
        ) : null}

        {loading ? (
          <div className="admin-empty-state">
            <h2>Loading registrations...</h2>
            <p>We are pulling the latest enrollment data now.</p>
          </div>
        ) : null}

        {!loading && filteredRegistrations.length === 0 ? (
          <div className="admin-empty-state">
            <h2>No registrations match the current filters.</h2>
            <p>Try a different search term or reset the batch and level filters.</p>
          </div>
        ) : null}

        {!loading && filteredRegistrations.length > 0 ? (
          <div className="admin-table-card">
            <div className="admin-table-headline">
              <div>
                <span className="section-kicker">Registrations</span>
                <h2>{filteredRegistrations.length} student records</h2>
              </div>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Age</th>
                    <th>Parent</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Level</th>
                    <th>Batch</th>
                    <th>Set</th>
                    <th>Premium Set</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((item) => (
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
                          disabled={deletingId === item.id}
                        >
                          {deletingId === item.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default AdminDashboard;
