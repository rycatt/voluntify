'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password, rememberMe);
      router.push('/');
    } catch (error) {
      setError('Login failed');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle(rememberMe);
      router.push('/');
    } catch (error) {
      setError('Failed to login with Google');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Card className="w-full max-w-xl px-4 py-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-4xl">Welcome back</CardTitle>
          <CardDescription className="text-md">Please enter your details</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="border border-red-500">
              <AlertTitle>{error}</AlertTitle>
              <AlertDescription>
                Please check your email and password and try again.
              </AlertDescription>
            </Alert>
          )}

          {/* TODO: Add show/hide toggle for password */}
          <form>
            <div className="flex flex-col gap-6 my-4">
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="py-6"
              />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="py-6"
              />
            </div>
            <div className="flex justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(change) => setRememberMe(change as boolean)}
                  disabled={loading}
                />
                <Label htmlFor="rememberMe" className="font-normal cursor-pointer select-none">
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-blue-500 font-semibold hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              className="w-full py-6 text-md cursor-pointer"
              onClick={handleEmailLogin}
              disabled={loading}
            >
              Login
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center gap-2 justify-center py-6 cursor-pointer text-md"
              onClick={handleGoogleLogin}
              disabled={loading}
              type="button"
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: '24px',
                  height: '24px',
                }}
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline text-blue-500 hover:text-blue-400">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
