# React_Projects
# 📝 React & Appwrite Blog Application

A full-stack, feature-rich blogging application built with **React** on the frontend and powered by **Appwrite** for backend services. Users can register, log in, create, edit, and delete their blog posts using an integrated rich text editor.


## ✨ Features

- 🔐 **User Authentication**: Secure user registration, login, and logout flow managed via Appwrite Auth.
- ✍️ **Rich Text Editing**: Draft and format blog posts seamlessly using an embedded rich text editor (RTE).
- 🖼️ **Featured Image Support**: Upload, store, and display cover images for blog posts using Appwrite Bucket Storage.
- 🛠️ **CRUD Operations**: Full Create, Read, Update, and Delete functionality for blog posts.
- ⚡ **State Management**: Centralized user authentication and UI state managed with Redux Toolkit.
- 🎨 **Responsive UI**: Clean and modern user interface styled with Tailwind CSS. And responsive on all devices.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, Redux Toolkit, Tailwind CSS, React Hook Form
- **Editor**: TinyMCE / Real-time RTE component
- **Backend-as-a-Service (BaaS)**: Appwrite (Authentication, Database, Storage)

---

Project Highlights & Architecture
Service Layer Pattern: Appwrite interactions (Auth, Database, Storage) are abstracted into modular service classes for clean separation of concerns.

Form Handling & Validation: Implemented using react-hook-form for efficient inputs and validation.

Protected Routes: Custom authentication wrappers to guard private pages from unauthenticated access.

🙌 Credits & Acknowledgments
Special thanks to:

@hiteshchoudhary for invaluable guidance on integrating Appwrite as a backend service, mastering production-level React workflows, and advanced React.js concepts.
