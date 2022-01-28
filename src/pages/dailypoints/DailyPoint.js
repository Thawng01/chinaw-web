import "./dailypoint.css";

const DailyPoint = () => {
    return (
        <div className="dailypointContainer">
            <h1 className="dailypointTitle">Oh, Sorry!</h1>
            <h3 className="dailypointSubtitle">
                Daily point is not available in web version!
            </h3>
            <span className="dailypointAppLink">
                If you want to claim daily point, download
                <a
                    href="https://play.google.com/store/apps/details?id=com.chinvoice"
                    target="_blank"
                    className="appLink"
                >
                    android
                </a>
                app
            </span>
        </div>
    );
};

export default DailyPoint;
