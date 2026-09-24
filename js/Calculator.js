// =========================
// GET HTML ELEMENTS
// =========================

const addSubjectBtn =
    document.getElementById("addSubject");

const subjectsContainer =
    document.getElementById("subjectsContainer");

const calculateBtn =
    document.getElementById("calculateBtn");


// =========================
// ADD SUBJECT
// =========================

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


// =========================
// REMOVE SUBJECT
// =========================

subjectsContainer.addEventListener("click", function (event) {

    if (event.target.classList.contains("remove-btn")) {

        event.target.parentElement.remove();

    }

});


// =========================
// CALCULATE SGPA
// =========================

calculateBtn.addEventListener("click", function () {


    // =========================
    // GET SEMESTER NUMBER
    // =========================

    const semesterNumber =
        Number(
            document.getElementById("semesterNumber").value
        );


    // Check semester number

    if (
        semesterNumber < 1 ||
        semesterNumber > 8
    ) {

        alert(
            "Please enter a semester number between 1 and 8."
        );

        return;

    }


    // =========================
    // GET ALL SUBJECT ROWS
    // =========================

    const rows =
        document.querySelectorAll(".subject-row");


    let totalCredits = 0;

    let totalPoints = 0;

    let subjects = [];


    // =========================
    // READ SUBJECT DATA
    // =========================

    rows.forEach(function (row) {

        const subjectName =
            row
                .querySelector(".subject-name")
                .value
                .trim();


        const credit =
            Number(
                row
                    .querySelector(".credits")
                    .value
            );


        const grade =
            Number(
                row
                    .querySelector(".grade")
                    .value
            );


        // Check valid data

        if (
            subjectName !== "" &&
            credit > 0 &&
            grade >= 0 &&
            grade <= 10
        ) {


            // Add credits

            totalCredits += credit;


            // Calculate credit × grade

            totalPoints +=
                credit * grade;


            // Store subject

            subjects.push({

                name: subjectName,

                credits: credit,

                grade: grade

            });

        }

    });


    // =========================
    // CHECK SUBJECT DATA
    // =========================

    if (subjects.length === 0) {

        alert(
            "Please enter at least one subject."
        );

        return;

    }


    // =========================
    // CALCULATE SGPA
    // =========================

    const sgpa =
        totalPoints / totalCredits;


    // =========================
    // SHOW SGPA
    // =========================

    document.getElementById("sgpaResult")
        .textContent =
        sgpa.toFixed(2);


    // =========================
    // PERFORMANCE MESSAGE
    // =========================

    let message;


    if (sgpa >= 9) {

        message =
            "Excellent Performance 🎉";

    }

    else if (sgpa >= 8) {

        message =
            "Very Good Performance 👏";

    }

    else if (sgpa >= 7) {

        message =
            "Good Performance 👍";

    }

    else if (sgpa >= 6) {

        message =
            "Keep Improving 💪";

    }

    else {

        message =
            "You Can Do Better 📚";

    }


    document.getElementById("performanceText")
        .textContent =
        message;


    // =========================
    // CREATE SEMESTER DATA
    // =========================

    const semesterData = {

        semester: semesterNumber,

        sgpa: Number(
            sgpa.toFixed(2)
        ),

        credits: totalCredits,

        subjects: subjects,

        date:
            new Date()
                .toLocaleDateString()

    };


    // =========================
    // SAVE DATA IN LOCAL STORAGE
    // =========================

    // Get previously saved semesters

let semesters =
    JSON.parse(
        localStorage.getItem("semesters")
    ) || [];


// Check if this semester already exists

const existingIndex =
    semesters.findIndex(function (semester) {

        return semester.semester === semesterNumber;

    });


// If semester already exists,
// update it

if (existingIndex !== -1) {

    semesters[existingIndex] =
        semesterData;

}


// Otherwise add new semester

else {

    semesters.push(
        semesterData
    );

}


// Sort semesters by semester number

semesters.sort(function (a, b) {

    return a.semester - b.semester;

});


// Save all semesters

localStorage.setItem(
    "semesters",
    JSON.stringify(semesters)
);


// Also save latest semester

localStorage.setItem(
    "latestSemester",
    JSON.stringify(semesterData)
);


    // =========================
    // SUCCESS MESSAGE
    // =========================

    alert(
        "Semester " +
        semesterNumber +
        " saved successfully! 🎉"
    );

});