# Staticgram - Social Media App

Welcome to **Staticgram**, a full-stack social media web application built with React, Express, and MongoDB. This project provides a fully functional social platform where users can register, create posts with images and descriptions, interact with others through likes, comments, and follow features, and search for users — all with a modern, responsive UI.

**Live Demo:** [https://staticgram.vercel.app](https://staticgram.vercel.app)  
**Project Repo:** [Lokesh-Dhariyal/SocialMedia](https://github.com/Lokesh-Dhariyal/SocialMedia)  
**Detailed Notes:** [Project Notion Page](https://www.notion.so/Socail-Media-App-20375b4b9722809eac55d7c341ec5d4c?source=copy_link)
**Portfolio:** [LokeshDhariyal](lokeshdhariyal.me)
---

## Features

- **User Authentication**
  - Secure registration and login (with password hiding).
  - Persistent login using cookies.

- **Profile Management**
  - Update profile details and profile photos.
  - Follow/unfollow other users.

- **Posts**
  - Create posts with images and descriptions.
  - Like and comment on posts.
  - Delete posts or comments (own posts/comments only).

- **Feed**
  - Home page shows posts from followed users.
  - View all comments and likes on a post.

- **User Search**
  - Search for users by name or email.

- **Responsive UI**
  - Clean, modern design built with React and Tailwind CSS.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB
- **API:** RESTful, Axios for HTTP requests
- **Hosting:** Vercel (frontend), Render (backend)

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB instance (local or cloud)

### Clone the Repository

```bash
git clone https://github.com/Lokesh-Dhariyal/SocialMedia.git
cd SocialMedia
```

### Backend Setup

1. Go to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up your `.env` file. example
MongoDB_URL = mongodb+srv:---xyz---.mongodb.net
PORT = 6900
ORIGIN = *
CLOUDINARY_CLOUD_NAME = xyz
CLOUDINARY_API_KEY = xyz
CLOUDINARY_API_SECRET = xyz
ACCESS_TOKEN_SECRET = xyz
ACCESS_TOKEN_EXPIRE = xyzd
REFRESH_TOKEN_SECRET = xyz
REFRESH_TOKEN_EXPIRE = xyzd
NODE_ENV=development.

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Go to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend dev server:
    ```bash
    npm run dev
    ```

4. Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
SocialMedia/
├── backend/         # Express.js API server
├── frontend/        # React client (main app)
└── NOTES branch     # Additional notes and explanations
```

## Notable Files

- `frontend/src/features/auth/authContext.jsx` - Handles authentication and user context.
- `frontend/src/features/user/addPost.jsx` - Logic and UI for creating new posts.
- `frontend/src/features/user/searchUser.jsx` - User search functionality.
- `frontend/src/features/auth/postContext.jsx` - Context for handling post actions (like, comment, delete).
- `frontend/src/components/post/PostLayout.jsx` - UI for displaying posts and comments.

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is currently unlicensed. For questions, contact [Lokesh-Dhariyal](https://github.com/Lokesh-Dhariyal).

---

**Happy Socializing!**