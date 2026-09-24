// =========================
// GET SAVED SEMESTERS
// =========================

const savedData =
    localStorage.getItem("semesters");


// If data exists, convert it from JSON

let semesters = [];

if (savedData) {

    semesters =
        JSON.parse(savedData);

}


// =========================
// GET DASHBOARD ELEMENTS
// =========================

const currentCGPA =
    document.getElementById("currentCGPA");

const latestSGPA =
    document.getElementById("latestSGPA");


// =========================
// SHOW LATEST SGPA
// =========================

if (
    latestSGPA &&
    semesters.length > 0
) {

    const latestSemester =
        semesters[semesters.length - 1];

    latestSGPA.textContent =
        latestSemester.sgpa.toFixed(2);

}


// =========================
// SHOW CURRENT CGPA
// =========================

// For now we will calculate
// average of semester SGPAs

if (
    currentCGPA &&
    semesters.length > 0
) {

    let totalSGPA = 0;


    semesters.forEach(function (semester) {

        totalSGPA += semester.sgpa;

    });


    const cgpa =
        totalSGPA / semesters.length;


    currentCGPA.textContent =
        cgpa.toFixed(2);

}


// =========================
// SHOW SEMESTER HISTORY
// =========================

const semesterTable =
    document.getElementById("semesterTable");


if (
    semesterTable &&
    semesters.length > 0
) {


    semesters.forEach(function (semester) {

        let status;


        if (semester.sgpa >= 9) {

            status = "Excellent";

        }

        else if (semester.sgpa >= 8) {

            status = "Very Good";

        }

        else if (semester.sgpa >= 7) {

            status = "Good";

        }

        else {

            status = "Needs Improvement";

        }


        const row =
            document.createElement("div");


        row.classList.add("table-row");


        row.innerHTML = `

            <span>
                Semester ${semester.semester}
            </span>

            <span>
                ${semester.credits}
            </span>

            <strong>
                ${semester.sgpa.toFixed(2)}
            </strong>

            <span class="status">
                ${status}
            </span>

        `;


        semesterTable.appendChild(row);

    });

}