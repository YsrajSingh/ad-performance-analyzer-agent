const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('@langchain/core/prompts');
const { StringOutputParser } = require('@langchain/core/output_parsers');

// Initialize with latest GPT-4 Turbo model
const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4-turbo-preview", // Latest model as of July 2024
    temperature: 0.1, // Lower for more factual responses
    maxTokens: 1200,
    timeout: 30000, // 30s timeout
});

// Enhanced prompt with structured output guidance
const analyzePrompt = PromptTemplate.fromTemplate(
    `## Ad Performance Analysis (Structured Analysis)

**Objective:** Analyze {data} and provide:
1. Top 3 performers (ROAS > 300%, ACOS < 15%, CTR > 0.5%)
2. Bottom 3 performers (ROAS < 100%, ACOS > 30%)
3. Budget reallocation plan
4. Immediate optimization actions

**Format Requirements:**
- Strict Markdown with ### headings
- 5-7 bullet points per section
- Metrics must be bolded
- Response time < 45 seconds

**Data Sample:**
{data}

**Response:**
`
);

const adAnalysisAgent = async (adData) => {
    if (!process.env.OPENAI_API_KEY) throw new Error('API key missing');

    // Data optimization
    const filteredData = adData
        .filter(item => item.impressions > 100) // Remove low-signal data
        .slice(0, 15); // Keep top 15 meaningful entries

    const chain = analyzePrompt
        .pipe(model)
        .pipe(new StringOutputParser());

    try {
        return await chain.invoke({
            data: JSON.stringify(filteredData),
        });
    } catch (error) {
        console.error('Model Error:', error);
        throw new Error('Analysis failed - please try again');
    }
};

module.exports = { adAnalysisAgent };