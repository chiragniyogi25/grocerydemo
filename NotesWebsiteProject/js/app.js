console.log('Welcome to notes app.This is app.js');

showNotes();//after reloading all notes will be displayed

//if user adds a note,add it to the localStorage
let addBtn = document.getElementById('addBtn');//to access the button 'Add Note'
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById('addTxt');//to access textarea
    let addTitle = document.getElementById('addTitle');//to access textarea
    let notes = localStorage.getItem("notes");//receives Collection of notes array
    
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    
    let myObj = {
        "title":addTitle.value,
        "text":addTxt.value
    };

    notesObj.push(myObj);//textarea data is been pushed to the array notes and updated
    localStorage.setItem("notes", JSON.stringify(notesObj));//array of objects
    //updating the changed value in the array and setting it into localStorage of the website
    addTxt.value = "";//clearing the textarea variable after updating
    addTitle.value="";
    // console.log(notesObj);
    showNotes();
})


//function to show elemennts from localStorage
function showNotes() {
    
    let notes = localStorage.getItem("notes");//taking value from localStorage and displaying into website
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    
    let html = "";

    notesObj.forEach(function (element, index) {
        // appending the cards that are present in localStorage to html varaiable
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id = "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
        //this.id holds the value of the id in that particular elemnt where it is clicked
        //passing index of the notesObj array to function deleteNote(index)
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `No Notes Available`;
    }
}


//function to delete a note
function deleteNote(index) {
    // console.log('I am deleting', index);
    let notes = localStorage.getItem("notes");//receives Collection of notes array
    
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    //each time letters are deleted or written this event is called
    let inputVal=search.value.toLowerCase();
    // console.log('Input event Fired',inputVal);
    let noteCards = document.getElementsByClassName('noteCard');//getting the collection of noteCards
    // let inputdiv = document.getElementById('gui'); 

    Array.from(noteCards).forEach(function(element){
        let titleTxt = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();//getting the paragraph 1st element within the card
        //innerText is used to get the string
        //to get the text
        // console.log(cardTxt,typeof cardTxt);
        if(cardTxt.includes(inputVal)||titleTxt.includes(inputVal)){
            element.style.display="block";
            // inputdiv.style.display="none";

        }else{
            element.style.display="none";
        }

    })
})