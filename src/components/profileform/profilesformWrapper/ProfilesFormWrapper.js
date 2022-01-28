import "./profilesformwrapper.css";
import CustomBack from "../../customBack/CustomBack";
const ProfilesFormWrapper = ({ children, height, onSubmit }) => {
    return (
        <div className="profilesform">
            <form
                onSubmit={onSubmit}
                style={{ height }}
                className="profilesformContainer"
            >
                {children}
            </form>
            <CustomBack />
        </div>
    );
};

export default ProfilesFormWrapper;
