import { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import useAuthContext from "../../hook/useAuthContext";
import "./fqasItem.css";

const FqasItem = ({ item, index }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const { dark } = useAuthContext();
    return (
        <>
            <div
                style={{ backgroundColor: dark ? "#333" : "#f0f0f0" }}
                className="fqasAccordion"
                onClick={() =>
                    setActiveIndex(index === activeIndex ? null : index)
                }
            >
                <span className="accordionLabel">{item.title}</span>
                {index === activeIndex ? (
                    <MdRemove className="accordionIcon" />
                ) : (
                    <MdAdd className="accordionIcon" />
                )}
            </div>
            {index === activeIndex && (
                <div
                    style={{ backgroundColor: dark ? "#333" : "#f0f0f0" }}
                    className="fqasAccordionDesc"
                >
                    {item.content}
                </div>
            )}
        </>
    );
};

export default FqasItem;
