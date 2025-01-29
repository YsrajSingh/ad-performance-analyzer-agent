const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('@langchain/core/prompts');
const { StringOutputParser } = require('@langchain/core/output_parsers');

// Initialize with latest GPT-4 Turbo model
const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4-turbo", // Latest model as of July 2024
    temperature: 0.1, // Lower for more factual responses
    maxTokens: 1200,
    timeout: 30000, // 30s timeout
});

// Enhanced prompt with structured output guidance
const analyzePrompt = PromptTemplate.fromTemplate(
    `## Ad Performance Analysis (Structured Analysis)

**Objective:** Analyze {data} and provide:
1. **Performance Summary (5-7 sentences):** 
    - Summarize the ad's performance considering key metrics like ROAS, ACOS, CTR, and conversion rates.
    - Include specific analysis of **keywords** that performed well (high ROAS, low ACOS, high CTR) and keywords that need optimization.
2. **Top 3 Performers:**
    - Identify the top 3 ads based on their overall performance, including key metrics such as **ROAS**, **ACOS**, and **CTR**. Rank them according to which are performing the best.
3. **Bottom 3 Performers:**
    - Identify the bottom 3 ads based on their overall performance, including key metrics such as **ROAS**, **ACOS**, and **CTR**. Rank them according to which are performing the worst.
4. **Budget Reallocation Plan:**
    - Suggest how to reallocate the budget towards high-performing ads.
5. **Immediate Optimization Actions:**
    - Recommend immediate steps to optimize the ad's performance, such as adjusting bids or targeting.

**Format Requirements:**
- Strict Markdown with ### headings
- 5-7 bullet points per section
- Metrics must be **bolded**
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
