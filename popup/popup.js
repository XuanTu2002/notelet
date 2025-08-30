document.addEventListener('DOMContentLoaded', () => {
  const noteInput = document.getElementById('new-note');
  const addNoteBtn = document.getElementById('add-note');
  const notesList = document.getElementById('notes-list');

  // Load notes when popup opens
  loadNotes();

  // Add new note
  addNoteBtn.addEventListener('click', addNote);
  noteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addNote();
    }
  });

  async function loadNotes() {
    const result = await chrome.storage.local.get('notes');
    const notes = result.notes || [];

    notesList.innerHTML = '';
    notes.forEach((note, index) => {
      const noteElement = createNoteElement(note, index);
      notesList.appendChild(noteElement);
    });
  }

  function createNoteElement(note, index) {
    const MAX_PREVIEW_LENGTH = 100; // Number of characters to show initially
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';

    const noteText = document.createElement('p');

    // Check if note exceeds preview length
    if (note.length > MAX_PREVIEW_LENGTH) {
      const preview = note.substring(0, MAX_PREVIEW_LENGTH) + '...';
      const fullText = note;

      noteText.textContent = preview;

      const readMoreBtn = document.createElement('button');
      readMoreBtn.textContent = 'Read more';
      readMoreBtn.className = 'read-more-btn';

      readMoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (noteText.textContent === preview) {
          noteText.textContent = fullText;
          readMoreBtn.textContent = 'Show less';
          noteDiv.classList.add('expanded');
        } else {
          noteText.textContent = preview;
          readMoreBtn.textContent = 'Read more';
          noteDiv.classList.remove('expanded');
        }
      });

      noteDiv.appendChild(noteText);
      noteDiv.appendChild(readMoreBtn);
    } else {
      noteText.textContent = note;
      noteDiv.appendChild(noteText);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteNote(index);
    });

    noteDiv.appendChild(deleteBtn);

    return noteDiv;
  }

  async function addNote() {
    const note = noteInput.value.trim();
    if (!note) return;

    const result = await chrome.storage.local.get('notes');
    const notes = result.notes || [];
    notes.unshift(note);

    await chrome.storage.local.set({ notes });
    noteInput.value = '';
    loadNotes();
  }

  async function deleteNote(index) {
    const result = await chrome.storage.local.get('notes');
    const notes = result.notes || [];
    notes.splice(index, 1);

    await chrome.storage.local.set({ notes });
    loadNotes();
  }
});
