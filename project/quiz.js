    // Fragen und Antworten:
    const quizData = [
        {
            question: "Was ist HTML?",
            answers: [
                { option: "Eine Programmiersprache", correct: false },
                { option: "Eine Auszeichnungssprache", correct: true },
                { option: "Ein Betriebssystem", correct: false },
                { option: "Ein Webbrowser", correct: false },
            ],
        },
        {
            question: "Was ist CSS?",
            answers: [
                { option: "Eine Programmiersprache", correct: false },
                { option: "Eine Auszeichnungssprache", correct: false },
                { option: "Ein Betriebssystem", correct: false },
                { option: "Eine Stylesheet-Sprache", correct: true },
            ],
        },
        {
            question: "Welche Programmiersprache wird für die Entwicklung von Android-Apps verwendet?",
            answers: [
                { option: "C++", correct: false },
                { option: "Java", correct: true },
                { option: "Python", correct: false },
                { option: "JavaScript", correct: false },
            ],
        },
        {
            question: "Was ist ein API?",
            answers: [
                { option: "Eine Art von Datenbank", correct: false },
                { option: "Eine Programmierschnittstelle", correct: true },
                { option: "Ein Webbrowser", correct: false },
                { option: "Eine Textverarbeitung", correct: false },
            ],
        },
        {
            question: "Was ist ein Frontend-Entwickler?",
            answers: [
                { option: "Jemand, der sich um die Sicherheit von Webseiten kümmert", correct: false },
                { option: "Jemand, der sich um das Design und die Benutzeroberfläche von Webseiten kümmert", correct: true },
                { option: "Jemand, der sich um die Serververwaltung kümmert", correct: false },
                { option: "Jemand, der sich um die Datenbanken kümmert", correct: false },
            ],
        },
        {
            question: "Was ist ein Backend-Entwickler?",
            answers: [
                { option: "Jemand, der sich um die Sicherheit von Webseiten kümmert", correct: false },
                { option: "Jemand, der sich um das Design und die Benutzeroberfläche von Webseiten kümmert", correct: false },
                { option: "Jemand, der sich um die Serververwaltung kümmert", correct: true },
                { option: "Jemand, der sich um die Datenbanken kümmert", correct: false },
            ],
        },
        {
            question: "Was ist JavaScript?",
            answers: [
                { option: "Eine Programmiersprache", correct: true },
                { option: "Eine Auszeichnungssprache", correct: false },
                { option: "Ein Betriebssystem", correct: false },
                { option: "Ein Webbrowser", correct: false },
            ],
        },
        {
            question: "Was ist eine Datenbank?",
            answers: [
                { option: "Eine Programmiersprache", correct: false },
                { option: "Eine Auszeichnungssprache", correct: false },
                { option: "Ein Betriebssystem", correct: false },
                { option: "Ein System zur Speicherung von Daten", correct: true },
            ],
        },
    ];

    const quizContainer = document.querySelector("#quiz");


    // Momentane Frage und Antworten anzeigen
    function showQuestion(questionIndex) {
        const item = quizData[questionIndex];
        let questionElement = document.createElement('div');
        questionElement.classList.add('question');
        let questionTitle = document.createElement('h2');
        questionTitle.textContent = item.question;
        let answersList = document.createElement('ul');
        answersList.classList.add('answers');
        item.answers.forEach((answer) => {
            let answerItem = document.createElement('li');
            let answerInput = document.createElement('input');
            answerInput.setAttribute('type', 'radio');
            answerInput.setAttribute('name', `question-${questionIndex}`);
            answerInput.setAttribute('value', answer.option);
            let answerLabel = document.createElement('label');
            answerLabel.textContent = answer.option;
            answerItem.appendChild(answerInput);
            answerItem.appendChild(answerLabel);
            answersList.appendChild(answerItem);
        });
        questionElement.appendChild(questionTitle);
        questionElement.appendChild(answersList);
        quizContainer.innerHTML = '';
        quizContainer.appendChild(questionElement);
    }

    // Get navigation button elements
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");

    // Set initial question index and display first question
    let currentQuestionIndex = 0;
    showQuestion(currentQuestionIndex);

    // Handle navigation button clicks
    prevButton.addEventListener("click", () => {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        if (currentQuestionIndex === 0) {
            prevButton.disabled = true;
        }
        nextButton.disabled = false;
    });

    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        if (currentQuestionIndex === quizData.length - 1) {
            nextButton.disabled = true;
        }
        prevButton.disabled = false;
    });

    // Disable previous button initially
    prevButton.disabled = true;

    // Abgabeknopf erstellen
    const submitButton = document.querySelector("#submit");

    // Handle submit button click
    submitButton.addEventListener("click", () => {
        // Calculate score
        let score = 0;
        quizData.forEach((item, index) => {
            const selected = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selected && selected.value === item.answers.find(answer => answer.correct).option) {
                score++;
            }
        });
        // Display score
        quizContainer.innerHTML = `
          <div class="score">
            <h2>You scored ${score} out of ${quizData.length}!</h2>
          </div>
        `;
        // Hide navigation buttons
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        // Hide submit button
        submitButton.style.display = "none";
    });
    showQuestion(currentQuestionIndex)