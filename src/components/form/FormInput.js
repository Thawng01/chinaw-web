import "./forminput.css";

import useAuthContext from "../../hook/useAuthContext";

const FormInput = ({ Icon, type, placeholder, value, onChange }) => {
    const { dark } = useAuthContext();

    return (
        <div
            style={{ backgroundColor: dark ? "#333" : "#f0f0f0" }}
            className="profileUpdateInputs"
        >
            <Icon style={{ marginLeft: 6, color: dark ? "#ccc" : "grey" }} />
            <input
                style={{
                    backgroundColor: dark ? "#333" : "#f0f0f0",
                    color: dark ? "#fff" : "#000",
                }}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="profileUpdateInput"
            />
        </div>
    );
};

export default FormInput;
