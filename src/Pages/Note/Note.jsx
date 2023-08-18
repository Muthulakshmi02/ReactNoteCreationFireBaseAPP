import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useState } from "react";
import { NoteAPI } from "api/note-api";
import { deleteNoteList, updateNoteList } from "store/notes/notes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Note(props) {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const note = useSelector((store) => store.noteSlice.noteList.find((note) => note.id === noteId));
    console.log(note);
    const [isEditable, setIsEditable] = useState(false);
    const navigate = useNavigate();
    const submit = async (formValues) => {
        const updateNote = await NoteAPI.updateById(note.id, formValues);
        dispatch(updateNoteList(updateNote));
        setIsEditable(false)
    }
    const deleteByID = async (formValues) => {
        if (window.confirm("Are you sure to delete ?")) {
            await NoteAPI.deleteById(note.id, formValues);
            dispatch(deleteNoteList(note));
            navigate("/");
        }
    }
    return <>
        {note && <NoteForm isEditable={isEditable} title={isEditable ? "Edit Note" : note.title} note={note} onClickEdit={() => setIsEditable(!isEditable)} onClickDelete={deleteByID} onClickSubmit={isEditable && submit} />}
    </>
}