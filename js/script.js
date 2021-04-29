function createBook(title, author, isbn) {
    return { title: title, author: author, isbn: isbn };
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector("#book-list");
  
      const row = document.createElement("tr");
  
      row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete" style="background-color: red !important;">X</a></td>
        `;
  
      list.appendChild(row);
    }
  
    static deleteBook(el) {
      if (el.classList.contains("delete")) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static clearFields() {
      document.querySelector("#title").value = "";
      document.querySelector("#author").value = "";
      document.querySelector("#isbn").value = "";
    }
  }
  
  // Event: Display Books
  document.addEventListener("DOMContentLoaded", UI.displayBooks);
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if (localStorage.getItem("books") === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem("books"));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if (book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem("books", JSON.stringify(books));
    }
  }
  
  // Event: Add a Book
  document.querySelector("#book-form").addEventListener("submit", (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
  
    // Validate
    if (title === "" || author === "" || isbn === "") {
      alert("Please fill in all fields", "danger");
    } else {
      // Instatiate book
      const book = createBook(title, author, isbn);
  
      // Add Book to UI
      UI.addBookToList(book);
  
      // Add book to store
      Store.addBook(book);
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Book
  document.querySelector("#book-list").addEventListener("click", (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  });