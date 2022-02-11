import { useState } from "react";

const useValidation = () => {
    const [error, setError] = useState(null);

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

    return { setError, validate, error };
};

export default useValidation;
