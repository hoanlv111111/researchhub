# Social Network for Researchers share publication, research and research ideas

This is a social network application for researchers. It allows researchers to connect, share their work, and collaborate with others in their field.

## Installation

To set up the application, follow these steps:

1. Clone project:
   ```
   git clone git@github.com:hoanlv214/researchhub.git
   ```
2.  Install the server dependencies:
      ```
      npm install
      ```

3. Install the client dependencies:
   ```
   cd client
   npm install
   ```

4. Connect to your MongoDB database and add the necessary information in the `.env` file.

## Usage

You can run both the client and server concurrently, or run them separately as needed.

To run the client and server concurrently, use the following command:
   ```
   npm run dev
   ```
This will start the server and client simultaneously.

To run only the Express server, use the following command:
   ```
   npm run server
   ```
This will start the server on `http://localhost:5000`.

To run only the React client, use the following command:
   ```
   npm run client
   ```
This will start the client on `http://localhost:3000`.

Please make sure to run the server and client in separate terminal windows or tabs.

## Accessing the Application

Once the server and client are running, you can access the application by opening a web browser and navigating to:
- Server: `http://localhost:5000`
- Client: `http://localhost:3000`

## Functionality

The application provides the following functions:

1. User Registration: Allows users to create an account by providing necessary details.
2. User Login: Allows users to log in with their registered credentials.
3. User Logout: Allows users to log out of their account.
4. Create Posts: Users can create and publish posts to share their work or ideas.
5. Like Posts: Users can like posts created by other users.
6. Comment on Posts: Users can leave comments on posts.
7. Follow Users: Users can follow other users to stay updated with their activities.
8. Notifications: Users receive notifications for new followers, likes, and comments.
9. Messaging: Users can engage in private conversations with other users.
10. User Suggestions: Users can receive suggestions of other users based on their institution or skill. This feature helps users connect with researchers who have similar interests or expertise.
Please refer to the application's documentation for more detailed information on each function.
11. Add Publications: Users can add their publications to their profile.
12. Custom posts: Users can create custom posts with custom categories.
13. Search: Users can search for other users, posts, and publications.
15. User Profile: Users can view their own profile to see their posts, publications,...

## Contributing

If you would like to contribute to this project, please follow the standard procedures for code contribution (e.g., fork, branch, commit, pull request). We appreciate your contributions!

## License

This project is licensed under the [MIT License](LICENSE).
