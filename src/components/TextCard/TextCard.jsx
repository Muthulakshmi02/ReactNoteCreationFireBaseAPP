import { useState } from "react";
import s from "./style.module.css";
import { Trash } from "react-bootstrap-icons";

export function TextCard({ title, subtitle, content, onCardClick, onTrashClick }) {
    const [isCardHover, setCardHover] = useState(false);
    const [isTrashHover, setTrashHover] = useState(false);
    function onTrashEvent(e) {
        onTrashClick();
        e.stopPropagation();
    }

    return (
        <div className={`card ${s.container}`} onClick={onCardClick} style={{ borderColor: isCardHover ? "#0000FF" : "transparent" }} onMouseEnter={() => setCardHover(true)} onMouseLeave={() => setCardHover(false)}>
            <div className="card-body">
                <div className={s.title}>
                    <h5 className="card-title">{title}</h5>
                    <Trash size={20} style={{ color: isTrashHover ? "#FF0000" : "transparent" }} onMouseEnter={() => setTrashHover(true)} onMouseLeave={() => setTrashHover(false)} onClick={onTrashEvent} />
                </div>
                <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
                <p className={`card-text ${content}`}>{content}</p>

            </div>
        </div >
    )
}

/*

    return (
        <div
            onClick={onClick}
            className={`card ${s.container}`}
            style={{ borderColor: isCardHovered ? "#0d6efd" : "transparent" }}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
        >
            <div className="card-body">
                <div className={s.title_row}>
                    <h5 className="card-title">{title}</h5>
                    <Trash
                        size={20}
                        onMouseEnter={() => setIsTrashHovered(true)}
                        onMouseLeave={() => setIsTrashHovered(false)}
                        style={{ color: isTrashHovered ? "#FF7373" : "#b8b8b8" }}
                        onClick={onClickTrash_}
                    />
                </div>
                <h6 className={`card-subtitle mb-2 text-muted`}>{subtitle}</h6>
                <p className={`card-text ${s.text_content}`}>{content}</p>
            </div>
        </div>
    );
} */