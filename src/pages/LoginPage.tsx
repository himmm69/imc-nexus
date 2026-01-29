import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (method: 'google' | 'email') => {
    login(method);
    toast({
      title: 'Welcome!',
      description: 'You have been logged in successfully. (Demo)',
    });
    navigate('/');
  };

  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="text-center mb-8">
        <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-3xl font-bold text-foreground mb-2">IMC Study Hub</h1>
        <p className="text-muted-foreground">Sign in to access all features</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Choose your preferred login method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full h-12 text-base"
            onClick={() => handleLogin('google')}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Email Login */}
          <Button
            variant="outline"
            className="w-full h-12 text-base"
            onClick={() => handleLogin('email')}
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Continue with Email
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Demo Mode</span>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            This is a demo app. Clicking any login button will sign you in with a mock account.
          </p>

          {/* Firebase integration comment */}
          {/* 
            Firebase integration would go here:
            import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
            import { auth } from '@/lib/firebase';
            
            const handleGoogleLogin = async () => {
              const provider = new GoogleAuthProvider();
              await signInWithPopup(auth, provider);
            };
          */}
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground mt-6">
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
