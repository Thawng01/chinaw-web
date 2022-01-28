import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../db/db";

import FqasItem from "../../components/fqasItem/FqasItem";
import "./faqs.css";
import { useEffect, useState } from "react";

const Faqs = () => {
    const [fqas, setFqas] = useState();

    useEffect(() => {
        const getFqas = async () => {
            const q = query(collection(db, "FAQs"), orderBy("date", "asc"));

            const fqas = await getDocs(q);
            const result = fqas.docs.map((doc) => doc.data());
            setFqas(result);
        };

        getFqas();
    }, []);

    return (
        <div className="faqsContainer">
            {fqas?.map((item, index) => {
                return <FqasItem key={index} item={item} index={index} />;
            })}
        </div>
    );
};

export default Faqs;
