# Mini Notes Chrome Extension – Context File

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

### Nice-to-have (Future)
- Organize notes into folders/categories.
- Star/favorite notes (show pinned at top).
- Sync notes across devices with `chrome.storage.sync`.
- Search/filter notes.

---

## 🛠 Tech Stack
- **Manifest V3** (Chrome Extensions API).
- **HTML + CSS + JavaScript (Vanilla)** for simplicity.
- **Chrome Storage API** for persistence.
- (Optional) TailwindCSS for faster UI styling.

---

## 📂 Folder Structure
