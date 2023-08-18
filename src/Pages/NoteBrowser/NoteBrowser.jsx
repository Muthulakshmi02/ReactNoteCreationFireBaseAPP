import { NoteList } from "container/NoteList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SearchBar } from "components/SearchBar/SearchBar";
import { useState } from "react";

export function NoteBrowser() {
    const noteListData = useSelector((store) => store.noteSlice.noteList);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredNoteList = noteListData.filter((note) => {
        const containTitle = note.title.trim().toUpperCase().includes(searchTerm.trim().toUpperCase());
        const containContent = note.content.trim().toUpperCase().includes(searchTerm.trim().toUpperCase());
        return containTitle || containContent;
    })
    return (<div>
        <div className="row justify-content-center mb-5">
            <div className="col-sm-12 col-md-4">
                <SearchBar onTextChange={setSearchTerm} placeholder="Search your notes" />
            </div>
        </div>
        {noteListData?.length === 0 && (
            <div className="d-flex justify-content-center">
                <span> You dont have any note. Please
                    <Link to="/note/new/"> create</Link>
                </span>
            </div>
        )}
        <NoteList noteListData={filteredNoteList} />
    </div>
    )
}