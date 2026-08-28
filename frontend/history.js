const API_URL = "";


/* =========================
   LOAD HISTORY
========================= */

async function loadHistory() {

    const container =
        document.getElementById("historyContent");

    try {

        const response = await fetch(
            `${API_URL}/history`,
            {
                credentials: "include"
            }
        );


        if (response.status === 401) {

            window.location.href = "index.html";

            return;
        }


        const data = await response.json();


        if (!data.success) {

            container.innerHTML = `
                <div class="empty-history">
                    <h2>Unable to load history</h2>
                    <p>${data.message}</p>
                </div>
            `;

            return;
        }


        if (data.history.length === 0) {

            container.innerHTML = `
                <div class="empty-history">

                    <h2>No Predictions Yet</h2>

                    <p>
                        Your property predictions will
                        appear here.
                    </p>

                    <a
                        href="dashboard.html"
                        class="predict-link"
                    >
                        Make a Prediction
                    </a>

                </div>
            `;

            return;
        }


        let tableHTML = `

            <table class="history-table">

                <thead>

                    <tr>

                        <th>Date</th>

                        <th>Location</th>

                        <th>Area</th>

                        <th>BHK</th>

                        <th>Bath</th>

                        <th>Estimated Price</th>

                    </tr>

                </thead>

                <tbody>
        `;


        data.history.forEach(function (item) {

            const date =
                new Date(item.created_at)
                    .toLocaleDateString();


            tableHTML += `

                <tr>

                    <td>${date}</td>

                    <td>${item.location}</td>

                    <td>${item.total_sqft} sqft</td>

                    <td>${item.bhk}</td>

                    <td>${item.bath}</td>

                    <td class="price">
                        ₹ ${item.estimated_price} Lakh
                    </td>

                </tr>

            `;

        });


        tableHTML += `

                </tbody>

            </table>

        `;


        container.innerHTML = tableHTML;


    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="empty-history">

                <h2>Connection Error</h2>

                <p>
                    Unable to connect to the server.
                </p>

            </div>
        `;
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
    loadHistory
);