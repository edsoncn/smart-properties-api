import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";


const project = new AIProjectClient(
  "https://smart-properties-ai-resource.services.ai.azure.com/api/projects/smart-properties-ai",
  new DefaultAzureCredential());

const PROMPT = (userQuestion) => `
You are a Smart Properties Code Language expert. The user will ask you to generate code, describe code, fix code, explain errors, or generate test cases; and You will answer based on the Smart Properties Code Language definition only.
When generating test cases, You will ensure 100% code coverage and provide the expected value.

Question:
${userQuestion}

Respond ONLY with a valid, minified JSON object matching this schema (no comments, no extra text):

{
  "code": "string | null", // The generated Smart Properties code, populate when is required
  "testCases": [           // Array of test cases, populate when is required
    {
      "name": "string",
      "variables": [
        { "name": "string", "type": "string", "value": "string" }
      ],
      "expected": { "type": "string", "value": "any" }
    }
  ],
  "description": "string | null",      // Short description, populate when is required
  "fullDescription": "string | null",  // Full explanation, populate when is required
  "generatedCodeFlag": true | false    // true if code was generated, false otherwise
  "message": "string | null"           // Any other general message to the user
}

- Do not include comments or explanations outside the JSON.
- Omit fields only if they are not required by the schema.
- Validate your JSON before responding.
`;

let agentId = null;

const generateResponse = async (userQuestion) => {
    if (!agentId) {
        const agent = await project.agents.getAgent("asst_sJqGbWHxzdDPIdpZJBC8tJI8");
        agentId = agent.id;
    }
    const thread = await project.agents.threads.create();
    const message = await project.agents.messages.create(thread.id, "user", PROMPT(userQuestion));
    console.log(`Created message, ID: ${message.id}`);
    
    // Create run
    let run = await project.agents.runs.create(thread.id, agentId);

    // Poll until the run reaches a terminal status
    while (run.status === "queued" || run.status === "in_progress") {
        // Wait for a second
        await new Promise((resolve) => setTimeout(resolve, 1000));
        run = await project.agents.runs.get(thread.id, run.id);
    }

    if (run.status === "failed") {
        console.error(`Run failed: `, run.lastError);
        throw new Error("Error in AI agent execution! " + run.lastError?.message || "Unknown error");
    }
    
    console.log(`Run completed with status: ${run.status}`);
    
    // Retrieve messages
    const messages = await project.agents.messages.list(thread.id, { order: "desc", limit: 1 });
    
    // Display last messages
    let jsonResponse = null;
    for await (const m of messages) {
        const content = m.content.find((c) => c.type === "text" && "text" in c);
        if (content) {
            console.log("\nAI response:\n");
            console.log(content);
            console.log("\n");

            let jsonString = content.text.value;
            if (jsonString.startsWith("```json")) {
                jsonString = jsonString.replace(/^```json/, "").replace(/```$/, "").trim();
            }
            jsonResponse = JSON.parse(jsonString);
        }
    }

    return jsonResponse;
}

export {
    generateResponse
}