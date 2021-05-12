function deleteNote() {
    document.activeElement.parentElement.remove();
}

function createNote() {
    newNote = new Note;
    document.getElementById("plus").insertAdjacentElement("beforebegin", newNote);
}

function constructNoteBody(noteID) {
    const newNote = document.createElement("div");
    const noteClasses = "box yellow fill";
    newNote.classList = noteClasses;
    newNote.id = noteID;
    return newNote;
}

function constructNoteTextbox() {
    const textbox = document.createElement("textarea")
    const textClasses = "box yellow";
    textbox.classList = textClasses;
    return textbox;
}

function constructTag(tagType, tagClass, tagAttrType, tagAttrVal, inputType) {
    const tag = document.createElement(tagType);
    const tagAttr = document.createAttribute(tagAttrType);
    tagAttr.value = tagAttrVal;
    tag.classList = tagClass;
    tag.setAttributeNode(tagAttr);
    return tag;
}

function formatUnorderedList() {

}

function formatOrderedList() {

}

function formatNoList() {

}

class Note {
    constructor() {
        const newNote = constructNoteBody(Date.now());
        const textbox = constructNoteTextbox();
        const tagCont = constructTag("div", "tags has-addons");
        const delButt = constructTag("button", "tag delete is-medium is-danger", "onclick", "deleteNote()");
        const colPick = constructTag("input")
        tagCont.appendChild(tags)
        newNote.appendChild(tagCont);
        newNote.appendChild(textbox);
        return newNote;
    }
}