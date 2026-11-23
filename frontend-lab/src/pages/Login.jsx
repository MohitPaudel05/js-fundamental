import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      await login(email);
      navigate('/profile');
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <Card className="flex flex-col gap-4 p-6">
        <div>
          <h2 className="text-2xl font-bold text-fg">Login</h2>
          <p className="text-sm text-muted">
            Enter your email to authenticate with the stub auth provider.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-fg">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="user@ku.edu.np"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-card border border-line bg-surface px-3 py-2 text-sm text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-primary"
            />
          </div>

          <Button type="submit" variant="primary" className="justify-center">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
