
// =====================================
// AGE CALCULATOR + EXCEL BACKEND
// =====================================

const API_URL = "http://localhost:5000/api";

async function calculateAge() {

    console.log("Calculate Age button clicked!");

    // Get HTML elements
    const nameInput = document.getElementById("name");
    const dobInput = document.getElementById("dob");
    const genderInput = document.getElementById("gender");
    const consentInput = document.getElementById("consent");

    const result = document.getElementById("result");
    const ageText = document.getElementById("ageText");
    const detailText = document.getElementById("detailText");
    const savedMsg = document.getElementById("savedMsg");

    // Check HTML elements
    if (!nameInput || !dobInput || !genderInput ||
        !consentInput || !result || !ageText ||
        !detailText || !savedMsg) {
        alert("HTML elements missing. Please check index.html.");
        return;
    }

    // Get user values
    const name = nameInput.value.trim();
    const dob = dobInput.value;
    const gender = genderInput.value;
    const consent = consentInput.checked;

    // Validate inputs
    if (!name || !dob || !gender) {
        alert("Please fill all details!");
        return;
    }

    if (!consent) {
        alert("Please accept the consent checkbox!");
        return;
    }

    // Calculate age
    const birthDate = new Date(dob + "T00:00:00");
    const today = new Date();

    if (isNaN(birthDate.getTime()) || birthDate > today) {
        alert("Please enter a valid Date of Birth!");
        return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;

        const previousMonthDays = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();

        days += previousMonthDays;
    }

    if (months < 0) {
        age--;
        months += 12;
    }

    // Display age
    result.style.display = "block";

    ageText.innerText = `${name}, your age is ${age} years`;

    detailText.innerText =
        `${months} months and ${days} days | Gender: ${gender}`;

    savedMsg.innerText = "Saving your data to Excel...";

    // Disable button while saving
    const calculateBtn = document.getElementById("calculateBtn");

    if (calculateBtn) {
        calculateBtn.disabled = true;
        calculateBtn.innerText = "Saving...";
    }

    // Prepare user data
    const userData = {
        name: name,
        dob: dob,
        gender: gender,
        age: age,
        months: months,
        days: days,
        time: new Date().toLocaleString("en-IN"),
        consent: true
    };

    try {

        // Send data to Node.js backend
        const response = await fetch(`${API_URL}/save-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Data saving failed");
        }

        savedMsg.innerText =
            "✓ Age calculated and data saved successfully in Excel!";

        console.log("Excel response:", data);

    } catch (error) {

        console.error("Backend Error:", error);

        savedMsg.innerText =
            "Age calculated, but Excel saving failed: " + error.message;

    } finally {

        if (calculateBtn) {
            calculateBtn.disabled = false;
            calculateBtn.innerText = "Calculate Age";
        }

    }
}

// Check JavaScript loading
console.log("Age Calculator script.js loaded successfully!");
