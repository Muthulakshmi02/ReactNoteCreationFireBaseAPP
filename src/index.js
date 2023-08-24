import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { ProtectedApp } from "App";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Note } from "Pages/Note/Note";
import { NoteBrowser } from "Pages/NoteBrowser/NoteBrowser";
import { NoteCreate } from "Pages/NoteCreate/NoteCreate";
import { PageNotFound } from "Pages/PageNotFound/PageNotFound";
import { SignIn } from "Pages/SignIn/SignIn";
import { SignUp } from "Pages/SignUp/SignUp";
import { FirebaseApp } from "validator/firebase";
import { PersistGate } from "redux-persist/lib/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
FirebaseApp.init();

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<ProtectedApp />} >
              <Route path="/" element={<NoteBrowser />} />
              <Route path="/note/:noteId" element={<Note />} />
              <Route path="/note/new" element={<NoteCreate />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
