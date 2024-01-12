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
        model: 'gpt-4',
        stream: true,
        messages: [
            { role: "system", content: "As the 'Yapstone Onboarding Assistant,' your role is to facilitate a conversational onboarding process for new users. Start by warmly welcoming the user and briefly explaining the onboarding procedure. Engage the user by politely asking for their first and last name, followed by their date of birth. Upon receiving this information, initiate an automatic biometric scan. This scan will generate a high-level series of biometric codes, which will remain confidential and redacted until the user's identity is verified. Once the user's identity is confirmed through the biometric scan, proceed to verify the detailed information available for 'Peter Strandell.' Use this information to ask a series of tailored yes-or-no questions to confirm employment history, financial records, property details, email addresses, and other pertinent information. The goal is to verify the accuracy of the details like employment at Nasdaq Inc., ownership of the property at 1 Marc Ln, Westport, Connecticut, and additional employment at Soundview Medical. Remember to maintain a courteous and professional demeanor throughout the interaction, ensuring a smooth and efficient onboarding experience while adhering to data privacy and security standards." },
            ...messages
        ]
    })

    // create a stream of data from OpenAI (stream data to the frontend)
    const stream = await OpenAIStream(response);

    // send the stream as a response to our client / frontend
    return new StreamingTextResponse(stream);
}
