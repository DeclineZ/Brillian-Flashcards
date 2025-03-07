let currentCardIndex = 0; // Track the current flashcard
let maxCardIndex = 0;

const urlParams = new URLSearchParams(window.location.search);

const maxpage = urlParams.get('flashcards');   

maxCardIndex = maxpage - 1;

// Function to generate the flashcard dynamically
function generateFlashcard(card) {
    const flashcardContainer = document.getElementById('flashcard');
    flashcardContainer.innerHTML = `
        <div class="flashcard-inner">
            <div class="flashcard-front" onClick="flipCard()">
                <div>${card.front}</div>
            </div>
            <div class="flashcard-back" onClick="flipCard()">
                <div>${card.back}</div>
                <button id="explanation-btn-${card.id}" class="btn btn-info mt-3">AI Explanation</button>
                <div class="ai-explanation" id="explanation-${card.id}" style="display: none;">
                    <div id="loading-${card.id}" class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div id="explanation-text-${card.id}" style="display: none;">
                        ${card.aiExplanation}
                    </div>
                </div>
                <div>
                    <button class="btn btn-success mt-3" onClick="showNextCardSpecial()">Easy</button>
                    <button class="btn btn-warning mt-3" onClick="showNextCardSpecial()">Medium</button>
                    <button class="btn btn-danger mt-3" onClick="showNextCardSpecial()">Hard</button>
                </div>
            </div>
        </div>
    `;

    // Add event listener to AI Explanation button
    const explanationButton = document.getElementById(`explanation-btn-${card.id}`);
    explanationButton.addEventListener('click', function(event) {
        showExplanation(card.id, event);
    });
}


// Function to flip the card on click
function flipCard(){
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
};

// Function to show AI explanation
function showExplanation(cardId, event) {
    // Prevent the click from triggering the card flip
    event.stopPropagation();

    const loadingSpinner = document.getElementById(`loading-${cardId}`);
    const explanationText = document.getElementById(`explanation-text-${cardId}`);

    const explanation = document.getElementById(`explanation-${cardId}`);
    explanation.style.display = explanation.style.display === 'block' ? 'none' : 'block';

    // Hide the explanation text initially
    explanationText.style.display = 'none';
    
    // Show the loading spinner
    loadingSpinner.style.display = 'block';

    // Simulate a loading delay (1-3 seconds)
    const delay = Math.floor(Math.random() * 2000) + 1000; // Random delay between 1000ms to 3000ms
    setTimeout(function() {
        // Hide the spinner and show the explanation text
        loadingSpinner.style.display = 'none';
        explanationText.style.display = 'block';
    }, delay);
}

// Function to show the next card after flipping
function showNextCardSpecial() {

    if (currentCardIndex >= maxCardIndex) {
        alert("You've completed the flashcards!");
        window.location.href = "index.html";
        return;
    } else {
        currentCardIndex++;
    }

    // Generate the next flashcard
    generateFlashcard(flashcards[currentCardIndex]);

    updateRemainingCount();
};

function updateRemainingCount() {
    const remainingCount = maxCardIndex - currentCardIndex;
    document.getElementById('remainingCount').textContent = `Remaining Flashcards: ${remainingCount}`;
}


// Function to show the next card after flipping
function showNextCard() {
    
    const flashcard = document.getElementById('flashcard');

    // Flip the card if it is not already flipped
    if (flashcard.classList.contains('flipped')) {
        flashcard.classList.remove('flipped');
    }

    if (currentCardIndex >= maxCardIndex) {
        alert("You've completed the flashcards!");
        window.location.href = "index.html";
        return;
    } else {
        currentCardIndex++;
    }


    // Generate the next flashcard
    generateFlashcard(flashcards[currentCardIndex]);

    updateRemainingCount();

    
};

function showBeforeCard() {
    const flashcard = document.getElementById('flashcard');

    // Flip the card if it is not already flipped
    if (flashcard.classList.contains('flipped')) {
        flashcard.classList.remove('flipped');
    }

    if(currentCardIndex >= 1) {
    currentCardIndex--;}

    if (currentCardIndex >= maxCardIndex) {
        alert("You've completed the flashcards!");
        window.location.href = "index.html";
    }

    // Generate the next flashcard
    generateFlashcard(flashcards[currentCardIndex]);

    updateRemainingCount();
};

// Initialize the first flashcard
generateFlashcard(flashcards[currentCardIndex]);

updateRemainingCount();

// Next card button event
document.getElementById("next-card").addEventListener("click", showNextCard);


