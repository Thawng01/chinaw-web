import { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import "./fqasItem.css";

const FqasItem = ({ item, index }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    return (
        <>
            <div
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
                <div className="fqasAccordionDesc">{item.content}</div>
            )}
        </>
    );
};

export default FqasItem;
