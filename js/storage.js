// Storage utilities for Notelet
class NoteStorage {
  static async getNotes() {
    const result = await chrome.storage.local.get('notes');
    return result.notes || [];
  }

  static async saveNotes(notes) {
    await chrome.storage.local.set({ notes });
  }

  static async addNote(note) {
    const notes = await this.getNotes();
    notes.unshift(note);
    await this.saveNotes(notes);
    return notes;
  }

  static async updateNote(index, updatedNote) {
    const notes = await this.getNotes();
    if (index >= 0 && index < notes.length) {
      notes[index] = updatedNote;
      await this.saveNotes(notes);
    }
    return notes;
  }

  static async deleteNote(index) {
    const notes = await this.getNotes();
    if (index >= 0 && index < notes.length) {
      notes.splice(index, 1);
      await this.saveNotes(notes);
    }
    return notes;
  }
}

export default NoteStorage;
