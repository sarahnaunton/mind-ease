# Welcome to MindEase

MindEase is a guide to mental wellness, helping you recognise the signs of burnout early so you can take proactive steps to maintain balance and well-being.

Visit MindEase here: https://mindease-wellbeing.netlify.app/

## Introduction

In today's fast-paced world, burnout has become a prevalent issue affecting individuals across various industries and demographics. The demanding nature of modern work environments, coupled with societal pressures and personal responsibilities, often leads to chronic stress, exhaustion, and ultimately, burnout. However, despite its widespread impact, burnout is often overlooked or misunderstood, resulting in detrimental effects on individuals' mental, emotional, and physical health.

Ultimately, by promoting early intervention and holistic well-being, MindEase plays a crucial role in safeguarding individuals' overall health and quality of life.

## Getting Started

How to download the application: 

1. Clone gitHub repository of client [mind-ease](https://github.com/sarahnaunton/mind-ease) and server [mind-ease-api](https://github.com/sarahnaunton/mind-ease-api) 
2. On both client and server, install NPM packages with npm install
3. Create a database in MySQL, on server run npx knex migrate:latest then npx knex seed:run
4. Create .env file on the client and server side using the .env.example file provided as a guide,
	Client side e.g. **REACT_APP_API_OPEN_AI_KEY** = yourOpenAIKey, 
  Please note when specifying the **REACT_APP_API_BASE_URL**, make sure to include **/api** at the end of the URL e.g. **REACT_APP_API_BASE_URL** = http://localhost:5050/api
	Server side e.g. **PORT** = yourport, **DB_NAME** = nameofdatabse
5. Launch the application with npm start in the client and node index.js in the server

## User Experience

MindEase is also accessible online. Please feel free to explore its functionalities by following this [link](https://mindease-wellbeing.netlify.app/). If you prefer to browse without making an account, you can utilise the guest access with username: `guest@email.com` and password: `Abcdefg1!`

MindEase is fully responsive across mobile, tablet, and desktop platforms, ensuring optimal display and functionality at every screen size. Below, you'll find screenshots showcasing some of the key features using the mobile interface, in both the light and dark theme.

<img src="./src/assets/screenshots/landing-page-mobile.png" alt="screenshot landing" width=300/>
<img src="./src/assets/screenshots/signup-page-mobile.png" alt="screenshot sign up" width=300/>
<img src="./src/assets/screenshots/home-page-mobile.png" alt="screenshot homepage" width=300/>
<img src="./src/assets/screenshots/journal-page-mobile-dark.png" alt="screenshot homepage dark" width=300/>
<img src="./src/assets/screenshots/mood-booster-page-mobile.png" alt="screenshot mood booster" width=300/>
<img src="./src/assets/screenshots/mood-hub-page-mobile-dark.png" alt="screenshot mood hub" width=300/>

## Features

1. Welcome Page

A welcome screen that introduces users to the app and briefly explains MindEase. It provides the option of 'Sign up' or 'Log in'

2. Authentication with Sign up and Log in 

User authentication system ensures secure access to the app. New users can create an account by filling out their first name, last name, email, and password. They can also provide additional information about their occupation if they wish. After creating an account, users are redirected to the login page, where they can sign in using the email and password of their newly created account.

3. Navigation Menu

The navigation menu provides access to the home page, where all key features and functionalities can be found, along with the option of logging out. Additionally, users can select between a light or dark theme, which persists across all pages, enabling them to tailor their visual experience to their preferences. 

4. Home Page

The home page is the central dashboard where users can access key features and functionalities. It also includes a personalised welcome message which changes based on the time of the day.

5. Mood Check in Feature 

Allows the user to perform mood check-ins by competing a questionnaire, helping them reflect on the wellbeing and mental health. 

6. Mood Tracker Page

Allows the user to monitor their wellbeing and mental health by providing a visual demonstration, in the form of a chart, of their questionnaire scores. The line colors indicate the level of risk associated with each score.

7. Mood Journal Page

Users can create journal entries to express their feelings and thoughts, as well as their gratitude. They also have the ability to view, edit, and delete previous entries.

8. Mood Boosters Page

Users can add activities that bring them joy and happiness. They also have the ability to view, edit, and delete previous activities. Additionally, they can generate one activity per day to inspire them. Furthermore, they can utilize the integrated AI feature, which generates personalised recommendations and strategies based on user information, including their occupation and recorded activities.

9. Mood Hub Page

Provides users with information on burnout, including its causes, signs, and coping strategies, as well as offering useful resources for support.
 
10. Not Found Page 

Redirects users back to the homepage when they land on a page that does not exist. 

## Implementation

### Tech Stack 
React.js 
Client Libraries: 
 - react
 - react-router
 - axios
 - sass
 - chart.js
 - react-chartjs-2
 - react-slick
 - markdown-to-jsx

Node.js 
Server Libraries: 
 - express
 - knex
 - dotenv
 - mysql2
 - cors
 - bycrypt
 - jsonwebtoken
 
### 3rd Party API

Integration of AI to provide personalised recommendations and strategies to the user is facilitated through the Open AI API. Access the documentation by clicking [here](https://platform.openai.com/docs/overview).  Please note that a valid API key is required for accessing the API. 

### Custom API

Below are the endpoints for the custom API: 

 1. Users

**POST** `/api/users/register`

*Request Body:* 

    {
    "firstname": "Jon",
    "lastname": "Smith",
    "email": "email@email.com",
    "password": "qwerty123"
    }


*Response:* 201

    {
    "id": 1,
    "first_name": "Jon",
    "last_name": "Smith",
    "email": "email@email.com",
    "password": "$2b$06$Z/Y85Zun7dIqmfqFZttBn.jvlfuMnhmOgGZFxohMxf7tdT9/AXPja",
    "date_of_birth": null,
    "occupation": null,
    "role": null,
    "year_started": null,
    "work_setting": null,
    "week_working_hours": null,
    "created_at": "2024-04-14T16:44:56.000Z",
    "updated_at": "2024-04-14T16:44:56.000Z"
    }

**POST** `/api/users/login`

*Request Body:*

    {
    "email": "email@email.com",
    "password": "qwerty123"
    }


*Response:* 201

      {
     "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSIFRWIiwiZW1haWwiOiJlbWFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4"
        }


Once the user has successfully created an account and logged in, the authentication token will be required for all future API requests within the application. 


**GET** `/api/users`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdiwiZW1haWwiOiJlbWFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4


*Response:* 200 

    {
    "id": 1,
    "first_name": "Jon",
    "last_name": "Smith",
    "email": "email@email.com",
    "date_of_birth": null,
    "occupation": null,
    "role": null,
    "year_started": null,
    "work_setting": null,
    "week_working_hours": null,
    "created_at": "2024-04-14T16:44:56.000Z",
    "updated_at": "2024-04-14T16:44:56.000Z"
    }

2. Journals

**POST** `/api/journals`

*Request Header:*

    Authorization: Bearer eyJhbGcizI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaW5nIFRWIiwiZW1haWwiOiJlbWFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4


*Request Body:*

    {
    "entry": "This is my journal entry",
    "gratitude": "This is my gratitude"
    }


*Response*: 201

    {
    "id": 1,
    "entry": "This is my journal entry",
    "gratitude": "This is my gratitude",
    "created_at": "2024-04-14T17:08:46.000Z",
    "updated_at": "2024-04-14T17:08:46.000Z",
    "users_id": 1
    }


**GET** `/api/journals`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaW1haWwiOiJlbWFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4


*Response:* 200

    [ {
    "id": 1,
    "entry": "This is my journal entry",
    "gratitude": "This is my gratitude",
    "created_at": "2024-04-14T17:08:46.000Z"
    },
    {
    "id": 2,
    "entry": "This is my other journal entry",
    "gratitude": "This is my other gratitude",
    "created_at": "2024-04-14T17:11:36.000Z"
    } ]


**GET** `/api/journals/:id`

  *Request Header:*
    
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaW5nIFRWwiOiJlbWFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4

*Response:* 200 

    {
    "id": 1,
    "entry": "This is my journal entry",
    "gratitude": "This is my gratitude",
    "created_at": "2024-04-14T17:08:46.000Z",
    "updated_at": "2024-04-14T17:08:46.000Z",
    "users_id": 1
    }

**DELETE** `/api/journals/:id`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaW1hbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4


*Response:*  204

**PATCH** `/api/journals/:id`


*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaWwiOiJlbWFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4


*Request Body:*

    {
    "entry": "This is my new journal entry",
    "gratitude": "This is my new gratitude"
    }


*Response:* 200 

    {
    "id": 1,
    "entry": "This is my new journal entry",
    "gratitude": "This is my new gratitude",
    "created_at": "2024-04-14T17:11:36.000Z",
    "updated_at": "2024-04-14T17:18:28.000Z",
    "users_id": 1
    }

3. Scores


**POST** `/api/scores`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaWiOiJlbWFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4


*Request Body:*

    {
    "score": 38,
    "category": "Medium"
    }

*Response*: 201

    {
    "id": 1,
    "score": 38,
    "category": "Medium",
    "created_at": "2024-04-14T17:20:39.000Z",
    "updated_at": "2024-04-14T17:20:39.000Z",
    "users_id": 1
    }

**GET** `/api/scores`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4


*Response:* 200

    [ {
    "id": 1,
    "score": 38,
    "category": "Medium",
    "created_at": "2024-04-14T17:20:39.000Z"
    },
    {
    "id": 2,
    "score": 34,
    "category": "Medium",
    "created_at": "2024-04-14T17:21:27.000Z"
    } ]

4. Activities


**POST** `/api/activities`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaW5nIFRWIiwiZW1haWwiOiJlbYGd41-gfG_Xdo-riVH9We8In9sHkL4

*Request Body:*

    {
    "activity": "Test"
    }


*Response*: 201

    {
    "id": 1,
    "activity": "Test",
    "created_at": "2024-04-14T17:23:52.000Z",
    "updated_at": "2024-04-14T17:23:52.000Z",
    "users_id": 1
    }

**GET** `/api/activities`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaW5nFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4

*Response:* 200

    [ {
    "id": 1,
    "activity": "Test",
    "created_at": "2024-04-14T17:23:52.000Z"
    },
    {
    "id": 2,
    "activity": "Another Test",
    "created_at": "2024-04-14T17:24:28.000Z"
    } ]

**GET** `/api/activities/:id`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI1haWwiOiJlbWFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4

*Response:* 200 

    {
    "id": 1,
    "activity": "Test",
    "created_at": "2024-04-14T17:23:52.000Z",
    "updated_at": "2024-04-14T17:23:52.000Z",
    "users_id": 1
    }

**DELETE** `/api/activities/:id`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaWJlbWFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4

*Response:*  204

**PUT** `/api/activities/:id`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaW5nIFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4

*Request Body:*

    {
    "activity": "A different test"
    }

*Response:* 200 

    {
    "id": 1,
    "activity": "A different test",
    "created_at": "2024-04-14T17:23:52.000Z",
    "updated_at": "2024-04-14T17:26:35.000Z",
    "users_id": 1
    }

5. Recommendations

**POST** `/api/recommendations`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaW5iJlbWFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4

*Request Body:*

    {
    "recommendation": "A test"
    }

*Response*: 201

    {
    "id": 1,
    "recommendation": "A test",
    "created_at": "2024-04-14T17:28:58.000Z",
    "updated_at": "2024-04-14T17:28:58.000Z",
    "users_id": 1
    }


**GET** `/api/recommendations`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaW5nIFRWIiwiZW1haWpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4


*Response:* 200

    [ {
    "id": 1,
    "recommendation": "A test",
    "updated_at": "2024-04-14T17:28:58.000Z"
    } ]


**PUT** `/api/recommendations/:id`

*Request Header:*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImZpcnN0bmFtZSI6IldhdGNoaW5nIFOiJlbWFpbEBlbWFpay5jb20iLCJpYXQiOjE3MTMxMTM0MTAsImV4cCI6MTcxMzE5OTgxMH0.ksUc7tapGmcZgYGd41-gfG_Xdo-riVH9We8In9sHkL4

*Request Body:*

    {
    "recommendation": "A new test"
    }

*Response:* 200 

    {
    "id": 1,
    "recommendation": "A new test",
    "created_at": "2024-04-14T17:30:52.000Z",
    "updated_at": "2024-04-14T17:30:52.000Z",
    "users_id": 1
    }

## Features in Development

 - Mood Help Function: Allow users to easily access immediate crisis support such as their emergency contact, GP, A&E, and their suicide prevention plan to help navigate difficult situations.
 - Profile Section: Allow users to view their information, edit their details and delete their account.
