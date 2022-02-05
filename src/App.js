import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthContext } from "./components/auth/AuthContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import "./App.css";
import { store } from "./store/Store";
import AppRoutes from "./AppRoutes";

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.uid);
            } else {
                setUser(null);
            }
        });

        const result = localStorage.getItem("theme");
        if (result === "light") {
            setDark(false);
        } else {
            setDark(true);
        }

        document.body.style.backgroundColor = dark ? "#000" : "#fff";
        document.body.style.color = dark ? "#fff" : "#000";
    }, [dark, user, setUser, setDark]);

    return (
        <AuthContext.Provider
            value={{
                isMenuOpen,
                setIsMenuOpen,
                user,
                setUser,
                message,
                setMessage,
                dark,
                setDark,
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
