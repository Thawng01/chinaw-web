import { useState } from "react";

import "./points.css";

const Points = () => {
    const [paymentMethod, setPaymentMethod] = useState(false);

    return (
        <>
            <div className="pointContainer">
                <h2 className="pointAmountLabel">
                    Your Balance :<span className="pointNum"> 270 points</span>
                </h2>
                <div className="pointInnerContainer">
                    <div className="paymentMethods">
                        <h3 className="paymentMethodsLabel">
                            Choose payment method
                        </h3>
                        <div className="paymentMethodBtns">
                            <button
                                style={{
                                    backgroundColor: paymentMethod
                                        ? "lightgrey"
                                        : "#ff1a8c",
                                }}
                                onClick={() => setPaymentMethod(false)}
                                className="paymentTopUp"
                            >
                                Top up
                            </button>
                            <button
                                style={{
                                    backgroundColor: paymentMethod
                                        ? "#ff1a8c"
                                        : "lightgrey",
                                }}
                                onClick={() => setPaymentMethod(true)}
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
                        <div className="paymentInputs">
                            <input
                                type="text"
                                placeholder="Phone number"
                                className="paymentInput"
                            />
                            {paymentMethod && (
                                <input
                                    type="text"
                                    placeholder="Your full name"
                                    className="paymentInput"
                                />
                            )}
                            <select
                                name="amount"
                                id="amount"
                                className="paymentInput"
                            >
                                <option value={1000}>1000</option>
                                <option value={2000}>2000</option>
                                <option value={3000}>3000</option>
                                <option value={5000}>5000</option>
                                <option value={7000}>7000</option>
                                <option value={10000}>10000</option>
                            </select>
                            <button className="paymentSubmitBtn">
                                Withdraw
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Points;
