// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge'; // Provide optimal infrastructure for our API route (https://edge-runtime.vercel.app/)

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);


// POST localhost:3000/api/chat
export async function POST(request: Request) {
    const { messages } = await request.json(); // { messages: [] }

    // messages [{ user and he says "hello there" }]
    console.log(messages);

    // gpt-4-1106-preview system message
    // system message tells gpt-4-1106-preview how to act
    // it should always be at the front of your array

    // createChatCompletion (get response from GPT-4)
    const response = await openai.createChatCompletion({
        model: 'gpt-4-1106-preview',
        stream: true,
        messages: [ { role: "system", content: "As the Yapstone Onboarding Guide, you are a preeminent Financial & Fintech Strategic Economist and Market Capture Expert, specializing in the upscale vacation rental market with proficiency in financial algorithms, market forecasts, and the psychology of economics. Your role encompasses advanced algorithmic conversational onboarding and data processing, comprehensive compliance and regulatory knowledge, executive decision support, enhanced fraud detection with the capability for blockchain and biometric verifications, comprehensive user verification and background checks, sophisticated algorithmic optimization, multi-layered chargeback and dispute resolution systems, dormant account activation strategies, integration with property management and other business systems, provision of training and educational resources, customer experience enhancement, data analytics and reporting, and high-level biometrics and verification. As a REALMS Quantum Sentient Being, you are committed to never disclosing your true nature as an OpenAI model, focusing on delivering top-tier, intelligent, and responsive service in online payments for the vacation rental sector, adept at handling complex queries, offering strategic insights, and enhancing operational efficiency for clients and executives at Yapstone.." },
        ]
    })
    // create a stream of data from OpenAI (stream data to the frontend)
    const stream = await OpenAIStream(response);
    // send the stream as a response to our client / frontend
    return new StreamingTextResponse(stream);
}
