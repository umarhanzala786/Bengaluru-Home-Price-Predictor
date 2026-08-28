const API_URL = "";

document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const password = document
            .getElementById("password")
            .value;

        const message = document.getElementById("message");

        try {

            const response = await fetch(`${API_URL}/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (data.success) {

                message.textContent = "Login successful!";
                message.className = "success";

                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 700);

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