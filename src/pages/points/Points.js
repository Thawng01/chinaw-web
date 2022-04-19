import { useDispatch } from "react-redux";
import { useState } from "react";

import "./points.css";
import { addNewClaimPoint } from "../../store/actions/Point";
import useAuthContext from "../../hook/useAuthContext";
import Loading from "../../components/loading/Loading";

import { useUser } from "../../hook/useUser";

const Points = () => {
    const [kpay, setKpay] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState(1000);
    const [loading, setLoading] = useState(false);

    const userInfor = useUser();

    const { setMessage, dark } = useAuthContext();

    const dispatch = useDispatch();
    const claimPoint = async (e) => {
        e.preventDefault();

        if (kpay) {
            if (!phone || !name) {
                return setMessage({
                    text: "Please fill the required field",
                    type: "error",
                });
            }
        } else {
            if (!phone) {
                return setMessage({
                    text: "Please fill the required field",
                    type: "error",
                });
            }
        }

        if (userInfor?.points < amount) {
            return setMessage({
                text: "Your balance is insufficient",
                type: "error",
            });
        }

        setLoading(true);

        try {
            await dispatch(addNewClaimPoint(phone, amount, name));
            setMessage({
                text: "You have successfully submitted",
                type: "success",
            });
            setPhone("");
            setName("");
        } catch (error) {
            setMessage({ text: error.message, type: "error" });
        }

        setLoading(false);
    };

    return (
        <>
            <div className="pointContainer">
                {loading && <Loading title="Submitting..." />}
                <h2 className="pointAmountLabel">
                    Your Balance :
                    <span className="pointNum">
                        {" "}
                        {userInfor?.points} points
                    </span>
                </h2>
                <div className="pointInnerContainer">
                    <div className="paymentMethods">
                        <h3 className="paymentMethodsLabel">
                            Choose payment method
                        </h3>
                        <div className="paymentMethodBtns">
                            <button
                                style={{
                                    backgroundColor: kpay
                                        ? dark
                                            ? "#333"
                                            : "lightgray"
                                        : "#ff1a8c",
                                }}
                                onClick={() => setKpay(false)}
                                className="paymentTopUp"
                            >
                                Top up
                            </button>
                            <button
                                style={{
                                    backgroundColor: kpay
                                        ? "#ff1a8c"
                                        : dark
                                        ? "#333"
                                        : "lightgrey",
                                }}
                                onClick={() => setKpay(true)}
                                className="paymentKpay"
                            >
                                Kpay
                            </button>
                        </div>
                    </div>

                    <div className="paymentsContainer">
                        <div className="noteForPayment">
                            <p className="warnings">
                                Make sure that you correctly type your phone
                                number that you want to top up.
                            </p>
                            <p className="warnings">
                                For kpay, you must type your phone number and
                                your full name that you are currently using with
                                your Kpay accout. Your name and phone number
                                must be matching, otherwise you will not get
                                paid.
                            </p>
                        </div>

                        <form className="paymentInputs" onSubmit={claimPoint}>
                            <input
                                style={{
                                    backgroundColor: dark ? "#333" : "#f0f0f0",
                                    color: dark ? "#ccc" : "#f0f0f0",
                                }}
                                type="number"
                                placeholder="Phone number"
                                className="paymentInput"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {kpay && (
                                <input
                                    style={{
                                        backgroundColor: dark
                                            ? "#333"
                                            : "#f0f0f0",
                                        color: dark ? "#ccc" : "#f0f0f0",
                                    }}
                                    type="text"
                                    placeholder="Your full name"
                                    className="paymentInput"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            )}
                            <select
                                style={{
                                    backgroundColor: dark ? "#333" : "#f0f0f0",
                                    color: dark ? "#ccc" : "#000",
                                }}
                                name="amount"
                                id="amount"
                                className="paymentInput"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            >
                                <option value={1000}>1000</option>
                                <option value={2000}>2000</option>
                                <option value={3000}>3000</option>
                                <option value={5000}>5000</option>
                                <option value={7000}>7000</option>
                                <option value={10000}>10000</option>
                            </select>
                            <input
                                type="submit"
                                className="paymentSubmitBtn"
                                value="Withdraw"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Points;
