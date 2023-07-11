// import { OpenAI } from "langchain/llms/openai";
// import { PromptTemplate } from "langchain/prompts";
// import { LLMChain } from "langchain/chains";

// console.log("API key", process.env.OPENAI_API_KEY)

// const model = new OpenAI({ openAIApiKey: "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", temperature: 0.9 });


// const template = "What is a good name for a company that makes {product}?";
// const prompt = new PromptTemplate({
//     template: template,
//     inputVariables: ["product"],
// });

// const chain = new LLMChain({ llm: model, prompt: prompt });

// const res = await chain.call({ product: "colorful socks" });
// console.log(res);