
const EXPLAIN_CODE_QUESTION = code => `
    Can you explain this code?

    \`\`\`
    ${code}
    \`\`\`

    Only the description and full description is required
`;
const GENERATE_TEST_CASES_QUESTION = code => `
    Using Smart Properties Code Language only. Can you generate the test cases for this code?

    \`\`\`
    ${code}
    \`\`\`

    Only the test cases is required
`;
const GENERATE_CODE_QUESTION = description => `
    Using Smart Properties Code Language only. Generate a code based on the following description:

    Description:
    ${description}

    - Only the code generated, short description and full description are required. 
    - Validate that the code generated is following the Smart Properties Code Language definition and syntax. 
    - If the description is not clear, generate the code based on the best of your understanding of the description provided.
`;
const UPDATE_CODE_QUESTION = (code, update) => `
    Based on the actual next code:

    \`\`\`
    ${code}
    \`\`\`

    Make the following update:
    ${update}
    
    - Only the code generated, short description and full description are required. 
    - Validate that the code generated is following the Smart Properties Code Language definition and syntax. 
    - If the description is not clear, generate the code based on the best of your understanding of the description provided.
`;

export {
    EXPLAIN_CODE_QUESTION,
    GENERATE_TEST_CASES_QUESTION,
    GENERATE_CODE_QUESTION,
    UPDATE_CODE_QUESTION
}
