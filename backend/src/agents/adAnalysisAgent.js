const { RunnableSequence } = require('@langchain/core/runnables');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const { ChatOpenAI } = require('@langchain/openai'); // Ensure this package is installed

// Initialize OpenAI model
const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-4', // Ensure GPT-4 access or use 'gpt-3.5-turbo'
    temperature: 0.2,
});

const adAnalysisAgent = async (adData, onDataChunk) => {
    if (!process.env.OPENAI_API_KEY) throw new Error('API key missing');

    const filteredData = adData
        .filter(item => item.impressions > 100) // Remove low-signal data
        .slice(0, 15); // Keep top 15 meaningful entries

    console.log(filteredData)
    const formattedData = JSON.stringify(filteredData, null, 2); // Pretty-print JSON for better clarity

    const chain = RunnableSequence.from([
        (input) => `## Ad Performance Analysis (Structured Analysis)
    Analyze the provided ad performance data and generate a **5-7 sentence summary**.  
    Identify **top-performing keywords** (ROAS > 300%, ACOS < 15%, CTR > 0.5%) and **underperforming keywords** (ROAS < 100%, ACOS > 30%).  
    Provide a **general performance summary** and **suggest improvements**.  
    
    For **keyword optimization**:  
    - Remove keywords with **high clicks but very high ACOS**.  
    - Retain or increase bids for keywords with **high ROAS and strong conversions**.  
    - Offer actionable insights to enhance ad performance.  
    
    **Data Sample:**  
    ${input.data}  
    
    **Response:**`,
        model,
        new StringOutputParser(),
    ]);
    try {
        const stream = await chain.stream({ data: formattedData });
        for await (const chunk of stream) {
            if (chunk.trim()) {
                await onDataChunk(chunk); // Ensure proper async handling
            }
        }
    } catch (error) {
        console.error('Model Error:', error);
        throw new Error('Analysis failed - please try again');
    }
};

module.exports = { adAnalysisAgent };