# Note App Documentation

#Implementation Decisions in Frontend Application:

    React: I chose React as the frontend library for building the Note App due to its popularity, flexibility, and ease of use. React allows us to create reusable components and efficiently manage the application's UI state.

    Material-UI: I used the Material-UI library for styling and designing the user interface of the Note App. Material-UI provides a set of pre-designed components and themes that follow the Material Design guidelines, offering a modern and visually appealing UI.

    React Context API: I implemented the React Context API to manage global states and share data across components without the need for prop drilling. This allowed us to maintain user-related data (such as authentication status, user details, and notes) throughout the app.

    React Router: I used React Router to handle client-side routing within the Note App. React Router enables us to switch between different views and pages of the application without refreshing the page, providing a smoother user experience.

    Fetch API: For handling HTTP requests to the backend API, I utilized the Fetch API. Fetch provides a simple and modern way to make asynchronous requests and handle responses from the server.

    Date-FNS: To manage and format dates in the application, I integrated the Date-FNS library. Date-FNS offers a collection of utilities for manipulating, formatting, and displaying dates, making it easier to handle timestamps efficiently.

    Responsive Design: I adopted a responsive design approach to ensure that the Note App works smoothly on various devices, including desktops, tablets, and smartphones. This provides a seamless experience for users across different screen sizes.

    Error Handling: To enhance the user experience, I implemented error handling mechanisms for handling failed API requests, validation errors, and unexpected issues. Proper error messages are displayed to users to guide them in troubleshooting.

    Authentication and Authorization: I used JSON Web Tokens (JWT) for user authentication and authorization. When users log in, they receive a JWT that is stored securely in local storage. The JWT is then included in the headers of subsequent requests for authorization.

    Form Validation: For data input forms, I implemented client-side form validation to ensure that users provide valid and complete information. This helps to prevent errors during form submission and improves the overall usability of the app.

    Deployment: The frontend application was deployed on a web server to make it accessible to users via a web browser. The server ensures that the app is served securely over HTTPS and is readily available for users to access and interact with.

#User Guide

Welcome to the Note App! This user guide will help you navigate through the app and make the most of its features. The Note App allows you to create, edit, delete, and view your notes in an organized and efficient way.
Table of Contents

    Getting Started
        Creating an Account
        Logging In

    Dashboard
        View Notes
        Create New Note
        Edit Note
        Delete Note
        Log Out

    Categories
        Categorize Your Notes

1. Getting Started
Creating an Account

To use the Note App, you need to create an account:

    Go to the Sign-Up page.
    Fill in your name, email, and password.
    Click the "Sign Up" button to create your account.

Logging In

If you already have an account, you can log in:

    Go to the Login page.
    Enter your email and password.
    Click the "Log In" button to access your account.

2. Dashboard

The Dashboard is the main screen of the Note App, where you can manage your notes.
View Notes

On the Dashboard, you will see a list of your notes. Each note displays its title, content, category, and creation date.
Create New Note

To create a new note:

    Click the "Create New Note" button.
    Enter the title and content for your note.
    Select a category for your note.
    Click the "Save" button to create the note.

Edit Note

To edit an existing note:

    Click the "Edit" icon (pencil) next to the note you want to edit.
    Make the desired changes to the title, content, or category.
    Click the "Save" button to update the note.

Delete Note

To delete a note:

    Click the "Delete" icon (trash bin) next to the note you want to delete.
    Confirm the action in the pop-up dialog.

Log Out

To log out of your account:

    Click on your profile picture or name in the top-right corner.
    Select "Log Out" from the drop-down menu.

3. Categories

The Categories feature allows you to organize your notes by categories such as "Work," "Home," "Personal," etc.
Categorize Your Notes

To assign a category to a note:

    When creating or editing a note, select the desired category from the drop-down menu.
