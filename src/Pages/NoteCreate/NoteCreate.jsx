import { NoteAPI } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNoteList } from "store/notes/notes";

export function NoteCreate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submit = async (formValues) => {
        const createNote = await NoteAPI.create({ ...formValues, created_at: new Date().toLocaleDateString() });
        dispatch(addNoteList(createNote));
        navigate("/");

    }
    return (<div><NoteForm title="Create a new note" onClickSubmit={submit} /></div>)
}