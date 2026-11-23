import { useParams, Link } from 'react-router-dom';
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

export default function UserDetail() {
  const { id } = useParams();
  const user = HARDCODED_USERS.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <Card className="max-w-md mx-auto text-center flex flex-col gap-4 py-8">
        <h2 className="text-xl font-bold text-fg">User Not Found</h2>
        <p className="text-sm text-muted">No user found with ID {id}.</p>
        <div>
          <Button as={Link} to="/users" variant="primary">
            Back to Users
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-4">
      <Link to="/users" className="text-sm text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-primary inline-block">
        &larr; Back to Users
      </Link>

      <Card className="flex flex-col gap-4 p-6">
        <div className="border-b border-line pb-4">
          <h2 className="text-2xl font-bold text-fg">{user.name}</h2>
          <p className="text-sm text-primary font-medium">{user.role}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted block text-xs">User ID</span>
            <span className="font-mono font-medium text-fg">#{user.id}</span>
          </div>
          <div>
            <span className="text-muted block text-xs">Email</span>
            <span className="font-medium text-fg">{user.email}</span>
          </div>
        </div>

        <div className="pt-2">
          <Button as={Link} to="/users" variant="ghost">
            Return to Directory
          </Button>
        </div>
      </Card>
    </div>
  );
}
