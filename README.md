# Voluntify

**Voluntify** is a web platform that helps teens easily discover volunteer opportunities and document their service hours — all in one place.

## Why We Built This

Teens often struggle to find volunteering events and track their hours for school, clubs, or college applications. **Voluntify** solves both problems by streamlining the entire process on one simple platform.

## Features

- **Discover Opportunities Nearby**  
  Find real-time volunteer events tailored for teens.

- **Clean Event Listings**  
  View dates, times, locations, and participant limits at a glance.

- **Easy Sign-Ups**  
  Log in and register for events with a single click.

- **Automatic Hour Tracking**  
  Volunteering hours are logged and displayed on the user dashboard.

## How It Works

1. User signs in via Firebase Auth  
3. Teens browse and register for events  
4. Event attendance logs hours in Firestore  
5. Hours are displayed in a personal dashboard  

# Installation

Follow these steps to run Voluntify locally on your machine:

1. **Clone the repository**  
```bash
git clone https://github.com/your-username/voluntify.git
cd voluntify
```
2. Install dependencies
```bash
npm install
```
3. Set up Firebase
 - Go to the Firebase Console and create a new project.
- Enable Authentication (Email/Password sign-in) and Firestore Database.
- Copy your Firebase project configuration (API keys and settings).
  
4. Add Firebase config
Create a .env.local file in the project root.

Add your Firebase config variables like this (example):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```
5. Start the development server

```bash
npm run dev
```
6. Open the app
Open your browser and go to http://localhost:3000 to see Voluntify running locally.

## Contributing

Pull requests are welcome! For large changes, open an issue first to discuss your idea.

## License

- [MIT License](https://github.com/rycatt/voluntify/blob/main/LICENSE)
- Copyright © 2025 - **[@rycatt](https://github.com/rycatt)**

---

> Created for Launch Hacks IV.
