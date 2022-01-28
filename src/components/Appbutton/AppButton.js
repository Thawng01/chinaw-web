import "./appbutton.css";

const AppButton = ({ title }) => {
    return <input type="submit" value={title} className="appButton" />;
};

export default AppButton;
