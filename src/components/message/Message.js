import useAuthContext from "../../hook/useAuthContext";

import "./message.css";

const Message = () => {
    const { message, setMessage } = useAuthContext();

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
