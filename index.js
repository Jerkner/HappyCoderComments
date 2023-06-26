import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"




const appSettings = {
    databaseURL: "https://we-are-the-champions-ca698-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")

const textarea = document.getElementById("textarea")
const from = document.getElementById("from")
const to = document.getElementById("to")
const publish = document.getElementById("publish")
const comments = document.getElementById("comments")

onValue(itemsInDB, function(snapshot) {
    if (snapshot.exists()) {
    let postsArray = Object.values(snapshot.val())
    clearComments()

        for (let i = 0; i < postsArray.length; i++) {
            const post = postsArray[i];
            
            addComment(post)
        }
    }
})

function addComment(comment) {
    comments.innerHTML += `
    <div class="comment">
        <h4>To ${comment.to}</h4>
        <p>${comment.comment}</p>
        <h4>From ${comment.from}</h4>
    </div>
    `
}

publish.addEventListener("click", function() {
    let commentValue = textarea.value
    let fromValue = from.value
    let toValue = to.value
    
    if (commentValue.length > 0) {
        const newItemRef = push(itemsInDB)
        set(newItemRef, {
            comment: commentValue,
            from: fromValue,
            to: toValue
        })
    }
    clearTextarea()
})



function clearComments() {
    comments.innerHTML = ''
}

function clearTextarea() {
    textarea.value = ""
}