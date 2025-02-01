# Ad Performance Analyzer Agent

## Overview

This project is a web application that allows users to upload ad performance data in CSV format. The system analyzes the data and generates a summary of the ad's performance. Based on the analysis, an agent creates tasks such as updating keywords to improve future ad performance.

## Features

### Backend

- **Upload Endpoint (/upload)**: Allows users to upload a CSV file containing ad data.

- **Analyze Endpoint (/analyze)**: Processes the uploaded CSV file to determine high- and low-performing keywords.

### Frontend

- **Dashboard Landing Page**: A creative dashboard with a company description.

- **Upload Screen**: Allows users to upload a CSV file and transition to analysis.

- **Analyze Screen**: Displays analysis results using LLM capabilities.

### LLM Capabilities

- **Ad Analysis Agent**: Uses LangChain to analyze ad performance.

- **Performance Summary**: Generates a concise report on keyword performance, ROAS, ACOS, and recommendations.

- **Keyword Optimization**: Identifies and updates underperforming keywords.

## Tech Stack

* **Backend**: Node.js
* **LLM Framework**: LangChain
* **LLM API**: Anthropic Claude or OpenAI
* **Frontend**: React
* **Hosting**: Heroku, Render, Vercel, or Netlify
* **Containerization (Optional)**: Docker

## Setup Instructions

1. Clone the repository:
    ```
    git clone https://github.com/YsrajSingh/ad-performance-analyzer-agent
    cd ad-performance-analyzer-agent
    ```
1. Start Project:
    ```docker compose up -d```

## API Documentation

### Upload Endpoint (`/upload`)

* **Method**: POST
* **Request**: Multipart form data (CSV file)
* **Response**:
    ```
    {
        "message": "File uploaded successfully",
        "file_id": "12345"
    }
    ```

### Analyze Endpoint (`/analyze`)

* **Method**: POST
* **Request**: JSON with file_id
* **Response**:
    ```
    {
        "summary": "Ad campaign performed well with high ROAS and strong conversion rates.",
        "suggestions": ["Remove low-performing keywords" "Increase budget for high-CTR keywords"]
    }
    ```

## Assumptions
* The CSV file format is standardized.
* Analysis is based on predefined keyword performance metrics.

## Future Improvements

* Add authentication and user roles.
* Improve visualization of ad performance data.
* Support for multiple file formats.
* Real-time data streaming and updates.
* AI-driven automated keyword optimization.
