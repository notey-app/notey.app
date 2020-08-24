import React, { useEffect } from "react";
import { NoteStyle, NotePreview, NoteTextArea } from "../../styles/Notes";

const Note = ({ note, editing, noteBody, setNoteBody }) => {
  useEffect(() => {
    setNoteBody(note && note.body);
  }, [note, setNoteBody]);

  return (
    <NoteStyle>
      {note && note.body ? (
        editing ? (
          <EditingArea setNoteBody={setNoteBody} noteBody={noteBody} />
        ) : (
          <NotePreview
            dangerouslySetInnerHTML={{ __html: note && note.markdown }}
          ></NotePreview>
        )
      ) : (
        ""
      )}
    </NoteStyle>
  );
};

const EditingArea = ({ setNoteBody, noteBody }) => {
  return (
    <NoteTextArea
      spellCheck={false}
      onChange={(e) => setNoteBody(e.target.value)}
      value={noteBody ? noteBody : ""}
      id="note-text-area"
    ></NoteTextArea>
  );
};

export default Note;
