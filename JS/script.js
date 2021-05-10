function deleteNote() {
    document.activeElement.parentElement.remove();
}

function createNote() {
    newNote = constructNote();
    document.getElementById("plus").insertAdjacentElement("beforebegin", newNote);
}

function constructNote() {
    const newNote = constructNoteBody();
    const textbox = constructNoteTextbox();
    const deleteButton = constructDeleteButton();
    newNote.appendChild(textbox);
    newNote.appendChild(deleteButton);
    return newNote;
}

function constructNoteBody() {
    const newNote = document.createElement("div");
    const noteClasses = "box yellow";
    newNote.classList = noteClasses;
    return newNote;
}

function constructNoteTextbox() {
    const textbox = document.createElement("textarea")
    const textClasses = "box yellow";
    textbox.classList = textClasses;
    return textbox;
}

function constructDeleteButton() {
    const deleteButton = document.createElement("button");
    const delButtAttr = document.createAttribute("onclick");
    const delButtClasses = "delete";
    delButtAttr.value = "deleteNote()";
    deleteButton.classList = delButtClasses;
    deleteButton.setAttributeNode(delButtAttr);
    return deleteButton;
}