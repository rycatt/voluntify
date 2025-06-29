import { User } from 'firebase/auth';

export interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string, rememberMe?: boolean) => void;
  loginWithGoogle: (rememberMe?: boolean) => void;
  logout: () => void;
}
