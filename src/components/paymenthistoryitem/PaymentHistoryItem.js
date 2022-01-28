
import { useState } from 'react';
import './paymentHistoryItem.css'

import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md'

const PaymentHistoryItem = ({ item, index }) => {
    
    const [activeIndex, setActiveIndex] = useState(null)

    return <div className="paymentHistoryItem">
        <div className="paymentHistoryItemContainer" onClick={() => setActiveIndex(index=== activeIndex ? null : index)} >
            <span className="paymentHistoryUsername">{item.name ? item.name : item.phone}</span>
            <span style={{color: item.status ? "green" : 'red'}} className="paymentStutas">{item.status ? "Paid" : "Pending"}</span>
            <span className="paymentAmount">{item.amount}</span>
        </div>
        {index === activeIndex ? <MdKeyboardArrowUp className='paymentHistoryIcon' />
            : <MdKeyboardArrowDown className='paymentHistoryIcon' />}

        {index === activeIndex && <div className="paymentHistoryDetails">
            {item?.name && <div className="paymentHistoryDetailContainer">
                <span className="paymentHistoryLabel">Name</span>
                <span className="paymentHistoryValue">{item.name}</span>
             </div>}
            <div className="paymentHistoryDetailContainer">
                <span className="paymentHistoryLabel">Amount</span>
                <span className="paymentHistoryValue">{item.amount} mmk</span>
             </div>
            <div className="paymentHistoryDetailContainer">
                <span className="paymentHistoryLabel">Phone</span>
                <span className="paymentHistoryValue">{item.phone}</span>
             </div>
            <div className="paymentHistoryDetailContainer">
                <span className="paymentHistoryLabel">Type</span>
                <span className="paymentHistoryValue">{item.name ? "Kpay" : "Phone bill"}</span>
             </div>
            <div className="paymentHistoryDetailContainer">
                <span className="paymentHistoryLabel">Date</span>
                <span className="paymentHistoryValue">{item.date}</span>
             </div>
            <div className="paymentHistoryDetailContainer">
                <span className="paymentHistoryLabel">Status</span>
                <span style={{color: item.status ? "green" : 'red'}} className="paymentHistoryValue">{item.status ? "Paid" : "Pending"}</span>
             </div>
        </div>}
    </div>;
};

export default PaymentHistoryItem;
