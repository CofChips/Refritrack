$(document).ready(function () {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var nameInput = $("input#name-input");;

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim(),
            name: nameInput.val().trim()
        };
        //console.log("userdata",userData);

        if (!userData.email || !userData.password || !userData.name) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.email, userData.password, userData.name);
        emailInput.val("");
        passwordInput.val("");
        nameInput.val("");
        // todo empty the name field
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, name) {
        //console.log(email, password, name);
        $.post("/api/signup", {
            email: email,
            password: password,
            name: name
        })
            .then(function (user) {
                window.sessionStorage.setItem("userId", user.id);
                window.location.replace("/fridge/addItem");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .fail(handleLoginErr);
    }

    function handleLoginErr(err) {
        let errorMsg = err.responseJSON.errors[0].message;
        $("#alert .msg").text(errorMsg);
        $("#alert").fadeIn(500);
    }
});
