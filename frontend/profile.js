const API_URL = "";


/* =========================
   LOAD PROFILE
========================= */

async function loadProfile() {

    try {

        const response = await fetch(
            `${API_URL}/me`,
            {
                credentials: "include"
            }
        );


        if (!response.ok) {

            window.location.href = "index.html";

            return;
        }


        const data = await response.json();


        document.getElementById("profileName")
            .textContent = data.user.name;


        document.getElementById("profileEmail")
            .textContent = data.user.email;


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
    loadProfile
);