import { Outlet } from "react-router-dom";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NoteAPI } from "api/note-api";
import { setNoteList } from "store/notes/notes";
import s from './style.module.css';
export function App() {
  const dispatch = useDispatch();

  async function fetchNotes() {
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }
  // eslint-disable-next-line
  useEffect(() => {
    fetchNotes();
  }, []);

  return (<div>
    <Header />
    <div className={s.workspace} >
      <Outlet />
    </div>
  </div>
  )
}
