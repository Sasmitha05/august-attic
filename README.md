# august-attic

🎧 August Attic
August Attic is a full-stack web application that blends merchandise shopping with live Spotify music streaming. It offers users an immersive experience where they can browse exclusive merch, preview music, and manage a shopping cart, all in one sleek platform.

🌟 Features
🔐 Authentication

User Sign Up and Login pages

Credentials securely stored in MongoDB

🏠 Home Page

Engaging image carousel

Previews of songs and featured merch

👕 Merch Page

Displays product catalog with images

Images hosted on Cloudinary; image URLs stored in MongoDB

🎵 Music Page

Embedded Spotify player for live song previews

🛒 Cart Functionality

Add/remove merch items from the cart

Persistent state management across the app

🛠 Tech Stack
💻 Frontend
React.js (with functional components/hooks)

React Router (for page navigation)

Axios (for API requests)

CSS / Styled Components / TailwindCSS (if applicable)

🖥 Backend
Node.js with Express.js

MongoDB with Mongoose for data modeling

Cloudinary for merch image storage

Spotify Embed for live streaming

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/Sasmitha05/august-attic.git
cd august-attic

2. Set Up Environment Variables
Create a .env file in the server/ folder with the following:
MONGODB_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

3. Install Dependencies
Backend
cd server
npm install

Frontend
cd ../client
npm install

4. Run the App
In separate terminals:
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm start

📸 Screenshots

https://github.com/user-attachments/assets/78127d3a-6239-4fee-a51f-2d7f5a6b4887


🔮 Future Enhancements
Integrated payment gateway (Razorpay / Stripe)

User profile with order history

Spotify playlist integration

Search and filter functionality for merch

