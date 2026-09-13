// ===== DIET MOUNTAIN DOLL DIARIES SCRIPT =====

// Sample stories for the Doll Diaries section
const stories = [
  {
    author: "ClumsynSteph",
    text: "I thought the bathroom door was a push door. It was pull. I literally bounced off it in front of my entire class."
  },
  {
    author: "PinkPanicMode",
    text: "Wore my crush's hoodie to school. Forgot I had hot glue residue on the sleeve from a project. It stuck to her hair. She will never talk to me again."
  },
  {
    author: "GlossGhost",
    text: "Tried a bold winged liner for the first time. One wing was perfect, the other looked like I had a seizure. Wore sunglasses inside for 3 hours."
  },
  {
    author: "ModMisfire",
    text: "Attempted a 60s mod look with false lashes. One fell off mid-conversation. I didn't realize it. Just walked around with one lash on and one off."
  },
  {
    author: "Y2KDisaster",
    text: "Wore low-rise jeans, bent down to pick something up in front of my crush. My baby tee rode up. My entire lower back was showing. He laughed."
  },
  {
    author: "BeautyBlunder",
    text: "Applied bronzer thinking it was blush. Looked like I had mud smeared all over my face. Didn't realize until lunch."
  },
  {
    author: "FashionFail",
    text: "Tried to do a fashion magazine pose for Instagram in a skirt. My legs got tangled. Fell backward into a bush. The photo still got 47 likes."
  },
  {
    author: "LipstickLegend",
    text: "Wore the darkest lipstick ever made to school. Teacher asked if I was okay. I said yes. She did not believe me."
  }
];

// Initialize stories on page load
document.addEventListener('DOMContentLoaded', function() {
  displayStories();
  setupEventListeners();
  loadStoriesFromLocalStorage();
});

// Display random stories
function displayStories() {
  const storiesContainer = document.getElementById('stories');
  const shuffledStories = stories.sort(() => Math.random() - 0.5).slice(0, 3);

  storiesContainer.innerHTML = '';
  shuffledStories.forEach(story => {
    const storyElement = document.createElement('div');
    storyElement.className = 'story';
    storyElement.innerHTML = `
      <p class="story-author">~ ${story.author}</p>
      <p class="story-text">${story.text}</p>
    `;
    storiesContainer.appendChild(storyElement);
  });
}

// Shuffle stories button
function setupEventListeners() {
  const shuffleButton = document.getElementById('shuffleStories');
  if (shuffleButton) {
    shuffleButton.addEventListener('click', displayStories);
  }

  // Read More buttons
  const readMoreButtons = document.querySelectorAll('.read-more');
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const title = this.getAttribute('data-title');
      const text = this.getAttribute('data-text');
      openDialog(title, text);
    });
  });

  // Dialog close button
  const dialog = document.getElementById('tipDialog');
  const closeButton = dialog.querySelector('.close');
  if (closeButton) {
    closeButton.addEventListener('click', () => dialog.close());
  }

  // Form submission
  const form = document.getElementById('storyForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

// Open dialog with tip
function openDialog(title, text) {
  const dialog = document.getElementById('tipDialog');
  document.getElementById('dialogTitle').textContent = title;
  document.getElementById('dialogText').textContent = text;
  dialog.showModal();
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();

  const nickname = document.getElementById('nickname').value || 'AnonDoll';
  const storyText = document.getElementById('storyText').value;
  const formMessage = document.getElementById('formMessage');

  if (!storyText.trim()) {
    showMessage('Please write a story!', 'error');
    return;
  }

  // Add the story to our list
  const newStory = {
    author: nickname,
    text: storyText
  };

  stories.push(newStory);
  saveStoriesToLocalStorage();

  // Clear form
  document.getElementById('storyForm').reset();

  // Show success message
  showMessage('✦ Your doll diary has been submitted! ✦', 'success');

  // Refresh stories display
  displayStories();
}

// Show form message
function showMessage(message, type) {
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;

  setTimeout(() => {
    formMessage.textContent = '';
    formMessage.className = 'form-message';
  }, 3000);
}

// Local storage for stories
function saveStoriesToLocalStorage() {
  localStorage.setItem('dmdStories', JSON.stringify(stories));
}

function loadStoriesFromLocalStorage() {
  const savedStories = localStorage.getItem('dmdStories');
  if (savedStories) {
    const parsedStories = JSON.parse(savedStories);
    stories.push(...parsedStories);
  }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Add keyboard support for dialog close
document.addEventListener('keydown', function(e) {
  const dialog = document.getElementById('tipDialog');
  if (e.key === 'Escape' && dialog.open) {
    dialog.close();
  }
});
