# News Portal Website

## Project Overview
The **News Portal Website** is a dynamic web platform designed to deliver the latest news and articles across various categories. This project is built using a robust combination of **HTML**, **CSS**, **JavaScript**, **PHP**, and a **MySQL database** to provide an interactive and user-friendly experience for both visitors and administrators.

## Key Features
- **Responsive Web Design**: Ensures that the portal looks and functions well on all devices (desktop, tablet, mobile).
- **Article Management**: Articles are dynamically fetched from the database and displayed with pagination.
- **User Authentication System**:
  - **Registration and Login**: Users can create accounts and log in to interact with the portal.
  - **Session Management**: User sessions are managed securely using PHP.
- **Search and Filtering**:
  - **Keyword Search**: Users can search articles by keywords.
  - **Category-Based Filtering**: Articles can be filtered by categories such as Technology, Sports, Politics, etc.
- **Interactive Features**:
  - **Commenting System**: Registered users can post comments on articles.
  - **Likes and Sharing**: Integrate social media sharing options to boost engagement.
- **Admin Panel**:
  - **Dashboard**: Admins have a private dashboard to manage content.
  - **CRUD Operations**: Full control over creating, updating, and deleting articles and user comments.
  - **User Management**: Admins can view and manage registered users.
- **SEO-Friendly URLs**: Clean and descriptive URLs for better search engine visibility.

## Project Architecture
### Frontend
- **HTML5**: Structure of web pages.
- **CSS3**: Styling and layout, including animations and responsive design.
- **JavaScript**: Client-side scripting for interactive elements such as search functionality and form validation.

### Backend
- **PHP**: Server-side logic for handling requests, managing sessions, and processing data.
- **Database (MySQL)**: Stores user data, articles, comments, and related metadata.

### Folder Structure
news-portal/ │ ├── assets/ # Static files like images, stylesheets, and scripts ├── includes/ 
**Reusable PHP components (header, footer, database connection) ├── admin/ 
**Admin panel files for managing content ├── config.php 
**Database configuration ├── index.php 
**Home page with dynamic news display ├── login.php 
**User login page ├── register.php 
**User registration page ├── article.php 
**Single article view page ├── comment-handler.php 
**Handles user comments └── ... # Other supporting files 

## Installation and Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vijaysingdobhal/news-portal.git
   cd news-portal
   
