import { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";

import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../db/db";
import { useLocation, useNavigate } from "react-router-dom";

import "./register.css";
import useAuthContext from "../../hook/useAuthContext";

const Register = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");
    const [error, setError] = useState(null);

    const { setUser, dark } = useAuthContext();

    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.pathname || "/";

    const submitUser = async (event) => {
        event.preventDefault();
        const auth = getAuth();

        if (!email || !password)
            return setError("Please fill the required field");

        setPersistence(auth, browserLocalPersistence).then(async () => {
            if (isRegister) {
                try {
                    const { user } = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    checkIsUserInfo(user);
                } catch (error) {
                    validate(error);
                }
            } else {
                try {
                    const { user } = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    setUser(user.uid);
                    navigate(from, { replace: true });
                } catch (error) {
                    validate(error);
                }
            }
        });
    };

    function validate(error) {
        if (error.code === "auth/network-request-failed") {
            setError("No internet connection");
        } else if (error.code === "auth/wrong-password") {
            setError("Incorrect password");
        } else if (error.code === "auth/user-not-found") {
            setError("No user found with this email");
        } else if (error.code === "auth/weak-password") {
            setError("The password must be at least 6 character long");
        } else if (error.code === "auth/invalid-email") {
            setError("Invalid email");
        } else if (error.code === "auth/email-already-in-use") {
            setError("The email already  in use by another user");
        } else if (error.code === "auth/too-many-requests") {
            setError(
                "Access to this account has been temporarily disabled due to many failed login attempts. You can try again later."
            );
        } else {
            setError(error.message);
        }
    }

    async function checkIsUserInfo(user) {
        const getUser = await getDoc(doc(db, "Users", user.uid));
        if (getUser.exists() === true) return;
        await setDoc(doc(db, "Users", user.uid), {
            admin: false,
            bio: "",
            comments: [],
            email: user.email,
            image:
                user.photoURL === null
                    ? "https://img.favpng.com/6/14/2/account-icon-avatar-icon-man-icon-png-favpng-d9YxzGw3UPA07dE7sAQyMSiNk.jpg"
                    : user.photoURL,
            moderator: false,
            points: 0,
            post: [],
            postPowers: 3,
            powers: 10,
            uid: user.uid,
            restricted: false,
            username: user.displayName,
            isChance: true,
            likeTime: null,
            token: [],
            chanceTime: null,
            postTime: null,
            background: "",
        });
        setUser(user.uid);
        navigate(from, { replace: true });
    }

    return (
        <div className="register">
            <div className="registerContainer">
                <div className="welcomeTextContainer">
                    <h1
                        style={{ color: dark ? "#fff" : "#000" }}
                        className="welcomeText"
                    >
                        Welcome...
                    </h1>
                    <p
                        style={{ color: dark ? "#fff" : "#000" }}
                        className="welcomeDesc"
                    >
                        Create your quality content and get paid.
                    </p>
                </div>

                <div className="registerInputContainer">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form className="registerInputs" onSubmit={submitUser}>
                        <input
                            style={{
                                backgroundColor: dark ? "#333" : "#f0f0f0",
                                color: dark ? "#fff" : "#000",
                            }}
                            type="email"
                            placeholder="Email"
                            className="registerInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            style={{
                                backgroundColor: dark ? "#333" : "#f0f0f0",
                                color: dark ? "#fff" : "#000",
                            }}
                            type="password"
                            placeholder="Password"
                            className="registerInput"
                            autoComplete="on"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {isRegister && (
                            <input
                                style={{
                                    backgroundColor: dark ? "#333" : "#f0f0f0",
                                    color: dark ? "#fff" : "#000",
                                }}
                                type="password"
                                placeholder="Repeat password"
                                className="registerInput"
                                autoComplete="on"
                                value={cPassword}
                                onChange={(e) => setCpassword(e.target.value)}
                            />
                        )}

                        <input
                            className="registerBtn"
                            type="submit"
                            value={isRegister ? "Register" : "Login"}
                        />
                    </form>
                    <div className="alreadyHaveAccount">
                        <p
                            style={{ color: dark ? "#fff" : "#000" }}
                            className="alreadyHaveAccountText"
                        >
                            {isRegister
                                ? "Already have an account?"
                                : "Don't have an account?"}
                        </p>
                        <p
                            className="loginRegister"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? "Login" : "Create one"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
