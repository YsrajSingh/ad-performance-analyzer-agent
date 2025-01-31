const { RunnableSequence } = require('@langchain/core/runnables');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const { ChatOpenAI } = require('@langchain/openai'); // Ensure this package is installed

// Define or import analyzePrompt
const analyzePrompt = (data) => `Analyze the following ad performance data: ${data}`;

// Initialize OpenAI model
const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-4', // Ensure GPT-4 access or use 'gpt-3.5-turbo'
    temperature: 0.7,
});

const adAnalysisAgent = async (adData, onDataChunk) => {
    if (!process.env.OPENAI_API_KEY) throw new Error('API key missing');

    const filteredData = adData
        .filter(item => item.impressions > 100) // Remove low-signal data
        .slice(0, 15); // Keep top 15 meaningful entries

    const formattedData = JSON.stringify(filteredData, null, 2); // Pretty-print JSON for better clarity

    const chain = RunnableSequence.from([
        (input) => `Analyze the following ad performance data:\n${input.data}`, // Use input.data
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