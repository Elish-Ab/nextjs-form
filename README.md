**Updated Version**
=====================

## EVL
A Next.js application featuring a personal information search form. This app allows users to enter their first name, last name, and province, validates the input, and submits the data to a webhook endpoint.

### Key Features
---------------

* **Responsive Form**: Built with React and TypeScript for a seamless user experience
* **Client-Side Validation**: Ensures required fields (first name, last name, and province) are filled before submission
* **Webhook Submission**: Form data is sent to an external webhook endpoint for processing
* **User Feedback**: Immediate feedback is provided on submission success or failure
* **Modern UI**: Styled with Tailwind CSS for a visually appealing interface

### Getting Started
-----------------

#### Clone the Repository
```bash
git clone <repository-url>
cd EVL
```

#### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

#### Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

#### View the App
Open http://localhost:3000 in your browser to view the app.

### Usage
-----

The main page displays a form where users can input their first name, last name, and province. All fields are required. Upon submission, the form data is sent to a webhook URL. Users receive immediate feedback if the submission was successful or if an error occurred.

### Technologies Used
-------------------

* **Next.js**: React framework for server-side rendering and static site generation
* **React**: UI library for building reusable components
* **TypeScript**: Typed JavaScript for improved code quality and maintainability
* **Tailwind CSS**: Utility-first CSS framework for styling and layout

### Deployment
------------

This project can be easily deployed on Vercel, the platform from the creators of Next.js. For more details, see the Next.js deployment documentation.

### License
-------

This project does not currently specify a license.# nextjs-form
