# CareerConnect - Full Stack Job Portal

## Overview
CareerConnect is a full-stack job portal application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a seamless platform for job seekers to search and apply for jobs while enabling employers to post job listings and manage applications efficiently.

## Features
- **User Authentication** (Sign Up, Login, Logout) using JWT
- **Role-Based Access Control** (Job Seekers & Employers)
- **Job Posting & Management** for Employers
- **Job Search & Application** for Job Seekers
- **Resume Upload Functionality**
- **Dashboard** for managing job applications and listings
- **Advanced Search & Filters** to refine job searches
- **Real-time Notifications** for job updates and application status
- **Responsive UI** with a professional and engaging user experience

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **State Management:** Redux Toolkit (Optional)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- MongoDB (local or cloud instance)

### Steps to Run Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com/shahil26/careerConnect.git
   cd careerConnect
   ```
2. **Install dependencies:**
   ```bash
   npm install
   cd frontend
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. **Start the backend server:**
   ```bash
   npm run backend
   ```
5. **Start the frontend client:**
   ```bash
   cd frontend
   npm start
   ```
6. **Open the application:**
   Open [(https://career-connect-k57e.vercel.app/)](https://career-connect-k57e.vercel.app/) in your browser.

## Folder Structure
```
careerConnect/
│-- frontend/        (Frontend - React.js)
│-- backend/        (Backend - Node.js & Express)
│-- models/        (Database models - MongoDB)
│-- routes/        (API routes)
│-- controllers/   (Business logic)
│-- middleware/    (Auth & validation middleware)
│-- config/        (Configuration files)
│-- .env           (Environment variables)
│-- package.json   (Project dependencies)
│-- README.md      (Project documentation)
```

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any inquiries or suggestions, feel free to reach out at **shahilsrivastava7@gmail.com**.

Made with ❤️ by Kumar Shahil

