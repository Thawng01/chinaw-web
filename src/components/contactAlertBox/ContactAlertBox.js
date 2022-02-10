import { IoCloseCircleOutline } from "react-icons/io5";
import "./contactAlertBox.css";
import { useEffect, useState } from "react";

import useAuthContext from "../../hook/useAuthContext";

const ContactAlertBox = () => {
    const [showAlert, setShowAlert] = useState(false);

    const { dark } = useAuthContext();

    useEffect(() => {
        setShowAlert(true);
    }, [setShowAlert]);

    function closeAlertMessageBox(e) {
        if (e.target.className === "alerBox") {
            setShowAlert(false);
        }
    }

    return (
        <div
            style={{ bottom: showAlert ? 0 : -1000 }}
            className="alertBox"
            onClick={(e) => closeAlertMessageBox(e)}
        >
            <div className="closeAlertBox" onClick={() => setShowAlert(false)}>
                <IoCloseCircleOutline />
            </div>

            <div
                style={{ backgroundColor: dark ? "#333" : "#fff" }}
                className="alertMessageContainer"
            >
                <p className="alertMessage">
                    Sorry bro! This feature is being developed, it's not going
                    to work right now.
                </p>
            </div>
        </div>
    );
};

export default ContactAlertBox;
