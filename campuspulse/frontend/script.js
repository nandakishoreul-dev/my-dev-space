const API_URL = "http://127.0.0.1:8000";


// Show report form

function showReportForm() {

    const form = document.getElementById(
        "report-section"
    );

    form.classList.remove("hidden");

    form.scrollIntoView({
        behavior: "smooth"
    });
}


// Hide report form

function hideReportForm() {

    const form = document.getElementById(
        "report-section"
    );

    form.classList.add("hidden");
}


// Load issues from backend

async function loadIssues() {

    const container =
        document.getElementById(
            "issues-container"
        );

    try {

        const response = await fetch(
            `${API_URL}/issues`
        );

        const data = await response.json();

        container.innerHTML = "";

        if (data.issues.length === 0) {

            container.innerHTML = `
                <p class="loading">
                    No issues reported yet.
                </p>
            `;

            return;
        }


        data.issues.forEach(issue => {

            const card =
                document.createElement("div");

            card.className = "issue-card";

            const priority =
                issue.priority.toLowerCase();

            card.innerHTML = `

                <div class="issue-top">

                    <span>
                        ${getCategoryIcon(issue.category)}
                    </span>

                    <span
                        class="priority ${priority}"
                    >
                        ${issue.priority}
                    </span>

                </div>

                <h3>
                    ${issue.title}
                </h3>

                <p class="issue-description">
                    ${issue.description}
                </p>

                <p class="issue-location">
                    📍 ${issue.location}
                    &nbsp; • &nbsp;
                    ${issue.category}
                </p>

            `;

            container.appendChild(card);

        });

    } catch (error) {

        container.innerHTML = `
            <p>
                Unable to connect to the server.
                Make sure FastAPI is running.
            </p>
        `;

        console.error(error);
    }
}


// Category icons

function getCategoryIcon(category) {

    const icons = {
        Electrical: "🔧",
        Network: "📶",
        Cleanliness: "🧹",
        Infrastructure: "🏫",
        Other: "📌"
    };

    return icons[category] || "📌";
}


// Submit issue

document
    .getElementById("issue-form")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const issue = {

                title:
                    document.getElementById(
                        "title"
                    ).value,

                description:
                    document.getElementById(
                        "description"
                    ).value,

                category:
                    document.getElementById(
                        "category"
                    ).value,

                priority:
                    document.getElementById(
                        "priority"
                    ).value,

                location:
                    document.getElementById(
                        "location"
                    ).value
            };


            try {

                const response =
                    await fetch(
                        `${API_URL}/issues`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(issue)
                        }
                    );


                if (!response.ok) {
                    throw new Error(
                        "Failed to submit issue"
                    );
                }


                alert(
                    "Issue reported successfully!"
                );


                document
                    .getElementById("issue-form")
                    .reset();


                hideReportForm();

                loadIssues();


                document
                    .getElementById("issues")
                    .scrollIntoView({
                        behavior: "smooth"
                    });


            } catch (error) {

                alert(
                    "Unable to submit issue. " +
                    "Make sure the backend is running."
                );

                console.error(error);
            }

        }
    );


// Load issues when page opens

loadIssues();