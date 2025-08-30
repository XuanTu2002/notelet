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

    // Create note header
    const noteHeader = document.createElement('div');
    noteHeader.className = 'note-header';

    const noteText = document.createElement('p');
    noteText.textContent = note;

    // Add note content to the note div
    const noteContent = document.createElement('div');
    noteContent.className = 'note-content';
    noteContent.appendChild(noteText);

    // Check if note exceeds preview length
    if (note.length > MAX_PREVIEW_LENGTH) {
      const preview = note.substring(0, MAX_PREVIEW_LENGTH) + '...';
      noteText.textContent = preview;

      const readMoreBtn = document.createElement('button');
      readMoreBtn.textContent = 'Read more';
      readMoreBtn.className = 'read-more-btn';

      readMoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (noteDiv.classList.contains('expanded')) {
          noteText.textContent = preview;
          readMoreBtn.textContent = 'Read more';
          noteDiv.classList.remove('expanded');
        } else {
          noteText.textContent = note;
          readMoreBtn.textContent = 'Show less';
          noteDiv.classList.add('expanded');
        }
      });

      noteHeader.appendChild(readMoreBtn);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteNote(index);
    });

    // Assemble the note
    noteDiv.appendChild(noteHeader);
    noteDiv.appendChild(noteContent);
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
