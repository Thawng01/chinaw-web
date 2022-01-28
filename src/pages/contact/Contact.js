import "./contact.css";

const Contact = () => {
    return (
        <div className="contactWrapper">
            <div className="contactBox">
                <input
                    type="text"
                    placeholder="Username"
                    className="contactInput"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="contactInput"
                />
                <textarea
                    placeholder="Enter your message"
                    className="contactMessage"
                />
                <button className="contactBtn">Submit</button>
            </div>
        </div>
    );
};

export default Contact;
