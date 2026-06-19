import React, {createContext, useEffect, useState} from 'react';

interface AuthState {
    username: string | null;
    loading: boolean;
    setUsername: (username: string | null) => void;
}

export const AuthContext = createContext<AuthState>({
    username: null,
    loading: true,
    setUsername: () => {},
});

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/forum_whoami.php', {credentials: 'same-origin'})
            .then((res) => res.json())
            .then((data) => setUsername(data.username))
            .catch(() => setUsername(null))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{username, loading, setUsername}}>
            {children}
        </AuthContext.Provider>
    );
}
