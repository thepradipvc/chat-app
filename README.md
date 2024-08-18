
# Chat App

This website let's you chat with any other user of this website with an awesome UI.

## Table of contents

- [Chat App](#chat-app)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Links](#links)
  - [Develop Locally](#develop-locally)
  - [Acknowledgements](#acknowledgements)
  - [Author](#author)

## Overview

![alt text](/screenshots/homepage.png)

### Links

- Solution URL: [GitHub](https://github.com/thepradipvc/chat-app)

## Develop Locally

Clone the project

```bash
  git clone https://github.com/thepradip/chat-app
```

Go to the project directory

```bash
  cd chat-app
```

Install dependencies

```bash
  yarn install
```

Optionally run `docker-compose up -d` to start the database. The database URL when running through docker will be `postgresql://chatapp:chatapp@localhost:5432/chatapp`

Copy env.example as .env and fill in the required Environment variables

```bash
  cp .env.example .env
```

Migrate database
```bash
  yarn workspace backend db:migrate
```

Start the server

```bash
  yarn dev
```

## Acknowledgements

- [Chat GPT](https://chat.openai.com/) - My developer buddy who helped me brainstorm various approaches to tackle my issues and gave solutions. (Though it frustrates sometimes when it doesn't have answer and keeps on giving same invaluable output, it was a good help overall)

## Author

- Frontend Mentor - [@ChaudharyPradip](https://www.frontendmentor.io/profile/ChaudharyPradip)
- Twitter - [@thePradiptalks](https://www.twitter.com/thePradiptalks)