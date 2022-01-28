import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthContext } from "./components/auth/AuthContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import { store } from "./store/Store";
import AppRoutes from "./AppRoutes";

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.uid);
            } else {
                setUser(null);
            }
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isMenuOpen,
                setIsMenuOpen,
                user,
                setUser,
                message,
                setMessage,
            }}
        >
            <Provider store={store}>
                <Router>
                    <AppRoutes />
                </Router>
            </Provider>
        </AuthContext.Provider>
    );
}

export default App;
