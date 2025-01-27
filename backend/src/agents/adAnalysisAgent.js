const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('@langchain/core/prompts');
const { StringOutputParser } = require('@langchain/core/output_parsers');

// Initialize model once
const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    temperature: 0.2,
});


const analyzePrompt = PromptTemplate.fromTemplate(
    `You are a digital advertising expert analyzing campaign performance. Analyze this CSV data:
    {data}
    
    Provide concise, actionable insights including:
    - Top 3 performing keywords
    - Underperforming keywords to reconsider
    - CTR analysis
    - Budget recommendations
    - Specific improvement suggestions
    
    Format response in Markdown with clear sections.`
);

const adAnalysisAgent = async (adData) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY not configured');
    }

    const chain = analyzePrompt
        .pipe(model)
        .pipe(new StringOutputParser());

    const answer = await chain.invoke({
        data: JSON.stringify(adData, null, 2) 
    });

  console.log(answer)

    return answer;
};

module.exports = { adAnalysisAgent };
