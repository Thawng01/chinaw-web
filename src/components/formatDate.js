const formatDate = (dateFromDb) => {
    let time;

    const date = new Date().getTime();
    let m = 1000 * 60; // a minute in milisecond
    let hr = 1000 * 60 * 60; // an hour in milisecond
    let day = 1000 * 60 * 60 * 24; // a day in milisecond
    let month = day * 30.41; // a month in milisecond
    let yr = month * 12; // a year in milisecond

    if (dateFromDb) {
        const duration = date - dateFromDb;

        if (duration < m) {
            time = "Just now";
        } else if (duration < hr) {
            time = Math.round(duration / m) + "m";
        } else if (duration < day) {
            let durationHr = Math.round(duration / hr);
            let hrTxt = durationHr <= 1 ? "hr" : "hrs";
            time = durationHr + hrTxt;
        } else if (duration < month) {
            let durationD = Math.round(duration / day);
            time = durationD + "d";
        } else if (duration < yr) {
            let durationMo = Math.round(duration / month);
            let moTxt = durationMo <= 1 ? "month" : "months";
            time = durationMo + " " + moTxt;
        } else if (duration >= yr) {
            let durationY = Math.round(duration / yr);
            let yrTxt = durationY >= 1 ? "yrs" : "yr";
            time = durationY + yrTxt;
        }
    }

    return time;
};

export default formatDate;
