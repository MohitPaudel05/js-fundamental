import { Link } from 'react-router-dom';
import { Card } from './ui/Card.jsx';
import { Button } from './ui/Button.jsx';

export default function UserCard({ user }) {
  return (
    <Card className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-fg">{user.name}</h3>
      <p className="text-sm text-muted">{user.email}</p>
      {user.role && <p className="text-xs text-primary font-medium">{user.role}</p>}
      <div className="mt-3 pt-2">
        <Button
          as={Link}
          to={`/users/${user.id}`}
          variant="primary"
          className="w-full justify-center"
        >
          View Details &rarr;
        </Button>
      </div>
    </Card>
  );
}
