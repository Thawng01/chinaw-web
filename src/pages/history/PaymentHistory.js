import "./history.css";

import PaymentHistoryItem from "../../components/paymenthistoryitem/PaymentHistoryItem";
import CustomBack from "../../components/customBack/CustomBack";
import { useDispatch, useSelector } from "react-redux";
import { fetchPointClaim } from "../../store/actions/Point";
import { AuthContext } from "../../components/auth/AuthContext";
import { useContext, useEffect } from "react";

const PaymentHistory = () => {
    const points = useSelector((state) => state.point.points);

    const { user } = useContext(AuthContext);

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
    }, [user]);

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
