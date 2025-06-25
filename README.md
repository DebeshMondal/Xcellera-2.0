# XCELLERA

A modern Excel analytics platform built with the MERN stack (MongoDB, Express, React, Node.js).

---

## 🚀 Live Demo
[View the live app on Vercel](#) <!-- Replace # with your live link -->

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
  client/    # React frontend
  server/    # Express backend
```

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

**Made with ❤️ by [Your Name] & ChatGPT**

