import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";

const useAuthContext = () => {
    const auth = useContext(AuthContext);

    return auth;
};

export default useAuthContext;
