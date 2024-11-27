# AyurGuru

**AyurGuru** is an innovative platform integrating ancient Ayurvedic knowledge with modern AI to provide holistic health solutions. It features AI-driven tools for personalized insights and seamless user interaction.  

---

## 🚀 Features

### 1. **AI-Driven Conversational Assistant**
AyurGuru includes a powerful AI-powered chatbot that:  
- Provides **Ayurvedic remedies** and **insights** in real time.  
- Offers accurate and personalized health solutions.  
- Facilitates seamless conversations to address user queries about Ayurveda.

### 2. **Personalized Health Insights**
- Users can **upload medical documents**, reports, or images.  
- The AI analyzes these documents to deliver tailored recommendations.  
- Chats adapt dynamically based on uploaded documents, ensuring personalized user experiences.

### 3. **Comprehensive Ayurvedic Blogs**
- Explore rich blogs covering Ayurvedic experiences, insights, and wellness tips.  
- Gain knowledge about Ayurveda and its applications for holistic health.  

---

## 🌐 Website Overview
The website is built using **React.js** and **Tailwind CSS**, ensuring a sleek and responsive design across all devices.  

### Key Features:
- **Tabs:** For exploring blogs and learning more about the platform.  
- **Contact Us:** Enables users to send direct messages.  
- **Consultation App:**  
  - Users must sign up or sign in to access the chatbot system.  
  - Chats are securely stored and available for reference in future conversations.  
  - Users can upload documents for analysis, enhancing personalized responses.  
  - Options to delete and start new conversations ensure flexibility.  
- Fully responsive design for desktop, tablet, and mobile devices.  

---

## 📸 Screenshots

### 1. Homepage  
![Homepage Screenshot](https://github.com/abhaydixit07/ayurguru-frontend/blob/main/public/Screenshot%202024-11-27%20172132.png)

### 2. Chatbot Interface  
![Chatbot Interface](https://via.placeholder.com/800x400?text=Chatbot+Interface)

### 3. Blog Section  
![Blog Section](https://via.placeholder.com/800x400?text=Blog+Section)

---

## 🛠️ Tech Stack

### **Frontend:**
- **Frameworks:** React.js, Vite  
- **Styling:** Tailwind CSS for better responsiveness  
- **Markdown:** React Markdown for dynamic content rendering  

### **Backend:**
- **Server:** Node.js with Express.js  
- **Database:** MongoDB (for user data and chats)  
- **Storage:** PostgreSQL (for files such as PDFs and images)  
- **Integrations:** Google Sheets API for handling contact messages  
- [AyurGuru Backend Repository](https://github.com/abhaydixit07/Ayurguru-backend)

### **AI System:**
- **Model:** Llama 3.1 by Meta  
- **Platform:** Groq Cloud  
- **API Framework:** Python with Flask  
- [AyurGuru AI API Repository](https://github.com/abhaydixit07/ayurguru-flask-api)

### **File Summarization:**
- **Model:** Gemini 1.5 Pro  
- **API Framework:** Flask with python 
- [Gemini File API Repository](https://github.com/abhaydixit07/gemini-file-api)

---

## 🧩 Installation Guide

Follow these steps to set up AyurGuru:

### 1. Clone the Frontend Repository:
```bash
git clone https://github.com/abhaydixit07/ayurguru-frontend
```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Configure Environment Variables:
Create a `.env` file in the project root and add the following variables:
```env
VITE_AUTH_MESSAGE=<your-auth-message>
VITE_SECRET_TOKEN=<your-secret-token>
VITE_API_URL_PDF=<file-api-url>
VITE_API_URL_IMAGE=<image-api-url>
VITE_BACKEND_URL=<backend-url>
VITE_AI_API_URL=<ai-api-url>
```

### 4. Coordinate with Other Repositories:
Ensure the following repositories are set up and running as per their respective README instructions:  
- [AyurGuru Backend](https://github.com/abhaydixit07/Ayurguru-backend)  
- [AyurGuru Flask AI API](https://github.com/abhaydixit07/ayurguru-flask-api)  
- [Gemini File API](https://github.com/abhaydixit07/gemini-file-api)  

### 5. Run the Frontend:
```bash
npm run dev
```
The application will be accessible at the local development URL.

---

## 🌐 Deployment

The recommended deployment platform for the frontend is **Vercel**, as it efficiently supports Vite + React templates.  
Refer to the respective repositories for deploying the backend and AI APIs.

---

## 📄 License

This project is licensed under the terms of the [MIT License](https://github.com/abhaydixit07/ayurguru-frontend/blob/main/LICENSE).

---

## 📞 Contact
For queries, feel free to reach out via the **Contact Us** section on the website or raise an issue in the repository.  

---

**AyurGuru: Unlock the Power of Ancient Ayurvedic Wisdom**
