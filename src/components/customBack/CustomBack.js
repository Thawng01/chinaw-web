import "./customback.css";

import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CustomBack = () => {
    const navigate = useNavigate();
    return (
        <div className="customArrowBackContainer">

        <div className="customArrowBack" onClick={() => navigate(-1)}>
            <MdArrowBack className="customArrowBackIcon" />
        </div>
            <span className="customArrowBackLabel">Go back</span>
        </div>
    );
};

export default CustomBack;
