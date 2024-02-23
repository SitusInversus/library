const addBook = document.querySelector("#addBook")
const dialog = document.querySelector("dialog")
const confirmBtn = document.querySelector("#confirm")

let booksCounter = 0;

addBook.addEventListener("click", () => {
    dialog.showModal();
})
confirmBtn.addEventListener("click",(event) => {
    event.preventDefault();

    /* extract content of dialog and insert into arrayInputValue*/
    let nodeList = document.querySelectorAll("dialog label input")
    let arrayInputValue = [];
    nodeList.forEach(function(x){arrayInputValue.push(x.value)})
    arrayInputValue.push(document.querySelector("select").value)

    const newBook = new CreateBoook(arrayInputValue, booksCounter);
    booksCounter += 1;
    newBook.createCard()
    dialog.close()
})

function CreateBoook(arrayProperties, bookId) {
    this.bookId = bookId;
    this.title = arrayProperties.at(0);
    this.author = arrayProperties.at(1);
    this.status = arrayProperties.at(2);
}

CreateBoook.prototype = {
  /*   logThis : function(){
        console.log("logthis works")
    } */
    /* creating the card node  and its children*/

    createCard : function() {

        card = document.createElement("div")
        title = document.createElement("p")
        writtenBy = document.createElement("p")
        author = document.createElement("p")
        stats = document.createElement("p")
        btn_delete = document.createElement("button")

        card.classList.add("card")

        card.appendChild(title)
        card.appendChild(writtenBy)
        card.appendChild(author)
        card.appendChild(stats)
        card.appendChild(btn_delete)

    /* attaching the card to the dom */

        const card_container = document.querySelector(".container");
        card_container.appendChild(card);

    /* adding textContent to the elements */

        writtenBy.textContent += "written by";

        title.textContent += `${this.title}`
        author.textContent += `${this.author}`
        stats.textContent += `${this.status}`

    }
}

