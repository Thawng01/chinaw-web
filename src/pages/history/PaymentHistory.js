import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./history.css";
import PaymentHistoryItem from "../../components/paymenthistoryitem/PaymentHistoryItem";
import CustomBack from "../../components/customBack/CustomBack";
import { fetchPointClaim } from "../../store/actions/Point";
import useAuthContext from "../../hook/useAuthContext";

const PaymentHistory = () => {
    const points = useSelector((state) => state.point.points);

    const { user } = useAuthContext();

    const dispatch = useDispatch();

    useEffect(() => {
        const getPointClaim = async () => {
            try {
                await dispatch(fetchPointClaim(user));
            } catch (error) {
                console.log(error.message);
            }
        };

        getPointClaim();
    }, [user, dispatch]);

    return (
        <div className="wrapCustomArrowAndHistory">
            <div className="customArrowBackInPayment">
                <CustomBack />
            </div>
            <div className="paymentHistory">
                {points.length === 0 && <h2>No history!</h2>}

                {points.map((item, index) => {
                    return (
                        <PaymentHistoryItem
                            key={index}
                            item={item}
                            index={index}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PaymentHistory;
