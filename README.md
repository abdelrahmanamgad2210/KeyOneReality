CRM System


## Overview


The CRM System is a web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) that allows managing user data. Users can perform **CRUD operations** (Create, Read, Update, Delete) with a visually appealing interface.

The app includes features such as filtering users by division, uploading profile pictures, and responsive design for seamless usage across devices.

---
## Demo
[Watch the demo video](https://github.com/abdelrahmanamgad2210/KeyOneReality/raw/main/demo.mp4)

## Features
User Management:
- **Add Users**: Create a new user with details such as name, email, phone number, department, division, and profile picture.
- **View Users**: Display users in a grid layout with their details, including department and division.
- **Update Users**: Edit existing user details with an intuitive form.
- **Delete Users**: Remove users with a confirmation prompt.

### Filtering
- Filter users by division using a dropdown.

### Responsive Design
- Mobile-friendly UI with optimized layouts for various screen sizes.

---

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Uploads**: Multer (for profile picture uploads)
- **API Requests**: Axios

---

## Installation

### Prerequisites
- **Node.js** installed on your system.
- MongoDB server running locally or a cloud MongoDB Atlas account.

### Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd CRM-System
   ```

2. **Backend Setup**:
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add the following variables:
     ```
     MONGO_URI=your-mongodb-uri
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

4. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

---

## Folder Structure
```
CRM-System/
├── backend/
│   ├── controllers/         # Contains API logic for users
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express.js routes
│   ├── uploads/             # Directory for uploaded profile pictures
│   ├── index.js             # Entry point for backend server
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components (UserCard, Navbar, etc.)
│   │   ├── pages/           # Pages for different routes (UserListPage, AddEditUser)
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # Entry point for React
```

---

## API Endpoints

### Users API
| Endpoint              | Method | Description                     |
|-----------------------|--------|---------------------------------|
| `/api/users`          | GET    | Get all users                  |
| `/api/users/:id`      | GET    | Get a user by ID               |
| `/api/users/create`   | POST   | Create a new user              |
| `/api/users/:id`      | PUT    | Update an existing user by ID  |
| `/api/users/:id`      | DELETE | Delete a user by ID            |

---

## Usage
1. **Add User**:
   - Navigate to the "Add User" page and fill out the form.
   - Submit to add the user to the database.

2. **Edit User**:
   - Click the "Edit" button on a user card to open the edit form.
   - Update details and submit to save changes.

3. **Filter Users**:
   - Use the dropdown to filter users by their division.

4. **Delete User**:
   - Click the "Delete" button on a user card and confirm to remove the user.

---

## Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Screenshot+Placeholder)

### Add/Edit User Page
![Add/Edit User Page](https://via.placeholder.com/800x400?text=Screenshot+Placeholder)

---

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch-name
   ```
5. Create a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
