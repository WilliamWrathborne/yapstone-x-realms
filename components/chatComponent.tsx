"use client"
import React from "react";
import { useChat, Message } from "ai/react"

export default function ChatComponent() {
    const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();

    const chatBoxStyle: React.CSSProperties = { 
        backgroundImage: 'url(public/yapstone-gold.png)',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundBlendMode: 'luminosity',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        color: 'black',
        border: '1px solid black',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '2px',
    };

    // Function to process and render message with markdown-like formatting
    const renderMessageContent = (content: string) => {
        const parts = content.split(/(\*.*?\*)/g); // Splitting by asterisks
        return parts.map((part, index) => {
            if (part.startsWith("*") && part.endsWith("*")) {
                return <strong key={index}>{part.slice(1, -1)}</strong>; //Bold
            } else {
                return part; // Normal text
            }
        });
    };

    return (
        <div style={chatBoxStyle}>
            <div style={{ overflowY: 'auto', maxHeight: '80%', padding: '10px' }}>
                {messages.map((message: Message, idx) => (
                    <div key={idx} style={{ marginBottom: '10px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                            {message.role === "assistant" ? "Yapstone Expert AI" : "Yapstone User"}
                        </div>
                        <div>
                            {message.content.split("\n").map((textBlock, index) => (
                                textBlock === ""
                                    ? <br key={index} />
                                    : <p key={index} style={{ margin: '0' }}>{renderMessageContent(textBlock)}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} style={{ borderTop: '1px solid black', paddingTop: '10px' }}>
                <textarea
                    placeholder={'Welcome to Yapstone! How Can I Help You?'}
                    style={{ width: '100%', minHeight: '50px', marginBottom: '10px', border: '1px solid black', backgroundColor: 'transparent', padding: '5px', fontSize: '1rem' }}
                    value={input}
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid black', padding: '5px', fontSize: '1rem' }}>
                    {isLoading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
}
