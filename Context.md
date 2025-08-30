# Notelet - A Mini Notes Chrome Extension

## 📌 Purpose
A minimalist Chrome Extension to save and manage text notes (e.g., ChatGPT prompts, website links, stories).  
It should be **aesthetic, lightweight, distraction-free**.

---

## 🚀 Features

### Must-have (MVP)
- Create, Read, Update, Delete (CRUD) notes.
- Persist notes using `chrome.storage.local`.
- Popup UI with:
  - Textarea for adding notes.
  - List view of existing notes.
  - Edit + delete actions.

---

## 🛠 Tech Stack
- **Manifest V3** (Chrome Extensions API).
- **HTML + CSS + JavaScript (Vanilla)** for simplicity.
- **Chrome Storage API** for persistence.
- (Optional) TailwindCSS for faster UI styling.

---

## 📂 Folder Structure
/note-extension
├─ manifest.json        # Chrome extension config
├─ popup.html           # UI for popup window
├─ popup.js             # JS logic (CRUD)
├─ style.css            # Styling
├─ icons/
│   └─ icon128.png      # Extension icon
└─ README.md            # Project guide
