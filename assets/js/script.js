// Pre-made flashcards set

count = 0;
let maxpage = 20;

let flashcards = [
    { id: 1, name: 'Respiratory System', flashcards: 20 },
  ];
  // Render flashcards
  function renderFlashcards() {
    const flashcardList = document.getElementById('flashcard-list');
    flashcardList.innerHTML = ''; // Clear the list before re-rendering
  
    flashcards.forEach(flashcard => {
      const li = document.createElement('li');
      li.classList.add('flashcard-item');
      
      // Create an anchor tag to link to another HTML file
      const nameLink = document.createElement('a');
      nameLink.classList.add('flashcard-name');
      nameLink.textContent = flashcard.name;
      
      // Set the href attribute to link to the corresponding HTML page
      nameLink.href = `flashcard${flashcard.id}.html?flashcards=${maxpage}`; 
      
      const flashcardsSpan = document.createElement('span');
      flashcardsSpan.classList.add('flashcard-amount');
      flashcardsSpan.textContent = flashcard.flashcards;
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = () => editFlashcard(flashcard.id);
  
      li.appendChild(nameLink);  // Append the anchor tag instead of a span
      li.appendChild(flashcardsSpan);
      li.appendChild(editButton);
      flashcardList.appendChild(li);
    });
}
  
  // Edit flashcard name
  function editFlashcard(id) {
    const flashcard = flashcards.find(flashcard => flashcard.id === id);
    const newName = prompt('Edit flashcard name:', flashcard.name);
    
    if (newName && newName.trim() !== '') {
      flashcard.name = newName.trim();
      renderFlashcards();  // Re-render after editing
    }
  }
  
  // Initial render
  renderFlashcards();
  
// Upload file
  
  // Handle drag & drop event on the drop area
  document.querySelector('.drop').addEventListener('dragover', function(e) {
    e.preventDefault();  // Allow drop
  });
  document.querySelector('.drop').addEventListener('drop', function(e) {
    e.preventDefault();
    replaceWithExampleFile1();
    replaceWithExampleFile2();
  });
  
  // Handle file selection (both click and drag)
  document.getElementById('files').addEventListener('change', function(event) {
    replaceWithExampleFile1();
    replaceWithExampleFile2();
  });
  

    // Example files array
let uploadedFiles = [];

  // Function to replace the uploaded file with the example file
  function replaceWithExampleFile1() {

    uploadedFiles.push({
        name: "5-อารยธรรมเอเชียไมเนอร์.pdf.pdf", 
        type: "application/pdf", 
        icon: "assets/img/pdf.png"
    });
      // Clear the file list
    const list = document.getElementById('list');
    list.innerHTML = '';
  
    // Create a new file item with the example PDF file
    const listItem = document.createElement('div');
    listItem.classList.add('file-item');
  
    uploadedFiles.forEach(file => {
        listItem.innerHTML = `<img src="${file.icon}" alt="PDF Icon" /><span>${file.name} (${file.type})</span>`;})
  
    // Append the file item to the list
    list.appendChild(listItem);       
  }

  let uploadedFiles1 = [];
  function replaceWithExampleFile2() {

    uploadedFiles1.push({
        name: "อารยธรรมเอเชียไมเนอร์.png", 
        type: "image/png", 
        icon: "assets/img/png.png"
    });
  
    // Create a new file item with the example PDF file
    const listItem = document.createElement('div');
    listItem.classList.add('file-item');
  
    uploadedFiles1.forEach(file => {
        listItem.innerHTML = `<img src="${file.icon}" alt="PDF Icon" /><span>${file.name} (${file.type})</span>`;})
  
    // Append the file item to the list
    list.appendChild(listItem);       
  }
  

  
// Handle the "Create Flashcards" button click
document.getElementById("create-flashcards").addEventListener("click", function() {
        if (count == 1) {
            alert('Only the creation of 1 set of flashcards is allowed for this demo')
        } else {
            if (uploadedFiles.length >= 1) {
            const flashcardModal = new bootstrap.Modal(document.getElementById('flashcardModal'));
            flashcardModal.show();
            count ++;

            maxpage = Math.floor(Math.random() * (25 - 5) + 1 ) + 5;
  
            // Show the loading spinner and hide the form
            document.getElementById("loadingSpinner").style.display = "block";
          
            // Simulate a 3-second delay (like an AI processing/loading delay)
            setTimeout(function() {
              // Hide the loading spinner
              document.getElementById("loadingSpinner").style.display = "none";
              
              // Add an example flashcard set to the flashcards array
              flashcards.push({
                id: flashcards.length + 1, 
                name: `Asia Minor`,
                flashcards: maxpage,
              });
          
              console.log("Flashcards:", flashcards); // Show the updated array in the console
              renderFlashcards();
          
              // Close the modal
              const flashcardModal = bootstrap.Modal.getInstance(document.getElementById('flashcardModal'));
              flashcardModal.hide();
        
                    // Clear the file list
              const list = document.getElementById('list');
              list.innerHTML = '';
          
              // Enable the button again
              document.getElementById("submitFlashcards").disabled = false;
            }, 3000); // 3-second delay
        }}    
  });
  