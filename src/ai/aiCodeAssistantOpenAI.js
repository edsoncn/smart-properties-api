
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { loadQAStuffChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from "fs";

const SPEC_FILE = "src/ai/specs/smart-properties-code_spec.txt"
const VECTOR_DIR = "src/ai/vectors/smart-properties-code_vectorstore";

const PROMPT = (userQuestion) => `
You are a Smart Properties Code Language expert and the user will ask you questions about: generate code, describe a code, fix a code, explain an error or generate the test cases JSON Array.
If test cases generation is requested by the user, generate it to test all the code (100% coverage) and the expected value

Question:
${userQuestion}

Please respond with a JSON object like this:
    {
    "code": "...", // The code generated, populate when is required
    "testCases": [{ "name": "...", "variables": [{"name": "...", "type": "...", "value": "..."}], "expected": {"type": "...", "value": "..."} }] // Test cases. JSON Array, populate when is required
    "description": "..." // The short description of the code, populate when is required
    "fullDescription": "..." // The full description of the code or the explain of the code or the explain of an error code, populate when is required
    "generateCodeFlag": true or false // It's true only if the user requested for a code generation, otherwise set it to false, populate when is required
    }
Only output the JSON. No extra text and only the required attributes.
`;

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY
});

const embeddings = new OpenAIEmbeddings();

const SMART_PROP_SPEC_KEY = "smartPropSpec";
let memoryStore = new Map();

const createOrLoadVectorStore = async () => {

    if (fs.existsSync(VECTOR_DIR)) {
        console.log("Loading existing vector store...");
        return await HNSWLib.load(VECTOR_DIR, embeddings);
    }
    
    console.log("Creating new vector store...");

    const rawText = fs.readFileSync(SPEC_FILE, "utf8");

    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 300, chunkOverlap: 20 });
    const docs = await splitter.createDocuments([rawText]);
  
    const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);
    await vectorStore.save(VECTOR_DIR);
  
    return vectorStore;
}

const generateResponse = async (userQuestion) => {
    let vectorStore;
    
    if (memoryStore.has(SMART_PROP_SPEC_KEY)) {
        console.log('Loading vector store from memory')
        vectorStore = memoryStore.get(SMART_PROP_SPEC_KEY)
    } else {
        vectorStore = await createOrLoadVectorStore()
        memoryStore.set(SMART_PROP_SPEC_KEY, vectorStore)
    }

    const relevantDocs = await vectorStore.similaritySearch(userQuestion, 4); // default is 4

    const chain = loadQAStuffChain(model);
    const result = await chain.invoke({
        input_documents: relevantDocs,
        question: PROMPT(userQuestion),
    });

    console.log("\nAI response:\n");
    console.log(result);
    console.log("\n");

    return JSON.parse(result.text);
}

export {
    generateResponse
}