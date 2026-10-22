
const questions = [
    {
        q: "What is phishing?",
        options: [
            "A computer upgrade",
            "A trick to steal sensitive information",
            "A backup method"
        ],
        answer: 1
    },
    {
        q: "An unexpected email asks for your password. What should you do?",
        options: [
            "Reply with the password",
            "Click its link",
            "Verify through an official channel"
        ],
        answer: 2
    },
    {
        q: "Should you share your OTP with a caller?",
        options: [
            "Never share it",
            "If they know your name",
            "If they sound professional"
        ],
        answer: 0
    },
    {
        q: "Which can be a phishing warning sign?",
        options: [
            "A saved bookmark",
            "Urgent demands and suspicious links",
            "A document you created"
        ],
        answer: 1
    },
    {
        q: "How should you open your bank website?",
        options: [
            "Through any message link",
            "Through a random advertisement",
            "Using its verified address or official app"
        ],
        answer: 2
    },
    {
        q: "What should you do with an unexpected attachment?",
        options: [
            "Verify it before opening",
            "Open it immediately",
            "Forward it to everyone"
        ],
        answer: 0
    },
    {
        q: "What is multi-factor authentication?",
        options: [
            "Using one short password",
            "Using additional verification factors",
            "Sharing a password"
        ],
        answer: 1
    },
    {
        q: "A message promises a prize you never entered to win. What is safest?",
        options: [
            "Pay a fee immediately",
            "Share your bank details",
            "Treat it cautiously and verify independently"
        ],
        answer: 2
    },
    {
        q: "What should you do after clicking a suspicious link?",
        options: [
            "Enter all requested details",
            "Stop interacting and report it; take protective steps if needed",
            "Forward the link to friends"
        ],
        answer: 1
    },
    {
        q: "How can you improve account security?",
        options: [
            "Use unique passwords and MFA",
            "Reuse one password everywhere",
            "Share passwords with friends"
        ],
        answer: 0
    }
];

let current = 0;
let points = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("nextButton");

function showQuestion() {
    answered = false;

    const item = questions[current];
    questionElement.textContent =
        `Question ${current + 1}/${questions.length}: ${item.q}`;

    optionsElement.replaceChildren();
    feedbackElement.textContent = "";
    scoreElement.textContent = "";

    item.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";

        button.addEventListener("click", () => checkAnswer(index));
        optionsElement.appendChild(button);
    });

    nextButton.disabled = true;
    nextButton.textContent =
        current === questions.length - 1
            ? "Show Final Score"
            : "Next Question";
}

function checkAnswer(selected) {
    if (answered) return;

    answered = true;
    const correct = selected === questions[current].answer;

    if (correct) points++;

    feedbackElement.textContent = correct
        ? "Correct answer!"
        : "Incorrect. Review the safety tips.";

    scoreElement.textContent = `Score: ${points}/${current + 1}`;

    Array.from(optionsElement.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.disabled = false;
}

function finishQuiz() {
    questionElement.textContent = "Quiz Completed!";
    optionsElement.replaceChildren();
    feedbackElement.textContent =
        "Thank you for completing the awareness quiz.";
    scoreElement.textContent =
        `Your final score is ${points}/${questions.length}.`;

    nextButton.textContent = "Restart Quiz";
    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    if (!answered && nextButton.textContent !== "Restart Quiz") return;

    if (nextButton.textContent === "Restart Quiz") {
        current = 0;
        points = 0;
        showQuestion();
        return;
    }

    if (current < questions.length - 1) {
        current++;
        showQuestion();
    } else {
        finishQuiz();
    }
});

showQuestion();
