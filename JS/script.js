var notes = [];
const LOCAL_STORAGE_KEY_NOTES = "app.notes";

function start() {
    notes = fetchLocal();
    if (!notes) {
        notes = [];
        createNote();
    }
    loadStored();
}

function loadStored() {
    while (notes) {
        
    }
}

function deleteNote(id) {
    const elements = document.getElementsByClassName(id);
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element.remove();
    }
}

function createNote() {
    newNote = note();
    notes.push(newNote);
    document.getElementById("empty").insertAdjacentElement("beforebegin", newNote);
}

function constructNoteBody(id) {
    const newNote = document.createElement("div");
    const noteClasses = `box color note ${id}`;
    newNote.classList = noteClasses;
    return newNote;
}

function constructNoteTextbox(content) {
    const textbox = document.createElement("textarea")
    const textClasses = "box yellow";
    textbox.classList = textClasses;
    if (content) {
        textbox.innerHTML = content;
    }
    return textbox;
}

function constructTag(tagType, tagClass, tagAttrType, tagAttrVal, inputType, value) {
    const tag = document.createElement(tagType);
    tag.classList = tagClass;
    if (tagAttrType && tagAttrVal) {
        const tagAttr = document.createAttribute(tagAttrType);
        tagAttr.value = tagAttrVal;
        tag.setAttributeNode(tagAttr);
    }
    if (inputType) {
        const input = document.createAttribute("type");
        input.value = inputType;
        tag.setAttributeNode(input);
    }
    if (value) {
        const val = document.createAttribute("value");
        val.value = value;
        tag.setAttributeNode(val);
    }
    return tag;
}

function formatUnorderedList(id) {

}

function formatOrderedList(id) {

}

function formatNoList(id) {

}

function changeNoteColor(id) {

}

function fetchLocal() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_NOTES));
}

function storeLocal(list) {
    localStorage.setItem(LOCAL_STORAGE_KEY_NOTES, JSON.stringify(list));
}

function note(id = Date.now(), color = "#ecec36", content) {
    const newNote = constructNoteBody(id);
    const textbox = constructNoteTextbox(content);
    const tagCont = constructTag("div", "tags has-addons");
    const tags = [];
    tags.push(constructTag("button", "tag delete is-medium is-danger", "onclick", `deleteNote(${id})`));
    tags.push(constructTag("input", "tag", "onchange", `changeNoteColor(${id})`, "color", `${color}`));
    tags.push(constructTag("i", "fas fa-align-justify tag button", "onclick", `formatNoList(${id})`));
    tags.push(constructTag("i", "fas fa-list tag button", "onclick", `formatUnorderedList(${id})`));
    tags.push(constructTag("i", "fas fa-list-ol tag button", "onclick", `formatOrderedList(${id})`));
    for (let index = 0; index < tags.length; index++) {
        const curTag = tags[index];
        tagCont.appendChild(curTag);
    }
    newNote.appendChild(tagCont);
    newNote.appendChild(textbox);
    return newNote;
}