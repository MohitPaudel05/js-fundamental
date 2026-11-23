import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Profile Page (Protected)</h2>
      <p>Logged in as: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
