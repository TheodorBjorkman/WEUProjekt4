var notes = [];
var storedNotes = [];
const LOCAL_STORAGE_KEY_NOTES = "app.notes";

function start() {
    storedNotes = fetchLocal();
    if (!storedNotes || storedNotes.length < 1) {
        storedNotes = [];
        createNote();
        return;
    }
    loadStored();
}

function loadStored() {
    for (let index = 0; index < storedNotes.length; index++) {
        let note = storedNotes.shift();
        let noteArray = note.split(".");
        console.log(noteArray[1]);
        createNote(noteArray[0], noteArray[1], noteArray[2]);
    }
}

function deleteNote(id) {
    const elements = document.getElementsByClassName(id);
    for (let index = 0; index == storedNotes.length || index < storedNotes.length; index++) {
        const element = storedNotes.shift();
        var elementArray = element.split(".");
        if (elementArray[0] != id) {
            storedNotes.push(element);
        }
    }
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element.remove();
    }
    storeLocal(storedNotes);
}

function createNote(id = Date.now(), color = "#ecec36", content = "") {
    newNote = note(id, color, content);
    notes.push(newNote);
    storedNotes.push(`${id}.${color}.${content}`);
    storeLocal(storedNotes);
    document.getElementById("empty").insertAdjacentElement("beforebegin", newNote);
    changeNoteColor(id);
}

function constructNoteBody(id) {
    const newNote = document.createElement("div");
    const noteClasses = `box color note ${id}`;
    newNote.classList = noteClasses;
    newNote.id = id;
    return newNote;
}

function constructNoteTextbox(content, id) {
    const textbox = document.createElement("textarea");
    const textClasses = "box";
    const attr = document.createAttribute("onchange");
    const attrVal = `saveText(${id})`;
    attr.value = attrVal;
    textbox.setAttributeNode(attr);
    textbox.classList = textClasses;
    textbox.id = `textbox${id}`;
    if (content) {
        textbox.innerHTML = content;
    }
    return textbox;
}

function constructTag(tagType, tagClass, tagAttrType, tagAttrVal, inputType, value, id) {
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
    if (id) {
        tag.id = id;
    }
    return tag;
}

function changeNoteColor(id) {
    const note = document.getElementById(id);
    const colorChanger = document.getElementById(`colorChanger${id}`);
    const color = colorChanger.value;
    note.style.backgroundColor = color;
    for (let index = 0; index < storedNotes.length; index++) {
        let element = storedNotes[index];
        elementArray = element.split(".");
        if (elementArray[0] == id) {
            elementArray[1] = color;
            element = elementArray.join(".");
            storedNotes[index] = element;
            storeLocal(storedNotes);
            return;
        }
    }
}

function fetchLocal() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_NOTES));
}

function storeLocal(list) {
    localStorage.setItem(LOCAL_STORAGE_KEY_NOTES, JSON.stringify(list));
}

function note(id, color, content) {
    const newNote = constructNoteBody(id);
    const textbox = constructNoteTextbox(content, id);
    const textdiv = document.createElement("div");
    textdiv.classList = `text ${id}`;
    const tagCont = constructTag("div", "tags has-addons");
    const tags = [];
    tags.push(constructTag("button", "tag delete is-medium is-danger", "onclick", `deleteNote(${id})`));
    tags.push(constructTag("input", "tag", "onchange", `changeNoteColor(${id})`, "color", `${color}`, `colorChanger${id}`));
    // tags.push(constructTag("i", "fas fa-align-justify tag button", "onclick", `formatNoList(${id})`));
    // tags.push(constructTag("i", "fas fa-list tag button", "onclick", `formatUnorderedList(${id})`));
    // tags.push(constructTag("i", "fas fa-list-ol tag button", "onclick", `formatOrderedList(${id})`));
    for (let index = 0; index < tags.length; index++) {
        const curTag = tags[index];
        tagCont.appendChild(curTag);
    }
    newNote.appendChild(tagCont);
    newNote.appendChild(textdiv);
    newNote.appendChild(textbox);
    return newNote;
}

function saveText(id) {
    const content = document.getElementById(`textbox${id}`).value;
    for (let index = 0; index < storedNotes.length; index++) {
        let element = storedNotes[index];
        elementArray = element.split(".");
        if (elementArray[0] == id) {
            elementArray[2] = content;
            element = elementArray.join(".");
            storedNotes[index] = element;
            storeLocal(storedNotes);
            return;
        }
    }
}

// function formatUnorderedList(id) {

// }

// function formatOrderedList(id) {

// }

// function formatNoList(id) {

// }