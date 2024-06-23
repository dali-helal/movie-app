import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase/firebase.ts";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    User as FirebaseUser
} from "firebase/auth";

interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

// Define AuthContextType
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signInWithGoogle: () => void;
    logout: () => void;
}

// Create AuthContext
export const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    signInWithGoogle: () => {},
    logout: () => {}
});

// Interface for AuthProviderProps
interface AuthProviderProps {
    children: React.ReactNode;
}


// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to sign in with Google
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    // Function to sign out
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: FirebaseUser | null) => {
            setUser(currentUser);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// useAuthContext hook
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

