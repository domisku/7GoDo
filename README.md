# 7GoDo (todo app website)

7GoDo is a website where users can create, edit, delete tasks to help them organize their lives.  
Website uses two authentication methods: passwordless login and login with github.  
Authentication is handled by next-auth.  

The project was created using Next.js, styled with Tailwind.css, transitions made with Headless UI, CRUD operations are handled with MongoDB.

## Features  

- Create, rename, delete tasks
- Create, delete user defined lists
- Edit tasks: add notes to a task, change task name, mark task as important
- Search bar for finding tasks
- Calendar section to add tasks at any date
- Works on mobile devices and desktop
- Passwordless login and login with github

## Preview

Preview deployed project on [Vercel](https://7godo.vercel.app/)

## How to use

Follow these steps to run this project locally:  

1. Clone the repository
2. Run "npm install" command in your terminal to install the required modules
3. Set up the following environmental variables:  
```
NEXTAUTH_URL=<This is your local machine server URL, usually "http://localhost:3000/">
MONGODB_URI=<Your mongoDB uri with your credentials>
GITUB_ID=<Needed to login with github. Go to developer settings on your github account and set up an OAuth app>
GITHUB_SECRET=<Also found on developer settings>
EMAIL_SERVER=<Lookup next-auth documentation for email provider>
EMAIL_FROM=<Lookup next-auth documentation for email provider>
NODE_ENV=<Set either as "development" or "production">
```
4. Run "npm start dev" command from the terminal
