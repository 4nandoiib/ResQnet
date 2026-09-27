$(document).ready(function () {

    const validUsername = "admin";
    const validPassword = "12345";


    /* =========================
       LOGIN
    ========================= */

    if ($("#loginForm").length) {

        $("#loginForm").validate({

            rules: {

                username: {
                    required: true,
                    minlength: 3
                },

                password: {
                    required: true,
                    minlength: 5
                }

            },

            messages: {

                username: {
                    required: "Please enter your username.",
                    minlength: "Username must be at least 3 characters."
                },

                password: {
                    required: "Please enter your password.",
                    minlength: "Password must be at least 5 characters."
                }

            },

            errorElement: "div",
            errorClass: "validation-error",

            submitHandler: function (form) {

                const username =
                    $("#username").val().trim();

                const password =
                    $("#password").val();


                if (
                    username === validUsername &&
                    password === validPassword
                ) {

                    sessionStorage.setItem(
                        "isLoggedIn",
                        "true"
                    );

                    sessionStorage.setItem(
                        "loggedInUser",
                        username
                    );

                    window.location.href = "landing.html";

                } else {

                    $("#login-message").html(`
                        <div class="alert alert-danger" role="alert">
                            <strong>Login failed.</strong>
                            Invalid username or password.
                        </div>
                    `);

                }

            }

        });

    }


    /* =========================
       REGISTER
    ========================= */

    if ($("#registerForm").length) {

        $("#registerForm").validate({

            rules: {

                fullname: {
                    required: true,
                    minlength: 2
                },

                email: {
                    required: true,
                    email: true
                },

                register_password: {
                    required: true,
                    minlength: 5
                },

                confirm_password: {
                    required: true,
                    equalTo: "#register-password"
                }

            },

            messages: {

                fullname: {
                    required: "Please enter your full name.",
                    minlength: "Name must be at least 2 characters."
                },

                email: {
                    required: "Please enter your email address.",
                    email: "Please enter a valid email address."
                },

                register_password: {
                    required: "Please create a password.",
                    minlength: "Password must be at least 5 characters."
                },

                confirm_password: {
                    required: "Please confirm your password.",
                    equalTo: "Passwords do not match."
                }

            },

            errorElement: "div",
            errorClass: "validation-error",

            submitHandler: function (form) {

                $("#register-message").html(`
                    <div class="alert alert-success" role="alert">
                        <strong>Registration successful!</strong>
                        Your account has been created successfully.
                    </div>
                `);

                form.reset();

            }

        });

    }


    /* =========================
       LANDING PAGE
    ========================= */

    if ($("#welcome-user").length) {

        const loggedIn =
            sessionStorage.getItem("isLoggedIn");

        const username =
            sessionStorage.getItem("loggedInUser");


        if (
            loggedIn !== "true" ||
            !username
        ) {

            window.location.href = "index.html";

            return;

        }


        $("#welcome-user").text(username);

    }


    /* =========================
       LOGOUT
    ========================= */

    $("#logoutButton").on("click", function () {

        sessionStorage.removeItem("isLoggedIn");

        sessionStorage.removeItem("loggedInUser");

        window.location.href = "index.html";

    });

});