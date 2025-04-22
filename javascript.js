const myLibrary = [];
const addButton = document.querySelector("#addButton");
const closeButton = document.querySelector("#closeButton");
const submitButton = document.querySelector("#submitButton");
const newBookForm = document.querySelector(".new-book-form");
const bookShelf = document.querySelector(".book-shelf");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const dialogForm = document.querySelector(".dialog-form");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uuid = crypto.randomUUID();
}

let displayCards = () => {
    bookShelf.innerHTML = myLibrary
        .map(
            (book) =>
                `<div class='bookCards'>
            <h4 class='bookTitle'>${book.title}</h4>
            <h4 class='bookAuthor'>By:  ${book.author}</h4>
            <h4 class='bookPages'>${book.pages} pages</h4>
            <h4 class='bookRead'>${book.read ? `Read` : `Not Read`}</h4>
            <div id='${book.uuid}' class='bookCardButtons'>
                <button class='deleteButtons buttons'>Delete</button>
                <button class='editButtons buttons'>Edit Read</button>
            </div>
        </div>`
        )
        .join("");
    delete_edit();
};

let addBook = (title, author, pages, read) => {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

let editBook = (arr, id) => {
    const bookIdIndex = arr.findIndex((obj) => obj.uuid === id);
    if (arr[bookIdIndex].read == false) {
        arr[bookIdIndex].read = true;
    } else {
        arr[bookIdIndex].read = false;
    }
    return arr;
};

let removeBook = (arr, id) => {
    const objIdIndex = arr.findIndex((obj) => obj.uuid === id);
    arr.splice(objIdIndex, 1);
    return arr;
};

let delete_edit = () => {
    const buttonDiv = document.querySelectorAll(".bookCardButtons");
    buttonDiv.forEach((button) => {
        const deleteButton = button.querySelector(".deleteButtons");
        const editButton = button.querySelector(".editButtons");
        deleteButton.addEventListener("click", () => {
            removeBook(myLibrary, button.id);
            displayCards();
        });
        editButton.addEventListener("click", (event) => {
            editBook(myLibrary, button.id);
            displayCards();
        });
    });
};

addButton.addEventListener("click", () => {
    dialogForm.showModal();
});

closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialogForm.close();
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    let bTitle = titleInput.value;
    let bAuthor = authorInput.value;
    let bPages = pagesInput.value;
    let bRead = readInput.checked;
    addBook(bTitle, bAuthor, bPages, bRead);

    /* input reset */
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;

    /* make hidden */
    displayCards();
    dialogForm.close();
});

/*placeholders*/
addBook("The Nightingale", "Kristen Hannah", "564", true);
addBook("Bright Young Women", "Jessica Knoll", "384", true);
addBook("The Frozen River", "Ariel Lawhon", "432", false);
displayCards();
