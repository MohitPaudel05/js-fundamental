import { useAuth } from '../context/AuthContext.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-lg mx-auto py-6">
      <Card className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <h2 className="text-2xl font-bold text-fg">Profile</h2>
            <p className="text-xs text-primary font-medium">Protected Route</p>
          </div>
          <span className="text-xs bg-bg border border-line text-muted px-2.5 py-1 rounded-card font-mono">
            ID: {user?.id}
          </span>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <div>
            <span className="text-muted block text-xs">Logged in as</span>
            <span className="font-semibold text-fg">{user?.name}</span>
          </div>
          <div>
            <span className="text-muted block text-xs">Email</span>
            <span className="font-medium text-fg">{user?.email}</span>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
}
