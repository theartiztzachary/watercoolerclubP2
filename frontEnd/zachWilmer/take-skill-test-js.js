const questionOne = document.getElementById("question-one");
const answerOne = document.getElementById("answer-one");
const questionTwo = document.getElementById("question-two");
const answerTwo = document.getElementById("answer-two");
const questionThree = document.getElementById("question-three");
const answerThree = document.getElementById("answer-three");

async function findTest() {
    let requestURL = `http://localhost:8080/skilltest/${window.sessionStorage.getItem("current-test-id")}`
    let response = await fetch(requestURL, {method:"GET"});
    if (response.status == 200) {
        const data = await response.json();
        populatePage(data);
    }
}

function populatePage(data) {
    questionOne.innerHTML = data["questionOne"];
    questionTwo.innerHTML = data["questionTwo"];
    questionThree.innerHTML = data["questionThree"];

    window.sessionStorage.setItem("answer-one", data["answerOne"]);
    window.sessionStorage.setItem("answer-two", data["answerTwo"]);
    window.sessionStorage.setItem("answer-three", data["answerThree"]);
}

async function submitTest() {
    let testPassed;

    if (answerOne.value == window.sessionStorage.getItem("answer-one") && 
    answerTwo.value == window.sessionStorage.getItem("answer-two") &&
    answerThree.value == window.sessionStorage.getItem("answer-three")) {
        testPassed = true;
    } else {
        testPassed = false;
    }

    if (testPassed) {
        let requestURL = `http://localhost:8080/skilltest/${window.sessionStorage.getItem("current-test-id")}/result/${window.sessionStorage.getItem("individual-id")}`;
        let response = await fetch(requestURL, {method:"POST"});
        if (response.status == 201) {
            const data = await response.json();
            alert(data["message"])
            window.location.href = "view-skill-tests.html";
        } else {
            const data = await response.json();
            alert(data["errorMessage"])
        }
    } else {
        alert("You did not pass the test.");
        window.location.href = "view-skill-tests.html";
    }

}