import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB2Mnk5_-B2t2jqEwGsNQmOJJXEOWT-TAY',
  authDomain: 'voluntify-da8ac.firebaseapp.com',
  projectId: 'voluntify-da8ac',
  storageBucket: 'voluntify-da8ac.appspot.com',
  messagingSenderId: '30122640998',
  appId: '1:30122640998:web:e09346c33e7219ee998fa7',
  measurementId: 'G-KWRPKVXW0P',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
