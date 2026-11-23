import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '8px 0', padding: '8px' }}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <Link to={`/users/${user.id}`}>View Details</Link>
    </div>
  );
}
