import { useLocalStorage } from '../hooks/useLocalStorage.js';
import UserCard from '../components/UserCard.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

const HARDCODED_USERS = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Frontend Engineer' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'UI/UX Designer' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Full Stack Developer' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'DevOps Specialist' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Security Analyst' },
  { id: 6, name: 'Fiona Gallagher', email: 'fiona@example.com', role: 'QA Engineer' },
];

export default function Users() {
  const [query, setQuery] = useLocalStorage('users_search', '');

  const filtered = HARDCODED_USERS.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase()) ||
    u.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-fg">Users Directory</h2>
          <p className="text-sm text-muted">
            Responsive card grid (1 col mobile, 2 cols sm, 3 cols lg)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="user-search" className="sr-only">Search users</label>
          <input
            id="user-search"
            type="text"
            placeholder="Search users..."
            aria-label="Search users"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-card border border-line bg-surface px-3 py-2 text-sm text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-primary"
          />
          {query && (
            <Button variant="ghost" onClick={() => setQuery('')} aria-label="Clear search">
              Clear
            </Button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-muted">No users found matching &ldquo;{query}&rdquo;</p>
        </Card>
      ) : (
        /* Moodle Part C specification: Responsive Grid */
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
          {filtered.map((u) => (
            <li key={u.id}>
              <UserCard user={u} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
