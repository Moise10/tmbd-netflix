import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth';

import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';



interface IAuth {
	user: User | null;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	error: string | null;
	loading: boolean;
}



const AuthContext = createContext<IAuth>({
	user: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	error: null,
	loading: false,
});



interface AuthProviderProps {
	children: React.ReactNode;
}



export const AuthProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState(null);
  //So initialLoading is actually gonna block the UI
	const [initialLoading, setInitialLoading] = useState(true);
	const [loading, setLoading] = useState(false);

  //This useEffect is for our onAuthStateChanged just to make sure to persist every time , when the user is actually logged in and we refresh the page without login , we don't want to go back to the login page : persisting the actual user

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// Logged in...
					setUser(user);
					setLoading(false);
				} else {
					// Not logged in...
					setUser(null);
					setLoading(true);
					router.push('/login');
				}

        
				setInitialLoading(false);
			}),
		[auth]
	);

  

	const signUp = async (email: string, password: string) => {
		setLoading(true);

		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setUser(userCredential.user);
				router.push('/');
				setLoading(false);
			})
			.catch((error) => alert(error.message))
			.finally(() => setLoading(false));
	};



	const signIn = async (email: string, password: string) => {
		setLoading(true);
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setUser(userCredential.user);
				router.push('/');
				setLoading(false);
			})
			.catch((error) => alert(error.message))
			.finally(() => setLoading(false));
	};



	const logout = async () => {
		setLoading(true);

		signOut(auth)
			.then(() => {
				setUser(null);
			})
			.catch((error) => alert(error.message))
			.finally(() => setLoading(false));
	};


  //Sending these values using useMemo() is going to help with our app performance so that those values are only going to recompute when any of these values change , just like with useEffect


	const memoedValue = useMemo(
		() => ({ user, signUp, signIn, error, loading, logout }),
		[user, loading, error]
	);


// Then we pass it here as the value for the context 
	return (
		<AuthContext.Provider value={memoedValue}>
			{!initialLoading && children}
		</AuthContext.Provider>
	);
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
	return useContext(AuthContext);
}
