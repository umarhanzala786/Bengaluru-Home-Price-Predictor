const API_URL = "";


/* =========================
   CHECK LOGIN
========================= */

async function checkLogin() {

    try {

        const response = await fetch(
            `${API_URL}/me`,
            {
                credentials: "include"
            }
        );

        if (!response.ok) {

            window.location.href = "index.html";

        }

    } catch (error) {

        console.error(error);

        window.location.href = "index.html";
    }
}


/* =========================
   LOGOUT
========================= */

async function logout() {

    try {

        await fetch(
            `${API_URL}/logout`,
            {
                method: "POST",
                credentials: "include"
            }
        );

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);

        window.location.href = "index.html";
    }
}


/* =========================
   PAGE LOAD
========================= */

window.addEventListener(
    "load",
    checkLogin
);