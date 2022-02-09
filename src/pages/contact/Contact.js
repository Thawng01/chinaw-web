import "./contact.css";

import useAuthContext from "../../hook/useAuthContext";
import ContactAlertBox from "../../components/contactAlertBox/ContactAlertBox";

const Contact = () => {
    const { dark } = useAuthContext();

    return (
        <>
            <ContactAlertBox />
            <div className="contactWrapper">
                <div className="contactBox">
                    <input
                        style={{
                            backgroundColor: dark ? "#333" : "#f0f0f0",
                            color: dark ? "#fff" : "#000",
                        }}
                        type="text"
                        placeholder="Username"
                        className="contactInput"
                    />
                    <input
                        style={{
                            backgroundColor: dark ? "#333" : "#f0f0f0",
                            color: dark ? "#fff" : "#000",
                        }}
                        type="email"
                        placeholder="Email"
                        className="contactInput"
                    />
                    <textarea
                        style={{
                            backgroundColor: dark ? "#333" : "#f0f0f0",
                            color: dark ? "#fff" : "#000",
                        }}
                        placeholder="Enter your message"
                        className="contactMessage"
                    />
                    <button className="contactBtn">Submit</button>
                </div>
            </div>
        </>
    );
};

export default Contact;
