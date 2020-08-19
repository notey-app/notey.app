import React, { useEffect, useState } from "react";
import qs from "qs";
import CreateNote from "../components/modal/CreateNote";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";
import AlertMessage from "../components/AlertMessage";
import { AppLayout } from "../styles/Global";
import { connect } from "react-redux";
import { checkAuth } from "../actions/auth";
import {
  getActiveNote,
  getNotes,
  deleteNoteById,
  updateNoteById,
} from "../actions/notes";

const App = ({
  getNotes,
  getActiveNote,
  notes,
  note,
  location,
  deleteNoteById,
  updateNoteById,
}) => {
  const noteId = qs.parse(location.search, { ignoreQueryPrefix: true }).noteId;
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    getNotes();
    getActiveNote(noteId);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [getNotes, getActiveNote, noteId, setLoading]);

  useEffect(() => {
    if (editing) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setEditing(!editing);
          setNoteBody(note && note.body);
          setNoteTitle(note && note.title);
        }
      });
    }
  }, [editing, setEditing, note]);

  const deleteNote = (id) => {
    if (editing) {
      setEditing(false);
    }
    deleteNoteById(id);
    getActiveNote(notes[0]);

    setAlertMsg("Note was successfully deleted.");
  };

  const editNote = (saving, id) => {
    if (saving === "save") {
      if (noteTitle.length > 40) {
        return setAlertMsg("Note title has a limit of 40 characters.");
      }
      if (noteTitle === "") {
        return setAlertMsg("Note title can not be empty");
      }
      if (noteBody === "") {
        return setAlertMsg("Note body can not be empty");
      }

      updateNoteById(id, { title: noteTitle, body: noteBody });
      setAlertMsg("Note was successfully edited!");
    }

    setEditing(!editing);
  };

  // Clear alert message
  useEffect(() => {
    if (alertMsg !== "") {
      setTimeout(() => {
        setAlertMsg("");
      }, 3000);
    }
  }, [alertMsg]);

  return (
    <>
      <CreateNote />
      <AppLayout>
        <AlertMessage active={alertMsg !== ""} message={alertMsg} />
        <Sidebar
          deleteNote={deleteNote}
          loading={loading}
          notes={notes}
          activeNote={note}
        />
        <Main
          editNote={editNote}
          editing={editing}
          notes={notes}
          deleteNote={deleteNote}
          loading={loading}
          activeNote={note}
          noteBody={noteBody}
          noteTitle={noteTitle}
          setNoteBody={setNoteBody}
          setNoteTitle={setNoteTitle}
        />
      </AppLayout>
    </>
  );
};

const mapStateToProps = (state) => ({
  notes: state.note.notes,
  note: state.note.note,
});

export default connect(mapStateToProps, {
  checkAuth,
  getNotes,
  getActiveNote,
  deleteNoteById,
  updateNoteById,
})(App);
