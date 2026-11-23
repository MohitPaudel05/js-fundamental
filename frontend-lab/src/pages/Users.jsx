import { useLocalStorage } from '../hooks/useLocalStorage.js';
import UserCard from '../components/UserCard.jsx';

const HARDCODED_USERS = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
];

export default function Users() {
  const [query, setQuery] = useLocalStorage('users_search', '');

  const filtered = HARDCODED_USERS.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Users List</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        {filtered.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
