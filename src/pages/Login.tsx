import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] orb-animate"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px] orb-animate" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-tertiary/5 blur-[100px] orb-animate" style={{ animationDelay: '-10s' }}></div>
      </div>

      <Card className="w-full max-w-md glass-panel ghost-border border-0">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px]">
              <div className="w-full h-full bg-surface rounded-[14px] flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-primary">auto_awesome</span>
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-headline font-extrabold text-gradient">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-on-surface-variant">
            Sign in to synergize your professional narrative
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-error/10 text-error text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-on-surface">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="chief.visionary@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-surface-container-lowest/30 border-white/10 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-on-surface">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-surface-container-lowest/30 border-white/10 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full primary-gradient text-on-primary font-headline font-bold py-3 rounded-xl shadow-glow hover:shadow-glow-lg hover:scale-[1.02] transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-on-surface-variant">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary-dim font-semibold transition-colors">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
