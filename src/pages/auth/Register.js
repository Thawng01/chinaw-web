import { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";

import { EmailOutlined, LockOutlined } from "@mui/icons-material";

import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../db/db";
import { useLocation, useNavigate } from "react-router-dom";

import "./register.css";
import useAuthContext from "../../hook/useAuthContext";
import FormInput from "../../components/form/FormInput";
import AppButton from "../../components/Appbutton/AppButton";
import Loading from "../../components/loading/Loading";
import useValidation from "../../hook/useValidation";

const Register = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");

    const [loading, setLoading] = useState(false);

    const { setUser, dark } = useAuthContext();
    const { setError, error, validate } = useValidation();

    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.pathname || "/";

    const submitUser = async (event) => {
        event.preventDefault();
        const auth = getAuth();

        if (!email || !password)
            return setError("Please fill the required field");

        setPersistence(auth, browserLocalPersistence).then(async () => {
            setLoading(true);
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
            setLoading(false);
        });
    };

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
            {loading && (
                <Loading
                    title={isRegister ? "Registering..." : "Logging in..."}
                />
            )}
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
                        <FormInput
                            Icon={EmailOutlined}
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <FormInput
                            Icon={LockOutlined}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {isRegister && (
                            <FormInput
                                Icon={LockOutlined}
                                type="password"
                                placeholder="Repeat password"
                                value={cPassword}
                                onChange={(e) => setCpassword(e.target.value)}
                            />
                        )}

                        <AppButton title={isRegister ? "Register" : "Login"} />
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
