import { useContext, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";

import { getDoc, getFirestore, setDoc, doc } from "firebase/firestore";
import { db } from "../../db/db";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../components/auth/AuthContext";

import "./register.css";

const Register = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");
    const [error, setError] = useState(null);

    const { setUser } = useContext(AuthContext);

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
                const { user } = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const fireStore = getFirestore();
                const getUser = await getDoc(doc(fireStore, "Users", user.uid));
                if (getUser.exists() === false) {
                    try {
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
                    } catch (error) {
                        console.log(error.message);
                    }
                }
            } else {
                const { user } = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                setUser(user.uid);
                navigate(from, { replace: true });
            }
        });
    };

    return (
        <div className="register">
            <div className="registerContainer">
                <div className="welcomeTextContainer">
                    <h1 className="welcomeText">Welcome...</h1>
                    <p className="welcomeDesc">
                        Create your quality content and get paid.
                    </p>
                </div>

                <div className="registerInputContainer">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form className="registerInputs" onSubmit={submitUser}>
                        <input
                            type="email"
                            placeholder="Email"
                            className="registerInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="registerInput"
                            autoComplete="on"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {isRegister && (
                            <input
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
                        <p className="alreadyHaveAccountText">
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
