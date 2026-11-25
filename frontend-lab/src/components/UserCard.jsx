import { Link } from 'react-router-dom';
import { Card } from './ui/Card.jsx';
import { Button } from './ui/Button.jsx';
import { useToggleFavorite } from '../hooks/useUsers.js';

export default function UserCard({ user }) {
  const { mutate: toggleFavorite, isPending } = useToggleFavorite();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite({ id: user.id, isFavorite: !user.isFavorite });
  };

  return (
    <Card className="flex flex-col gap-2 relative">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-fg">{user.name}</h3>
          <p className="text-sm text-muted">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={handleFavoriteClick}
          disabled={isPending}
          className="text-xl p-1 hover:scale-110 transition focus-visible:outline-2 focus-visible:outline-primary rounded"
          title={user.isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
          aria-label={user.isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
        >
          {user.isFavorite ? '⭐' : '☆'}
        </button>
      </div>

      {user.company?.name && (
        <p className="text-xs text-primary font-medium">🏢 {user.company.name}</p>
      )}

      {user.phone && (
        <p className="text-xs text-muted">📞 {user.phone}</p>
      )}

      <div className="mt-auto pt-3">
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
