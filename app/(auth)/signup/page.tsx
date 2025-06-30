'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SignUpPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmedPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(email, password);
      router.push('/');
    } catch {
      setError('Failed to create an account');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Card className="w-full max-w-xl px-4 py-8">
        <CardHeader>
          <CardTitle className="text-2xl md:text-4xl">Create Account</CardTitle>
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

          {/* TODO: Maybe redirect user to create their profile after sign up*/}
          <form>
            <div className="flex flex-col gap-6 mt-4">
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
              <Input
                id="confirmedPassword"
                type="password"
                placeholder="Retype your password"
                onChange={(e) => setConfirmedPassword(e.target.value)}
                required
                className={`py-6 ${
                  confirmedPassword
                    ? confirmedPassword !== password
                      ? 'border-red-500 focus-visible:ring-red-300 bg-red-200/50'
                      : ''
                    : ''
                }`}
              />
            </div>
            {confirmedPassword && confirmedPassword !== password && (
              <p className="text-red-500">Passwords do not match</p>
            )}

            <Button
              className="w-full bg-blue-500 py-6 text-md cursor-pointer mt-6"
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
