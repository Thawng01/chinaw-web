import "./loading.css";

const Loading = ({ title }) => {
    return (
        <div className="loadingContainer">
            <span>{title}</span>
        </div>
    );
};

export default Loading;
