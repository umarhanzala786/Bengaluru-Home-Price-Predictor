const API_URL = "";


/* =========================
   GET BHK
========================= */

function getBHKValue() {

    const selected = document.querySelector(
        'input[name="uiBHK"]:checked'
    );

    return selected ? parseInt(selected.value) : -1;
}


/* =========================
   GET BATHROOMS
========================= */

function getBathValue() {

    const selected = document.querySelector(
        'input[name="uiBathrooms"]:checked'
    );

    return selected ? parseInt(selected.value) : -1;
}


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

            return;
        }

        const data = await response.json();

        document.getElementById("userName").textContent =
            data.user.name;

    } catch (error) {

        console.error(error);

        window.location.href = "index.html";
    }
}


/* =========================
   LOAD LOCATIONS
========================= */

async function loadLocations() {

    try {

        const response = await fetch(
            `${API_URL}/get_location_names`
        );

        const data = await response.json();

        const locationSelect =
            document.getElementById("uiLocations");

        locationSelect.innerHTML =
            '<option value="" disabled selected>Choose a Location</option>';

        data.locations.forEach(function (location) {

            const option = document.createElement("option");

            option.value = location;
            option.textContent = location;

            locationSelect.appendChild(option);

        });

    } catch (error) {

        console.error("Location loading error:", error);
    }
}


/* =========================
   PREDICT PRICE
========================= */

async function onClickedEstimatePrice() {

    const sqft =
        parseFloat(
            document.getElementById("uiSqft").value
        );

    const bhk = getBHKValue();

    const bathrooms = getBathValue();

    const location =
        document.getElementById("uiLocations").value;

    const result =
        document.getElementById("uiEstimatedPrice");


    if (!sqft || sqft <= 0) {

        result.innerHTML =
            "<span>Please enter a valid area.</span>";

        return;
    }


    if (!location) {

        result.innerHTML =
            "<span>Please select a location.</span>";

        return;
    }


    result.innerHTML =
        "<span>Calculating...</span>";


    const formData = new FormData();

    formData.append("total_sqft", sqft);
    formData.append("bhk", bhk);
    formData.append("bath", bathrooms);
    formData.append("location", location);


    try {

        const response = await fetch(
            `${API_URL}/predict_home_price`,
            {
                method: "POST",

                credentials: "include",

                body: formData
            }
        );


        const data = await response.json();


        if (response.status === 401) {

            window.location.href = "index.html";

            return;
        }


        if (data.success) {

            result.innerHTML = `
                <span>Estimated Property Price</span>
                <h2>₹ ${data.estimated_price} Lakh</h2>
            `;

        } else {

            result.innerHTML =
                `<span>${data.message}</span>`;
        }


    } catch (error) {

        console.error(error);

        result.innerHTML =
            "<span>Unable to connect to server.</span>";
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

window.addEventListener("load", function () {

    checkLogin();

    loadLocations();

});