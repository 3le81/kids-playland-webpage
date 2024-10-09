const words = [
    'Thunderstorm', 'Blueberry', 'Armchair', 'Cupboard', 'Whiteboard',
    'Helicopter', 'Trousers', 'Password', 'Wordsearch', 'Bathroom', 'Necessary', 'Underneath'
];

let spellingAttempts = 0;
let correctAnswers = 0; // Track correct answers
const maxSpellingAttempts = 6; // Total attempts allowed

// Function to start the Spelling Game
function startSpellingGame() {
    if (spellingAttempts < maxSpellingAttempts) {
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
        document.getElementById('start-spelling-button').style.display = 'none'; // Hide start button
        spellingAttempts++;
    } else {
        // Show final result after all attempts
        document.getElementById('spelling-result').textContent = `Game Over! You guessed ${correctAnswers} out of ${maxSpellingAttempts}.`;
        document.getElementById('spelling-result').style.color = 'blue';
        document.getElementById('start-spelling-button').style.display = 'block'; // Show start button
        document.getElementById('start-spelling-button').textContent = 'Start Again'; // Change button text
        spellingAttempts = 0; // Reset for next game
        correctAnswers = 0; // Reset correct answers
    }
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
        correctAnswers++; // Increment correct answers
    } else {
        result.textContent = 'Wrong! Try again.';
        result.style.color = 'red';
    }

    // If all attempts are made, we won't need to show the next question
    if (spellingAttempts < maxSpellingAttempts) {
        document.getElementById('start-spelling-button').style.display = 'block'; // Show "Next" button
        document.getElementById('start-spelling-button').textContent = 'Next'; // Change button text
    } else {
        startSpellingGame(); // Start the game over or show final results
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

// Add event listener for the start button
document.getElementById('start-spelling-button').addEventListener('click', startSpellingGame);

// TIMES TABLE GAME:
// Get elements
const startMultiplicationButton = document.getElementById('start-multiplication-button');
const submitAnswerButton = document.getElementById('submit-answer-button');
const restartMultiplicationButton = document.getElementById('restart-multiplication-button');
const questionContainer = document.getElementById('question-container');
const multiplicationForm = document.getElementById('times-table-form');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const multiplicationResult = document.getElementById('multiplication-result');
const numberChoiceInput = document.getElementById('number-choice');

// Variables to store game state
let correctAnswer = 0;
let numberChoice = 0;
let randomMultiplier = 0;
let guessCount = 0;
let totalQuestions = 6; // Total number of questions

// Start the multiplication game
startMultiplicationButton.addEventListener('click', startMultiplicationGame);

// Submit answer event
submitAnswerButton.addEventListener('click', checkAnswer);

// Restart the game
restartMultiplicationButton.addEventListener('click', resetGame);

function startMultiplicationGame() {
    // Get the chosen number from the input
    numberChoice = parseInt(numberChoiceInput.value);
    
    if (isNaN(numberChoice) || numberChoice < 1 || numberChoice > 12) {
        multiplicationResult.textContent = "Please choose a number between 1 and 12.";
        return;
    }
    
    // Reset the guess count
    guessCount = 0;

    // Hide the form and display the question container
    multiplicationForm.style.display = 'none';
    questionContainer.style.display = 'block';
    multiplicationResult.textContent = '';  // Clear previous messages

    // Ask the first question
    askMultiplicationQuestion();
}

function askMultiplicationQuestion() {
    if (guessCount < totalQuestions) {
        // Generate a random number between 1 and 12
        randomMultiplier = Math.floor(Math.random() * 12) + 1;

        // Calculate the correct answer
        correctAnswer = numberChoice * randomMultiplier;

        // Display the question
        questionElement.textContent = `What is ${numberChoice} x ${randomMultiplier}?`;
    } else {
        // If the user has answered all 6 questions, end the game
        endGame();
    }
}

function checkAnswer() {
    // Get the user's answer
    const userAnswer = parseInt(answerInput.value);

    if (isNaN(userAnswer)) {
        multiplicationResult.textContent = "Please enter a valid number.";
        return;
    }
    
    // Check if the answer is correct
    if (userAnswer === correctAnswer) {
        multiplicationResult.textContent = `Correct! (${guessCount + 1}/${totalQuestions})`;
        multiplicationResult.style.color = "green";
    } else {
        multiplicationResult.textContent = `Incorrect. The correct answer was ${correctAnswer}. (${guessCount + 1}/${totalQuestions})`;
        multiplicationResult.style.color = "red";
    }

    // Increment the guess count
    guessCount++;

    // Clear the answer input
    answerInput.value = '';

    // Ask the next question or end the game if 6 guesses are done
    askMultiplicationQuestion();
}

function endGame() {
    // Hide the question container
    questionContainer.style.display = 'none';

    // Display final message and restart button
    multiplicationResult.textContent = `Great job! You've completed ${totalQuestions} questions!`;
    multiplicationResult.style.color = "blue";
    restartMultiplicationButton.style.display = 'block';
}

function resetGame() {
    // Reset the game state
    answerInput.value = '';
    numberChoiceInput.value = '';
    multiplicationResult.textContent = '';

    // Reset button visibility
    restartMultiplicationButton.style.display = 'none';
    submitAnswerButton.style.display = 'block';
    
    // Show the form again
    multiplicationForm.style.display = 'block';
    questionContainer.style.display = 'none';
}


// GUESS THE NUMBER GAME

// Guess the Number Variables
let randomNumber;
let attempts;
const maxAttempts = 6;

// Function to start the Guess the Number game
function startGuessGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 100
    attempts = maxAttempts; // Set max attempts
    document.getElementById('guess-result').textContent = `You have ${attempts} chances left.`; // Display remaining chances
    document.getElementById('guess-input').value = ''; // Clear input field
    document.getElementById('guess-input').style.display = 'inline-block'; // Show input field
    document.getElementById('submit-guess-button').style.display = 'inline-block'; // Show submit button
    document.getElementById('start-guess-button').style.display = 'none'; // Hide start button
}

