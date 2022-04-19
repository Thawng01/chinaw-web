import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../db/db";

import FqasItem from "../../components/fqasItem/FqasItem";
import "./faqs.css";
import { useEffect, useState } from "react";
import useAuthContext from "../../hook/useAuthContext";

const Faqs = () => {
    const [fqas, setFqas] = useState();
    const { setMessage } = useAuthContext();

    useEffect(() => {
        const getFqas = async () => {
            try {
                const q = query(collection(db, "FAQs"), orderBy("date", "asc"));

                const fqas = await getDocs(q);
                const result = fqas.docs.map((doc) => doc.data());
                setFqas(result);
            } catch (error) {
                setMessage({ text: error.message, type: "error" });
            }
        };

        getFqas();
    }, [setFqas, setMessage]);

    return (
        <div className="faqsContainer">
            {fqas?.map((item, index) => {
                return <FqasItem key={index} item={item} index={index} />;
            })}
        </div>
    );
};

export default Faqs;
