const words = [
    'Thunderstorm', 'blueberry', 'armchair', 'cupboard', 'whiteboard',
    'helicopter', 'trousers', 'password', 'wordsearch', 'bathroom'
];

let spellingAttempts = 0;
const maxSpellingAttempts = 5;

// Function to start the Spelling Game
function startSpellingGame() {
    spellingAttempts++;

    if (spellingAttempts > maxSpellingAttempts) {
        document.getElementById('spelling-result').textContent = `Game Over! You guessed ${spellingAttempts - 1} words correctly out of ${maxSpellingAttempts}.`;
        document.getElementById('spelling-result').style.color = 'blue';
        document.getElementById('start-spelling-button').style.display = 'none';
        document.getElementById('word-choice-container').style.display = 'none'; // Hide choices
        spellingAttempts = 0; // Reset attempts for future games
        return;
    }

    const correctWord = words[Math.floor(Math.random() * words.length)];
    const choices = generateChoices(correctWord);

    const container = document.getElementById('word-choice-container');
    container.innerHTML = ''; // Clear previous choices

    // Shuffle the choices randomly using Fisher-Yates Shuffle
    shuffleArray(choices);

    choices.forEach(word => {
        const button = document.createElement('button');
        button.className = 'word-choice';
        button.textContent = word;
        button.onclick = () => checkSpelling(word, correctWord);
        container.appendChild(button);
    });

    container.style.display = 'block'; // Show the choices
    document.getElementById('spelling-result').textContent = '';
}

// Function to generate choices with one correct word and several misspelled options
function generateChoices(correctWord) {
    const choices = new Set([correctWord]);

    while (choices.size < 3) {
        let misspelled = getRandomMisspelling(correctWord);
        choices.add(misspelled);
    }

    return Array.from(choices);
}

// Function to create a misspelled version of a word
function getRandomMisspelling(word) {
    const index = Math.floor(Math.random() * word.length);
    const misspelled = word.substring(0, index) + getRandomChar() + word.substring(index + 1);
    return misspelled;
}

// Function to get a random character
function getRandomChar() {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return chars[Math.floor(Math.random() * chars.length)];
}

// Function to check spelling
function checkSpelling(selectedWord, correctWord) {
    const result = document.getElementById('spelling-result');

    if (selectedWord === correctWord) {
        result.textContent = 'Correct!';
        result.style.color = 'green';
    } else {
        result.textContent = 'Wrong! Try again.';
        result.style.color = 'red';
    }
}

// Times Table Game Variables
let multiplicationNumber;
let multiplicationAnswer;

// Function to start multiplication game
function startMultiplicationGame() {
    document.getElementById('times-table-form').style.display = 'none';
    const number = document.getElementById('number-choice').value;
    multiplicationNumber = parseInt(number);
    multiplicationAnswer = Math.floor(Math.random() * 12) + 1;

    // Display question
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('question').textContent = `What is ${multiplicationNumber} x ${multiplicationAnswer}?`;

    // Clear the answer input and result message
    document.getElementById('answer').value = '';
    document.getElementById('multiplication-result').textContent = '';
}

// Function to check multiplication answer
function checkAnswer() {
    const answer = parseInt(document.getElementById('answer').value);
    const result = document.getElementById('multiplication-result');

    if (answer === multiplicationNumber * multiplicationAnswer) {
        result.textContent = 'Correct!';
        result.style.color = 'green';
        startMultiplicationGame(); // Start a new quiz
    } else {
        result.textContent = 'Wrong! Try again.';
        result.style.color = 'red';
    }
}

// Guess the Number Variables
let randomNumber;
let attempts;
const maxAttempts = 6;

// Function to start guess number game
function startGuessGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = maxAttempts;
    document.getElementById('guess-result').textContent = `You have ${attempts} chances left.`;
    document.getElementById('guess-input').value = ''; // Clear input field
    document.getElementById('guess-number-game').style.display = 'block'; // Corrected
    document.getElementById('start-guess-button').style.display = 'none';
}

// Function to handle guess
function handleGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = parseInt(guessInput.value);
    const result = document.getElementById('guess-result');

    if (isNaN(guess)) {
        result.textContent = 'Please enter a valid number.';
        return;
    }

    attempts--;

    if (guess === randomNumber) {
        result.textContent = `Congratulations! You guessed the number!`;
        result.style.color = 'green';
        document.getElementById('start-guess-button').style.display = 'block';
    } else if (attempts === 0) {
        result.textContent = `Game Over! The number was ${randomNumber}.`;
        result.style.color = 'red';
    } else {
        let hint = guess < randomNumber ? 'higher' : 'lower';
        result.textContent = `Try ${hint}. You have ${attempts} chances left.`;
        result.style.color = 'orange';
    }
}

// Function to shuffle an array using Fisher-Yates Shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Add event listeners
document.getElementById('start-spelling-button').addEventListener('click', startSpellingGame);
document.querySelector('#times-table-form button').addEventListener('click', startMultiplicationGame);
document.querySelector('#question-container button').addEventListener('click', checkAnswer);
document.querySelector('#guess-number-game button').addEventListener('click', handleGuess);
document.getElementById('start-guess-button').addEventListener('click', startGuessGame);
