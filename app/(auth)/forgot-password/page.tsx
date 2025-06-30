'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/firebase/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    console.log('Email:', email);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent.');
    } catch {
      setError('Failed to send reset email.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Card className="w-full max-w-xl px-4 py-8">
        <CardHeader>
          <CardTitle>Forgot your Password?</CardTitle>
          <CardDescription>
            Enter your email so that we can send you password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert variant="default">
              <AlertTitle>{message}</AlertTitle>
              <AlertDescription> didn&apos;t get it? Peek in your spam folder!</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive" className="border border-red-500">
              <AlertTitle>{error}</AlertTitle>
              <AlertDescription>Please try again.</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handlePasswordReset} className="flex flex-col gap-8 my-4">
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-6"
            />
            <Button type="submit" className="w-full py-6 text-md cursor-pointer">
              Send Reset Link
            </Button>
            <Link
              href="/login"
              className="w-full items-center justify-center space-x-2 flex hover:text-muted-foreground"
            >
              <ChevronLeft />
              <span>Back to Login</span>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
