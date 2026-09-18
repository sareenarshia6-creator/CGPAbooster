const addSubjectBtn = document.getElementById("addSubject");

const subjectsContainer =
    document.getElementById("subjectsContainer");

const calculateBtn =
    document.getElementById("calculateBtn");


// Add Subject

addSubjectBtn.addEventListener("click", function () {

    const row = document.createElement("div");

    row.classList.add("subject-row");

    row.innerHTML = `
        <input
            type="text"
            placeholder="Subject Name"
            class="subject-name"
        >

        <input
            type="number"
            placeholder="Credits"
            class="credits"
            min="1"
            max="10"
        >

        <input
            type="number"
            placeholder="Grade Point"
            class="grade"
            min="0"
            max="10"
        >

        <button class="remove-btn">
            ×
        </button>
    `;

    subjectsContainer.appendChild(row);

});


// Remove Subject

subjectsContainer.addEventListener("click", function (event) {

    if (event.target.classList.contains("remove-btn")) {

        event.target.parentElement.remove();

    }

});


// Calculate SGPA

calculateBtn.addEventListener("click", function () {

    const credits =
        document.querySelectorAll(".credits");

    const grades =
        document.querySelectorAll(".grade");


    let totalCredits = 0;

    let totalPoints = 0;


    for (let i = 0; i < credits.length; i++) {

        const credit =
            Number(credits[i].value);

        const grade =
            Number(grades[i].value);


        if (
            credits[i].value === "" ||
            grades[i].value === ""
        ) {
            continue;
        }


        totalCredits += credit;

        totalPoints += credit * grade;

    }


    if (totalCredits === 0) {

        alert("Please enter credits and grade points.");

        return;

    }


    const sgpa =
        totalPoints / totalCredits;


    document.getElementById("sgpaResult")
        .textContent = sgpa.toFixed(2);


    let message = "";


    if (sgpa >= 9) {

        message = "Excellent Performance 🎉";

    }

    else if (sgpa >= 8) {

        message = "Very Good Performance 👏";

    }

    else if (sgpa >= 7) {

        message = "Good Performance 👍";

    }

    else if (sgpa >= 6) {

        message = "Keep Improving 💪";

    }

    else {

        message = "You Can Do Better 📚";

    }


    document.getElementById("performanceText")
        .textContent = message;

});