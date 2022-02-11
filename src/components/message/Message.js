import useAuthContext from "../../hook/useAuthContext";

import "./message.css";

const Message = () => {
    const { message, setMessage } = useAuthContext();

    if (message?.text)
        setTimeout(() => {
            setMessage(null);
        }, 3000);

    return (
        <div
            style={{
                top: message?.text ? 0 : -60,
                backgroundColor: message?.type === "success" ? "green" : "red",
            }}
            className="error"
        >
            <p className="errorText">{message?.text}</p>
        </div>
    );
};

export default Message;
