# XCELLERA: Modern Excel Analytics Platform

**XCELLERA** is a full-stack web platform that empowers users to upload, analyze, visualize, and summarize Excel data with a beautiful, modern UI. Built with the MERN stack (MongoDB, Express, React, Node.js), it features secure authentication (Clerk), dynamic charting, upload history, and AI-powered summaries (mocked for demo). The platform is designed for seamless, user-friendly analytics and is ready for future enhancements.

---

**Tech Stack:**
- **Frontend:** React (Vite), Tailwind CSS, Clerk (Authentication)
- **Backend:** Node.js, Express, MongoDB (local/Atlas), Mongoose
- **AI Summaries:** OpenAI API (mocked for demo)

**Core Features:**
- Secure user authentication (Clerk)
- Excel file upload and robust data parsing
- Dynamic chart visualization (bar/line, selectable axes)
- Upload history with reload and delete
- Downloadable chart images (PNG)
- AI-powered data summaries (mocked, ready for real integration)
- Modern, responsive UI/UX with glassmorphism and user avatars

**Current State:**
- All core features implemented and demo-ready
- AI summary feature is mocked for demo, real integration ready when API key is available
- Future plans include admin panel, more analytics, and enhanced UI/UX

---

## Planned Features

- **Admin Panel:**
  - Manage users, view analytics, and oversee uploaded data.
  - Admin-only controls for data moderation and platform settings.
- **Advanced Analytics:**
  - More chart types, data filtering, and export options.
- **Enhanced AI Integration:**
  - Real-time AI summaries, insights, and recommendations.
- **Team Collaboration:**
  - Shared workspaces, roles, and permissions.
- **UI/UX Upgrades:**
  - More animations, dark mode, and accessibility improvements.

---

## 🚀 Live Demo
[View the live app on Vercel](https://xcellera-2-0-wwo8.vercel.app/) 

> **Note:**
> The deployed version is **frontend-only**. Data is **not saved** to the backend/database. For full functionality (including data persistence and AI summaries), please run the backend locally as described below.

---

## 📊 Features
- **User Authentication** (Clerk)
- **Excel File Upload & Parsing** (SheetJS)
- **Interactive Data Table & Dynamic Charting** (Chart.js)
- **Upload History** (view/delete previous uploads)
- **Download Charts as PNG**
- **AI-Powered Data Summaries** (mocked/demo)
- **Modern, Responsive UI** (Tailwind CSS)
- **Loading Animations** for smooth UX

> **Note:** Data persistence and AI summaries require running the backend locally.

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Chart.js, Clerk
- **Backend:** Node.js, Express, MongoDB (Mongoose), OpenAI (mocked)

---

## 🖥️ Local Development

### 1. Clone the repo
```bash
git clone <repo-url>
cd Xcellera
```

### 2. Setup the Backend
```bash
cd server
npm install
# Create a .env file with your MongoDB URI and OpenAI key (optional)
npm start
```

### 3. Setup the Frontend
```bash
cd ../client
npm install
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## ⚙️ Environment Variables
- **Backend (.env):**
  - `MONGODB_URI=your_mongodb_uri`
  - `OPENAI_API_KEY=your_openai_key` (optional, for AI summaries)

---

## 📦 Folder Structure
```
Xcellera/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   ├── logo.png
│   │   └── xcellera.png
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── assets/
│   │   └── components/
│   │       ├── FileUpload.jsx
│   │       ├── UploadHistory.jsx
│   │       ├── Loader.jsx
│   │       ├── DataChart.jsx
│   │       ├── DownloadTab.jsx
│   │       └── Navbar.jsx
│   │   └── pages/
│   │       ├── Dashboard.jsx
│   │       ├── Navbar.jsx
│   │       ├── SignUp.jsx
│   │       ├── SignIn.jsx
│   │       ├── Login.jsx
│   │       └── Register.jsx
│   ├── server/
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── models/
│   │   │   └── ExcelData.js
│   │   └── routes/
│   │       ├── aiSummarize.js
│   │       └── excelData.js
│   └── README.md
```

> **Note:** This is a simplified view. Some folders (like `node_modules`, `public`, etc.) are omitted for clarity.

---

## 🙏 Credits
- [Clerk](https://clerk.com/) for authentication
- [SheetJS](https://sheetjs.com/) for Excel parsing
- [Chart.js](https://www.chartjs.org/) for charting
- [OpenAI](https://openai.com/) for AI summaries (mocked)

---

## 🌐 Add Your Live Link
Replace the `#` in the **Live Demo** section above with your deployed Vercel link!

---

## 💡 Future Ideas
- Enable real AI summaries
- Add admin panel
- More chart types & analytics
- 3D/animated UI polish

---

**Made with ❤️ by Debesh**

 