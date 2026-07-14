# all-mcq

This repository contains a responsive, static web application for practicing multiple-choice questions (MCQs) and tracking progress.

## System Architecture

```mermaid
graph TD
    Client[Web Browser] --> |HTTP GET /| Server[Nginx Web Server]
    
    subgraph Container
        Server --> |Serves| HTML[index.html]
        Server --> |Serves| Data[all_questions.json]
    end
    
    HTML --> |Fetches data| Data
    HTML --> |Loads scripts/styles| KaTeX[KaTeX CDN for Math Rendering]
    HTML --> |Loads typography| Fonts[Google Fonts CDN]
    
    subgraph Client-Side Execution
        State[Quiz State & Progress Tracking]
        Render[UI Rendering & Question Shuffling]
        Render --> State
    end
    
    HTML --> Render
```

## Setup Instructions

Run using Docker Compose for local deployment:

```bash
docker-compose up --build -d
```

## Structure

- `index.html`: The main single-page application and UI logic.
- `all_questions.json`: The static data source containing categorized questions, options, and answers.
- `Dockerfile`: Production-ready, non-root Nginx container configuration.
- `docker-compose.yml`: Orchestration file for local development and deployment.
