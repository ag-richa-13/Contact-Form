// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBBlHjcylJU2-Rt4yWp2CLd3CRcYvadJJ4",
  authDomain: "contact-form-16.firebaseapp.com",
  databaseURL: "https://contact-form-16-default-rtdb.firebaseio.com",
  projectId: "contact-form-16",
  storageBucket: "contact-form-16.appspot.com",
  messagingSenderId: "276184415342",
  appId: "1:276184415342:web:143ae471052e62472ffa7f",
  measurementId: "G-DE8X6XYNVE",
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // Get user input values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Save data to Firebase
  var newMessageRef = database.ref("messages").push();
  newMessageRef.set({
    name: name,
    email: email,
    message: message,
  });

  // Clear form fields
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

// Real-time listener for new messages
database.ref("messages").on("child_added", function (snapshot) {
  var message = snapshot.val();
  displayMessage(message);
});

function displayMessage(message) {
  var messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML =
    "<strong>" +
    message.name +
    "</strong><br>" +
    "<a href='mailto:" +
    message.email +
    "'>" +
    message.email +
    "</a><br>" +
    message.message;

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<img src="./image/delete.png" alt="Delete" />';
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", function () {
    deleteMessage(messageElement, message);
  });

  messageElement.appendChild(deleteButton);

  document.getElementById("messages").appendChild(messageElement);
}

function deleteMessage(messageElement, message) {
  // Remove the message from the database
  database.ref("messages/" + message.key).remove();

  // Remove the message element from the DOM
  messageElement.remove();
}
