// Get saved semester data

const savedData =
    localStorage.getItem("latestSemester");


// Check if data exists

if (savedData) {

    const semesterData =
        JSON.parse(savedData);


    // Update Latest SGPA

    const latestSGPA =
        document.getElementById("latestSGPA");

    if (latestSGPA) {

        latestSGPA.textContent =
            semesterData.sgpa.toFixed(2);

    }


    // Update Current CGPA
    // For now, current CGPA = latest SGPA

    const currentCGPA =
        document.getElementById("currentCGPA");

    if (currentCGPA) {

        currentCGPA.textContent =
            semesterData.sgpa.toFixed(2);

    }

}