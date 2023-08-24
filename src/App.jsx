import { Outlet } from "react-router-dom";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NoteAPI } from "api/note-api";
import { setNoteList } from "store/notes/notes";
import s from './style.module.css';
import { withAuthRequired } from "hoc/withAuthRequired";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useNavigate } from "react-router-dom";

export function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchNotes() {
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }
  // eslint-disable-next-line
  useEffect(() => {

    // fetchNotes();
    // To sync all user change 
    const unsub = NoteAPI.onShouldSyncNotes(fetchNotes);
    return () => {
      unsub();
    }
  }, []);

  return (<div>
    <Header />
    <ButtonPrimary className={s.buttonAdd} onClick={() => navigate("/note/new")}> +</ButtonPrimary>
    <div className={s.workspace} >
      <Outlet />
    </div>
  </div>
  )
}

export const ProtectedApp = withAuthRequired(App);