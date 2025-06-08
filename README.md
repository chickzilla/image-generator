## Getting Started

This is a project for a **text-to-image generator** application, containing both frontend and backend services.

## Design

The [Figma](https://www.figma.com/design/Jhsx2VUe74r5coSyrgr7gL/Spacely-AI?node-id=0-1&t=TKgdQz9ETG0tTEEV-1) design showcases the user interface for the image generation.

## Database

The application uses a PostgreSQL database with a core table called `prompt_history`, which stores prompts, results, and related metadata.
![database](image.png)

## Set up

Follow the setup instructions below to get the application running locally.

1. Clone the repo

```bash
git clone https://github.com/chickzilla/image-generator.git
cd image-generator
```

2. For both the **/frontend** and **/backend**, copy .env.example to .env:

```bash
cp ./frontend/.env.example ./frontend/.env
cp ./backend/.env.example ./backend/.env
```

After copying the .env files, don’t forget to manually add **AI_API_KEY** to **./backend/.env.**
This key is required to communicate with the AI image generation service and is **not included in .env.example**

## Run locally with Docker

From the project root directory, run:

```bash
docker-compose up -d
```

This will start both the frontend and backend services along with the PostgreSQL database.

Once running:

Access the frontend app at http://localhost:3000

## Test Endpoint

#### Swagger UI

Once the backend is running, access Swagger UI at:

http://localhost:8080/api

This interface lets you test endpoints directly from your browser with example input and output.
