# Assignment: Ad Performance Analyzer Agent

**Aim:** Build a web application that allows a user to upload an ad data. The application will then analyze the ad data and provide a summary of the ad's performance based on the analysis and agent will create one or more tasks based on the outcome (e.g. update keywords).

This task has three components we want to test:

1. Backend
    1. Create two endpoints
        1. `/upload`
            1. To Upload CSV File that contains ads data.
        2. `/analyze`
            1. To analyze the CSV File that contains ads data.
                1. Analyze means that we want to check which keywords are high performing and which keywords are low performing. See below details. 
2. Frontend
    1. Create three screens in total.
        1. Landing Page for Dashboard
            1. You are tasked to create a landing page for the dashboard, this is open ended and to test your creative aspect.
            2. Insert Company Description here.
        2. `Complementary Screen to /upload` 
            1. This screen will be utilizing the `/upload` endpoint. You need to have following functionalities on the screen(though you can add more as you see fit)
                1. This screen will have utility to upload a file and a upload button.
                2. User can select a file from their system by clicking “Upload” button.
                3. As soon as file is uploaded “Upload” button Changes to “Analyze”
                4. User clicks “Analyze” and the next screen transition takes place
        3. `Complementary Screen to /analyze`
            1. You are expected to leverage react’s stateful widgets capabilities for transition from uploading a file to analyzing.
            2. Analyzing a file involves using LLM Capabilities.

3. LLM Capabilities
    1. **Agent 1: Ad Analysis Agent**
        - Utilize LangChain to build a statefull agent that orchestrates the ad analysis.
        - The agent should use either use `Anthropic Claude API` or `OpenAI API` to perform the following:
            - Learning (optional): You can watch this 10 min video to learn more. https: //www.youtube.com/watch?v=SKWsJiYkb_k&t=5s
            - **Performance Summary:** Write your own prompt to Claude or Open AI to generate a concise summary (approximately 5-7 sentences) of ad's performance. The summary should consider factors like:
                - Keyword performance :Keywords exhibiting a high ROAS, low ACOS, high CTR, and a strong click-to-purchase conversion rate are indicative of high performance. These keywords effectively drive sales while minimizing advertising costs.
                - General summary on how that ad performed and suggestion to improve (prompt should handle this)
    - Agent-Tool Chain
        - Based on the above decision, trigger tools or functions to update the keywords. For example, keyword A which has good clicks and very high ACOS, will be removed from the dataset.

**Tech Stack Details:**

- **Backend:** `Node.js`
- **LLM Framework** : `LangChain`
- **LLM API:** `Anthropic Claude` or `OpenAI` (candidate's choice)
- **Frontend:** `React`
- **Hosting:** Any free platform (e.g., `Heroku`, `Render`, `Vercel`, `Netlify`)
- **Containerization:** `Docker` (optional, but a plus)

How to Submit?

1. **Code Repository:**
    - Create a `GitHub` repository for the project.
    - Use clear and informative commit messages.
    - Make the project repository private and add the username `plusminuschirag` as a collaborator.

2. **README.md:**
    - Provide a comprehensive `README.md` file that includes:
        - **Project Overview:** A brief description of the project and its functionality (around 150 words).
        - **Architecture Diagram:** A simple diagram illustrating the system's architecture (interaction between frontend, backend, LangGraph agent, and LLM API).
        - **Setup Instructions:** Detailed instructions on how to set up and run the project locally, including installing dependencies.
        - **API Documentation:** Describe the `/upload` and `/analyze` endpoints, including request/response formats and examples (can use `Postman` to generate this).
        - **Assumptions:** Clearly state any assumptions made during development (e.g., target audience for the ad analysis).
        - **Future Improvements:** List at least 5 potential future improvements or features that could be added to the project.

3. **Dockerization (Optional):**
    - Include instructions on how to build and run the application using `Docker`.
