import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-12">
      <Card className="text-center flex flex-col items-center gap-4 p-8">
        <span className="text-4xl font-extrabold text-primary font-mono">404</span>
        <h2 className="text-2xl font-bold text-fg">Page Not Found</h2>
        <p className="text-sm text-muted">
          The requested page could not be found.
        </p>
        <Button as={Link} to="/" variant="primary">
          Return Home
        </Button>
      </Card>
    </div>
  );
}
