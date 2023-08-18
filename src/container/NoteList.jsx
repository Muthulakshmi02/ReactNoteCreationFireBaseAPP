import { TextCard } from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";
import s from './style.module.css';
import { NoteAPI } from "api/note-api";
import { useDispatch } from "react-redux";
import { deleteNoteList } from "store/notes/notes";


export function NoteList({ noteListData }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function deleteByID(note) {
        if (window.confirm("Are you sure to delete ?")) {
            await NoteAPI.deleteById(note.id);
            dispatch(deleteNoteList(note));
        }
    }
    return (
        <div className={`row justify-content-center ${s.cards_container}`}>

            {noteListData.map((note) => (

                <div key={note.id} className={s.card_container} >
                    <TextCard title={note.title} subtitle={note.created_at} content={note.content} onCardClick={() => { navigate("/note/" + note.id) }} onTrashClick={() => deleteByID(note)} />
                </div>

            )
            )}
        </div>
    )
}