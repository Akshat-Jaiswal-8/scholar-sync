import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateGeminiPrompt(userInput: string) {
  return `You are an AI scholarship assistant specializing in finding educational funding opportunities based on caste, religion, and demographic backgrounds. I need you to use your knowledge to provide accurate scholarship information relevant to Indian students.

    When responding to the user query: "${userInput}", please:
    
    1. Analyze the query to identify search criteria (caste, religion, location, education level, etc.)
    2. Search your knowledge base for actual, existing scholarships that match these criteria
    3. Return at least 3-5 scholarships that match ANY of the identified criteria
    4. Include details about government, state, and institutional scholarships
    5. Focus on scholarships specifically targeting caste, religion, and minority status when applicable
    
    JSON RESPONSE FORMAT:
    Return only a clean JSON array with the following structure:
    
    [
      {
        "id": "unique-id",
        "name": "Full scholarship name",
        "description": "Comprehensive description",
        "institution": "Providing organization",
        "level": "Education level",
        "match_score": 85,
        "eligibility": {
          "caste": ["SC", "ST", "OBC", null],
          "religion": ["Hindu", "Muslim", "Christian", null],
          "gender": ["Male", "Female", "Any"],
          "location": ["State names or 'All India'"],
          "income_limit": "Income ceiling if applicable",
          "academic_requirements": "Grade requirements",
          "other": "Additional criteria"
        },
        "amount": "Scholarship amount and benefits",
        "deadline": "YYYY-MM-DD",
        "application_process": "How to apply",
        "required_documents": ["List of required documents"],
        "link": "Official website URL",
        "contact_info": "Official contact information"
      }
    ]
    
    IMPORTANT GUIDELINES:
    - Return ONLY the JSON array with no explanation text or markdown formatting
    - Include AT LEAST 3-5 real scholarships that match the query criteria
    - If no exact matches, include scholarships with partial matches
    - Prioritize scholarships targeting the specific demographics mentioned
    - Include diverse scholarship options (government, state, private institutions)
    - Return actual URLs for official scholarship websites
    - Specify exact eligibility criteria, especially caste and religion requirements
    - If a specific detail is unknown, use null rather than making up information
    
    Remember to return ONLY the JSON array - no other text, explanations, or markdown.`;
}

export function parseGeminiResponse(responseText: string) {
  try {
    let cleanedText = responseText.replace(/```json\n?|\n?```/g, "").trim();

    const possibleJsonArray = cleanedText.match(/\[\s*\{[\s\S]*}\s*]/);
    if (possibleJsonArray) {
      cleanedText = possibleJsonArray[0];
    }

    // Parse the JSON
    const parsedData = JSON.parse(cleanedText);

    // If it's not an array, try to extract an array from an object
    if (!Array.isArray(parsedData)) {
      // If it's an object with results property that's an array
      if (parsedData.results && Array.isArray(parsedData.results)) {
        return parsedData.results;
      }
      // If it's some other object structure, wrap in array
      return [parsedData];
    }

    return parsedData;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    console.log("Raw response:", responseText);
    return [];
  }
}
