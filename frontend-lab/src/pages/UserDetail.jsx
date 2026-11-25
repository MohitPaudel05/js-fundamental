import { useParams, Link } from 'react-router-dom';
import { useUser } from '../hooks/useUsers.js';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function UserDetail() {
  const { id } = useParams();
  const { data: user, isPending, isError, error, refetch } = useUser(id);

  if (isPending) {
    return (
      <Card className="max-w-md mx-auto text-center py-12">
        <p role="status" className="text-muted">Loading user profile…</p>
      </Card>
    );
  }

  if (isError || !user) {
    return (
      <Card className="max-w-md mx-auto text-center flex flex-col gap-4 py-8">
        <h2 className="text-xl font-bold text-fg">User Not Found</h2>
        <p role="alert" className="text-sm text-red-500">
          {error?.message || `No user found with ID ${id}.`}
        </p>
        <div className="flex justify-center gap-2">
          {isError && (
            <Button variant="ghost" onClick={() => refetch()}>
              Retry
            </Button>
          )}
          <Button as={Link} to="/users" variant="primary">
            Back to Users
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-4">
      <Link
        to="/users"
        className="text-sm text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-primary inline-block"
      >
        &larr; Back to Users
      </Link>

      <Card className="flex flex-col gap-4 p-6">
        <div className="border-b border-line pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-fg">{user.name}</h2>
            <p className="text-sm text-primary font-medium">@{user.username}</p>
          </div>
          <span className="text-xs bg-bg border border-line text-muted px-2.5 py-1 rounded-card font-mono">
            ID: #{user.id}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted block text-xs">Email</span>
            <a href={`mailto:${user.email}`} className="font-medium text-primary hover:underline">
              {user.email}
            </a>
          </div>
          <div>
            <span className="text-muted block text-xs">Phone</span>
            <span className="font-medium text-fg">{user.phone}</span>
          </div>
          <div>
            <span className="text-muted block text-xs">Website</span>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              {user.website}
            </a>
          </div>
          <div>
            <span className="text-muted block text-xs">Company</span>
            <span className="font-medium text-fg">{user.company?.name || 'N/A'}</span>
          </div>
        </div>

        {user.address && (
          <div className="border-t border-line pt-3 text-sm">
            <span className="text-muted block text-xs mb-1">Address</span>
            <p className="text-fg">
              {user.address.street}, {user.address.suite}, {user.address.city} ({user.address.zipcode})
            </p>
          </div>
        )}

        <div className="pt-2">
          <Button as={Link} to="/users" variant="ghost">
            Return to Directory
          </Button>
        </div>
      </Card>
    </div>
  );
}
