import "./history.css";

import PaymentHistoryItem from "../../components/paymenthistoryitem/PaymentHistoryItem";
import CustomBack from "../../components/customBack/CustomBack";

const history = [
    {
        id: 1,
        name: "Chin Aw",
        amount: 1000,
        date: "3 days ago",
        phone: "09772188985",
        status: false,
    },
    {
        id: 2,
        name: "Salai Chin Aw",
        amount: 1000,
        date: "3 days ago",
        phone: "09772188985",
        status: true,
    },
    {
        id: 3,
        // name: "Chin Aw",
        amount: 1000,
        date: "3 days ago",
        phone: "09772188985",
        status: false,
    },
];

const PaymentHistory = () => {
    return (
        <div className="wrapCustomArrowAndHistory">

            <div className="customArrowBackInPayment">
                <CustomBack />
            </div>
        <div className="paymentHistory">
            {history.length === 0 && <h2>No history!</h2>}

            {history.map((item, index) => {
                return (
                    <PaymentHistoryItem key={index} item={item} index={index} />
                    );
                })}
        </div>
                </div>
    );
};

export default PaymentHistory;
