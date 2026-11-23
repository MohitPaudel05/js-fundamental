import { useParams, Link } from 'react-router-dom';

const HARDCODED_USERS = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Frontend Engineer' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'UI Designer' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Full Stack Developer' },
];

export default function UserDetail() {
  const { id } = useParams();
  const user = HARDCODED_USERS.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <div>
        <h2>User Not Found</h2>
        <Link to="/users">Back to Users</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <Link to="/users">Back to Users</Link>
    </div>
  );
}
