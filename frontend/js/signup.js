const API_URL = "";

document
    .getElementById("signupForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document
            .getElementById("name")
            .value
            .trim();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const password = document
            .getElementById("password")
            .value;

        const message = document.getElementById("message");

        try {

            const response = await fetch(`${API_URL}/signup`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (data.success) {

                message.textContent =
                    "Account created successfully!";

                message.className = "success";

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);

            } else {

                message.textContent = data.message;
                message.className = "error";
            }

        } catch (error) {

            console.error(error);

            message.textContent =
                "Unable to connect to server.";

            message.className = "error";
        }

    });