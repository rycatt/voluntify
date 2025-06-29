'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      router.push('/');
    } catch (error) {
      setError('Failed to login');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogIn = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      router.push('/');
    } catch (error) {
      setError('Failed to login with Google');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return <div>login</div>;
}
