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
      readMoreBtn.className = 'action-btn read-more';

      const copyBtn = document.createElement('button');
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `;
      copyBtn.className = 'action-btn';
      copyBtn.title = 'Copy to clipboard';
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(note);
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          `;
        }, 1000);
      });

      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'button-group';
      buttonGroup.appendChild(copyBtn);
      buttonGroup.appendChild(readMoreBtn);
      noteHeader.appendChild(buttonGroup);

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
