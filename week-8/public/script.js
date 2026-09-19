// Registration form validation

function validateRegistration() {

    const password =
        document.getElementById("password").value;

    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");

        return false;
    }

    return true;
}


// Display welcome message

function showWelcome() {

    alert("Welcome to the Mini Web Application!");

}