// Retrieve saved items from localStorage or initialize an empty array
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []

console.log(itemsArray)

// Add new item on "Enter" button click
document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item")
    createItem(item)
})

// Render all to-do items from itemsArray
function displayItems(){
    let items = ""
    for(let i = 0; i < itemsArray.length; i++){
        items += `<div class="item">
        <div class="input-controller">
            <textarea disabled>${itemsArray[i]}</textarea>
            <div class="edit-controller">
                <i class="fa-solid fa-check deleteBtn"></i>
                <i class="fa-solid fa-pen-to-square editBtn"></i>
            </div>
        </div>
        <div class="update-controller">
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>
        </div>
    </div>`
    }
    // Inject the generated HTML into the to-do list container
    document.querySelector(".to-do-list").innerHTML = items
    // Set up event listeners for all action buttons
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}

// Attach click event to delete buttons
function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => {deleteItem(i)})
    })
}

// Attach click event to edit buttons to enable editing
function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => {
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        })
    })
}

// Attach click event to save buttons to update items
function activateSaveListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value, i)
        })
    })
}

// Attach click event to cancel buttons to revert UI state
function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");

    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            updateController[i].style.display = "none";
            inputs[i].disabled = true;
        });
    });
}

// Update item content and save to localStorage
function updateItem(text, i){
    itemsArray[i] = text
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}

// Delete item and update localStorage
function deleteItem(i){
    itemsArray.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}

// Create a new item and store it
function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}


// Display current date in header
function displayDate(){
    let date = new Date()
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3]
}

// Run on page load
window.onload = function(){
    displayDate()
    displayItems()
}