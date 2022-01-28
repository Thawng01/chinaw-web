import "./profileforminput.css";

const ProfileFormInput = ({ Icon, type, placeholder, value, onChange }) => {
    return (
        <div className="profileUpdateInputs">
            <Icon style={{ marginLeft: 6, color: "grey" }} />
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="profileUpdateInput"
            />
        </div>
    );
};

export default ProfileFormInput;
