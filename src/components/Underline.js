import useAuthContext from "../hook/useAuthContext";

const Underline = () => {
    const { dark } = useAuthContext();
    return (
        <div
            style={{
                backgroundColor: dark ? "#666" : "lightgray",
                height: 0.4,
                width: "100%",
            }}
        />
    );
};

export default Underline;
