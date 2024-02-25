const addBook = document.querySelector("#addBook")
const dialog = document.querySelector("dialog")
const confirmBtn = document.querySelector("#confirm")

let booksCounter = 0;

const library = []

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
    library.push(newBook)
    newBook.createCard()
    booksCounter += 1;
    dialog.close()
})

function CreateBoook(arrayProperties, bookId) {
    this.bookId = "book"+bookId;
    this.title = arrayProperties.at(0);
    this.author = arrayProperties.at(1);
    this.status = arrayProperties.at(2);
}

CreateBoook.prototype = {

    /* creating the card node  and its children*/

    createCard : function() {

        card = document.createElement("div")
        title = document.createElement("p")
        writtenBy = document.createElement("p")
        author = document.createElement("p")
        stats = document.createElement("p")
        btn_delete = document.createElement("button")
        btn_toggle_status = document.createElement("button")

        card.classList.add("card")
        btn_delete.setAttribute("data-book-id",`${this.bookId}`)
        btn_toggle_status.setAttribute("data-book-id",`${this.bookId}`)
        btn_toggle_status.classList.add(`${this.status}`)

        card.appendChild(title)
        card.appendChild(writtenBy)
        card.appendChild(author)
        card.appendChild(stats)
        card.appendChild(btn_delete)
        card.appendChild(btn_toggle_status)

    /* attaching the card to the dom */

        const card_container = document.querySelector(".container");
        card_container.appendChild(card);

    /* adding textContent to the elements */

        writtenBy.textContent += "written by"
        btn_delete.textContent += "delete"

        title.textContent += `${this.title}`
        author.textContent += `${this.author}`
        stats.textContent += `${this.status}`
        btn_toggle_status.textContent += `change status`

    /* delete card node and object out of library*/
        btn_delete.addEventListener("click", function() {
            for (let i=0; i < library.length; i++){
                if(library.at(i).bookId === this.dataset.bookId) {
                    library.splice(i,1);
                }
            }
        this.parentNode.remove()
        })
    /* toggle read status on btn_toggle_status, change textContent on stats and in instance*/
    btn_toggle_status.addEventListener("click", function (event) {
        console.log(event)
        switch (this.className) {
            case "read":
                console.log("read executed")
                btn_toggle_status.classList.remove('read')
                btn_toggle_status.classList.add('notread')
                btn_toggle_status.textContent = "change to not read"
                stats.textContent = "notread"

                for (let i=0; i < library.length; i++){
                    if(library.at(i).bookId === this.dataset.bookId) {
                        library.at(i).status = "notread";
                        console.log(library.at(i).status);
                    }
                }
                break
            case "notread":
                console.log("notread executed")
                btn_toggle_status.classList.remove('notread')
                btn_toggle_status.classList.add('read')
                btn_toggle_status.textContent = "change to read"
                stats.textContent = "read"

                for (let i=0; i < library.length; i++){
                    if(library.at(i).bookId === this.dataset.bookId) {
                        library.at(i).status = "read";
                        console.log(library.at(i).status);
                    }
                }
                break
            default: 
            console.log("default issued")
        }
    })
    }
}

