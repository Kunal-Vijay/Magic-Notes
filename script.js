console.log("welcome to notes app");

//calling show notes to show previous notes stored in local storage 

//Add Note button clicked
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    //parsing notes from Text area | 1 note = 1 element of array
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    //pushing note in notes obj array
    notesObj.push(addTxt.value);
    //assign local storage to the note 
    localStorage.setItem("notes", JSON.stringify(notesObj));
    //clearing Text area after the note is added 
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
});


//Function to show notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    //creating note card for each element in noteObj array
    notesObj.forEach(function (element, index) {
        //+= used for append cards in DOM
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text"> ${element}</p>
                <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`;
    });
    //adding notes card (html)inside the notes class
    let notesElem = document.getElementById('notes');
    if (notes.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `Nothing to show! Use "Add a note `;
    }
}

//Function to delete notes
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    //deleting element form notesObj array using spice function
    notesObj.splice(index, 1);
    //adding the modified array to localStorage again
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    //converting input value to lowercase to make search case insensitive
    let inputVal = search.value.toLowerCase();
    //getting elements with have class name notecard
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