// Function to handle the player's guess
function handleGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = parseInt(guessInput.value); // Get the player's guess
    const result = document.getElementById('guess-result'); // Get result display

    // Check if input is a valid number
    if (isNaN(guess) || guess < 1 || guess > 100) {
        result.textContent = 'Please enter a valid number between 1 and 100.';
        result.style.color = 'red';
        return;
    }

    attempts--; // Decrease attempts after each guess

    // Check if the guess is correct
    if (guess === randomNumber) {
        result.textContent = `Congratulations! You guessed the number in ${maxAttempts - attempts} attempt(s)!`;
        result.style.color = 'green';
        endGuessGame();
    } else if (attempts === 0) {
        result.textContent = `Game Over! The correct number was ${randomNumber}.`;
        result.style.color = 'red';
        endGuessGame();
    } else {
        // Provide hints and remaining attempts
        const hint = guess < randomNumber ? 'higher' : 'lower';
        result.textContent = `Try guessing ${hint}. You have ${attempts} chance(s) left.`;
        result.style.color = 'orange';
    }

    guessInput.value = ''; // Clear the input for the next guess
}

// Function to end the Guess the Number game
function endGuessGame() {
    // Hide input and submit button after the game ends
    document.getElementById('guess-input').style.display = 'none';
    document.getElementById('submit-guess-button').style.display = 'none';

    // Show the "Start Again" button to reset the game
    document.getElementById('start-guess-button').style.display = 'inline-block';
    document.getElementById('start-guess-button').textContent = 'Start Again';
}

// Add event listeners
document.getElementById('start-guess-button').addEventListener('click', startGuessGame);
document.getElementById('submit-guess-button').addEventListener('click', handleGuess);
