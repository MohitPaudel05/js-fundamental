import { useState } from 'react';
import { useUsers, useCreateUser } from '../hooks/useUsers.js';
import { useUiStore } from '../store/ui.js';
import UserCard from '../components/UserCard.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function Users() {
  const {
    data: users = [],
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useUsers();

  const {
    mutate: createUser,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
  } = useCreateUser();

  // Zustand UI Store selectors (no extra re-renders)
  const view = useUiStore((s) => s.view);
  const setView = useUiStore((s) => s.setView);
  const search = useUiStore((s) => s.search);
  const setSearch = useUiStore((s) => s.setSearch);

  // Local form state for "Add user" form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    createUser(
      { name: name.trim(), email: email.trim() },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
        },
      }
    );
  };

  // Filter users client-side based on search query
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-fg">Users Directory</h2>
            {isFetching && (
              <small className="text-xs text-primary font-medium animate-pulse">
                Refreshing…
              </small>
            )}
          </div>
          <p className="text-sm text-muted">
            Fetched via TanStack Query from JSONPlaceholder
          </p>
        </div>

        {/* Controls: Search & Grid/List View Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search users..."
            aria-label="Search users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-card border border-line bg-surface px-3 py-2 text-sm text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-primary"
          />
          {search && (
            <Button
              variant="ghost"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              Clear
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            aria-label={`Switch to ${view === 'grid' ? 'list' : 'grid'} view`}
          >
            {view === 'grid' ? '📄 List View' : '🔲 Grid View'}
          </Button>
        </div>
      </div>

      {/* Part C: Add User Form */}
      <Card className="flex flex-col gap-3 p-4">
        <h3 className="text-base font-semibold text-fg">Add New User</h3>
        {isCreateError && (
          <p role="alert" className="text-xs text-red-500">
            Error adding user: {createError.message}
          </p>
        )}
        <form onSubmit={handleAddUser} className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Full Name"
            aria-label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-card border border-line bg-surface px-3 py-2 text-sm text-fg flex-1 min-w-[200px] focus-visible:outline-2 focus-visible:outline-primary"
          />
          <input
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-card border border-line bg-surface px-3 py-2 text-sm text-fg flex-1 min-w-[200px] focus-visible:outline-2 focus-visible:outline-primary"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isCreating}
          >
            {isCreating ? 'Adding…' : 'Add User'}
          </Button>
        </form>
      </Card>

      {/* Loading state */}
      {isPending && (
        <Card className="text-center py-12">
          <p role="status" className="text-muted font-medium">
            Loading users…
          </p>
        </Card>
      )}

      {/* Error state */}
      {isError && (
        <Card className="text-center py-8 border-red-500/50">
          <p role="alert" className="text-red-500 font-medium mb-3">
            Failed: {error.message}
          </p>
          <Button variant="primary" onClick={() => refetch()}>
            Retry
          </Button>
        </Card>
      )}

      {/* Success / Loaded Data */}
      {!isPending && !isError && (
        filtered.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-muted">No users found matching &ldquo;{search}&rdquo;</p>
          </Card>
        ) : (
          <ul
            className={
              view === 'grid'
                ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0'
                : 'flex flex-col gap-3 list-none p-0 m-0'
            }
          >
            {filtered.map((u) => (
              <li key={u.id}>
                <UserCard user={u} />
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
