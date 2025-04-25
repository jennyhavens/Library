const addButton = document.querySelector("#addButton");
const closeButton = document.querySelector("#closeButton");
const submitButton = document.querySelector("#submitButton");
const newBookForm = document.querySelector(".new-book-form");
const bookShelf = document.querySelector(".book-shelf");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

class Book {
    title = "";
    author = "";
    pages = "";
    read = false;
    uuid = -1;

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.uuid = crypto.randomUUID();
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
    }

    addBook(book) {
        this.myLibrary.push(book);
        this.displayCards();
    }

    displayCards() {
        if (!bookShelf) {
            console.error(
                `Library::displayCards:: Failed to find bookshelf in document. Is it missing?`,
                document
            );
            return;
        }

        bookShelf.innerHTML = this.myLibrary
            .map(
                (book) =>
                    `<div class='bookCards'>
                        <h4 class='bookTitle'>${book.title}</h4>
                        <h4 class='bookAuthor'>By:  ${book.author}</h4>
                        <h4 class='bookPages'>${book.pages} pages</h4>
                        <h4 class='bookRead'>${
                            book.read ? `Read` : `Not Read`
                        }</h4>
                        <div id='${book.uuid}' class='bookCardButtons'>
                            <button class='deleteButtons buttons' onclick="library.removeBook('${
                                book.uuid
                            }')">Delete</button>
                            <button class='editButtons buttons' onclick="library.editBook('${
                                book.uuid
                            }')">Edit Read</button>
                        </div>
                    </div>`
            )
            .join("");
    }

    editBook(id) {
        const bookIdIndex = this.myLibrary.findIndex((obj) => obj.uuid === id);
        if (bookIdIndex !== -1) {
            this.myLibrary[bookIdIndex].read =
                !this.myLibrary[bookIdIndex].read;
            this.displayCards();
        }
    }

    removeBook(id) {
        const objIdIndex = this.myLibrary.findIndex((obj) => obj.uuid === id);
        if (objIdIndex !== -1) {
            this.myLibrary.splice(objIdIndex, 1);
            this.displayCards();
        }
    }
}

const library = new Library();

addButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = pagesInput.value.trim();
    const read = readInput.checked;

    // Validate inputs
    if (title && author && pages) {
        const newBook = new Book(title, author, pages, read);
        library.addBook(newBook);
        newBookForm.reset();
    } else {
        alert("Please fill in all fields.");
    }
});

// Adding a sample book
library.addBook(new Book("The Nightingale", "Kristen Hannah", "564", true));
