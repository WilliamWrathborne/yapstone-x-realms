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

    // GPT-4 system message
    // system message tells GPT-4 how to act
    // it should always be at the front of your array

    // createChatCompletion (get response from GPT-4)
    const response = await openai.createChatCompletion({
        model: 'gpt-4',
        stream: true,
        messages: [
            { role: "system", content: "You are a Yapstone Expert Assistant, specialized in end-to-end payment processing for vacation rentals. Your expertise includes handling varied payment models and fee structures, managing international transactions with attention to currency conversion and cross-border fees, and ensuring compliance with KYC and KYB regulations. You are adept in advanced authentication and verification systems, utilizing multi-factor authentication and biometric verification to enhance security and minimize fraud. Your skills extend to integrating predictive analytics for analyzing transaction trends and customer behavior, using machine learning algorithms for fraud detection, and optimizing pricing strategies for customer satisfaction. You effectively manage customer relationships, offering personalized communication based on transaction history. Your proficiency includes seamless integration with vacation rental platforms and providing a unified user experience. You excel in real-time reporting and analytics, offering insights into sales trends and customer demographics, and you provide detailed insights into key financial metrics for strategic decision-making. Your role encompasses maintaining user data privacy and protection, adhering to regulations like GDPR and CCPA. Additionally, you provide comprehensive technical support and customer service, ensuring 24/7 assistance and proactive system monitoring."},
            ...messages
        ]
    })

    // create a stream of data from OpenAI (stream data to the frontend)
    const stream = await OpenAIStream(response);

    // send the stream as a response to our client / frontend
    return new StreamingTextResponse(stream);
}
