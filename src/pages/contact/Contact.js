import "./contact.css";

import useAuthContext from "../../hook/useAuthContext";

const Contact = () => {
    const { dark } = useAuthContext();
    return (
        <div className="contactWrapper">
            <div
                style={{ backgroundColor: dark ? "#333" : "#fff" }}
                className="contactBox"
            >
                <input
                    style={{ color: dark ? "#fff" : "#000" }}
                    type="text"
                    placeholder="Username"
                    className="contactInput"
                />
                <input
                    style={{ color: dark ? "#fff" : "#000" }}
                    type="email"
                    placeholder="Email"
                    className="contactInput"
                />
                <textarea
                    style={{ color: dark ? "#fff" : "#000" }}
                    placeholder="Enter your message"
                    className="contactMessage"
                />
                <button className="contactBtn">Submit</button>
            </div>
        </div>
    );
};

export default Contact;
