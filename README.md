# AI-Powered Scholarship Search Application *[Live Link 🔗](https://scholar-sync-akshat.vercel.app/)*

This project is a web application that helps students find scholarships based on their background and qualifications. It leverages the power of AI, specifically the Gemini API, to understand free-form user input and match students with relevant scholarships.

## Features

*   **Intelligent Search:** Uses AI to interpret free-form user input, including caste, religion, location, level of study, and other criteria.
*   **Comprehensive Scholarship Data:**  Gets the scholarship data by the use of gemini.
*   **Match Scoring:** Calculates a match score to indicate how well a scholarship aligns with the user's profile.
*   **Filtering and Ranking:** Filters and ranks scholarship results based on the extracted criteria and match score.
*   **User-Friendly Interface:**  A minimal user interface for easy navigation.
*   **Detailed Scholarship Information:** Provides detailed information about each scholarship, including eligibility criteria, benefits, amount, deadline, and application process.

## Technologies Used

*   **Frontend:** Next.js
*   **Backend:** Next.js API Routes
*   **UI Library:** ShadcnUI
*   **Other:** tailwindCSS, Framer motion

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Akshat-Jaiswal-8/scholar-sync
    ```

2.  Navigate to the project directory:

    ```bash
    cd scholar-sync
    ```

3.  Install dependencies:

    ```bash
    pnpm install
    ```

4.  Set up environment variables:

    *   Create a `.env` file in the root directory.
    *   Add your Gemini API key:

    ```
    GEMINI_API_KEY=your_actual_gemini_api_key
    ```

5.  Run the development server:

    ```bash
    pnpm run dev
    ```

## Usage

1.  Open your browser and navigate to `http://localhost:3000` (or the appropriate URL).
2.  Enter your details in the search input.
3.  Click the "Search" button.
4.  Browse the scholarship results.
5.  Click on a scholarship card to view more details.

## API Endpoints

*   `/api/search`: Handles the scholarship search requests.  Accepts a JSON payload with user input (`{ userInputs: string }`) and returns a JSON array of matching scholarships.

## Contact

[Akshat Jaiswal](mailto:akshatjaiswal.official@gmail.com)
