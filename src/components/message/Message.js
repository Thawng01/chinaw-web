import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import "./message.css";

const Message = () => {
    const { message, setMessage } = useContext(AuthContext);

    if (message)
        setTimeout(() => {
            setMessage(null);
        }, 3000);

    return (
        <div className="error">
            <p className="errorText">{message}</p>
        </div>
    );
};

export default Message;
