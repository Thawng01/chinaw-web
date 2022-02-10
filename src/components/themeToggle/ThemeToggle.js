import useAuthContext from "../../hook/useAuthContext";
import "./themeToggle.css";

const ThemeToggle = () => {
    const { dark, setDark } = useAuthContext();

    const handleDarkMode = () => {
        setDark(!dark);
        if (dark) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    };

    return (
        <div
            style={{ backgroundColor: dark ? "#fff" : "#000" }}
            className="darkMode"
            onClick={handleDarkMode}
        >
            <div
                className="darkModeToggle"
                style={{
                    backgroundColor: dark ? "#222" : "#fff",
                    marginLeft: dark ? 20 : 0,
                }}
            />
        </div>
    );
};

export default ThemeToggle;
