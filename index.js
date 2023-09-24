const createNewButton = document.getElementById("createNote");
const deleteAllBtn = document.getElementById("deleteAll");
const noteContainer = document.getElementById("noteContainer");

createNewButton.addEventListener("click", addNewSingleNote);

deleteAllBtn.addEventListener("click", clearOldNotes);

function createSingleElement(id, title) {
  const textAreaElement = document.createElement("textarea");
  const singleNoteElement = document.createElement("div");
  singleNoteElement.classList.add("singleNote");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("btns");

  const saveBtn = document.createElement("button");
  saveBtn.setAttribute("id", "saveBtn");
  saveBtn.innerText = "Save";
  saveBtn.addEventListener("click", () => {
    saveFunction(id, textAreaElement.value);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("id", "deleteBtn");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", () => {
    deleteOneNote(id, singleNoteElement);
  });

  buttonContainer.append(saveBtn, deleteBtn);

  textAreaElement.value = title;
  singleNoteElement.append(textAreaElement, buttonContainer);
  return singleNoteElement;
}

function addNewSingleNote() {
  const storedNote = getStoredNotes();
  const singleNoteElement = createSingleElement(Date.now(), "");
  noteContainer.append(singleNoteElement);
  storedNote.push({ id: Date.now(), title: "" });
  storeStickyNote(storedNote);
}

function getStoredNotes() {
  if (localStorage.getItem("my-note")) {
    return JSON.parse(localStorage.getItem("my-note"));
  } else return [];
}

function storeStickyNote(notes) {
  localStorage.setItem("my-note", JSON.stringify(notes));
}

function clearOldNotes() {
  localStorage.removeItem("my-note");
  if (noteContainer.firstChild) {
    while (noteContainer.firstChild) {
      noteContainer.removeChild(noteContainer.firstChild);
    }
  }
}

function deleteOneNote(id, element) {
  const notes = getStoredNotes().filter((note) => note.id != id);
  storeStickyNote(notes);
  noteContainer.removeChild(element);
}

function saveFunction(id, title) {
  const notes = getStoredNotes();
  const savedEl = notes.find((n) => n.id == id);
  savedEl.title = title;
  storeStickyNote(notes);
}

getStoredNotes().forEach((note) => {
  const allNotes = createSingleElement(note.id, note.title);
  noteContainer.append(allNotes);
});
