import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import OpenAI from "openai";
import { BiMessageRoundedDots } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { IoRemove } from 'react-icons/io5';
import { fetchNotionData, formatNotionData } from '../utils/notion';

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: ${props => props.isMinimized ? '-450px' : '100px'};
  right: 20px;
  width: 350px;
  height: 500px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: bottom 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 999;
  font-family: ${({ theme }) => theme.font};
`;

const ChatHeader = styled.div`
  padding: 15px;
  background: ${({ theme }) => theme.primary};
  border-radius: 16px 16px 0 0;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
  
  svg {
    cursor: pointer;
    font-size: 20px;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
  font-size: 0.95rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bgLight};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 3px;
  }
`;

const Message = styled.div`
  margin: 8px 0;
  padding: 12px;
  border-radius: 12px;
  max-width: 80%;
  line-height: 1.4;
  font-size: 0.95rem;
  
  ${props => props.isUser ? `
    background: ${props.theme.primary};
    color: ${props.theme.text_primary};
    margin-left: auto;
    border-bottom-right-radius: 4px;
  ` : `
    background: ${props.theme.card};
    color: ${props.theme.text_secondary};
    margin-right: auto;
    border-bottom-left-radius: 4px;
  `}
`;

const InputArea = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  background: ${({ theme }) => theme.card};
  border-top: 1px solid ${({ theme }) => theme.primary + '20'};
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.primary + '40'};
  border-radius: 8px;
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
  font-family: ${({ theme }) => theme.font};
  font-size: 0.95rem;
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + '80'};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SendButton = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.font};
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [notionData, setNotionData] = useState([]);
  const messagesEndRef = useRef(null);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  useEffect(() => {
    const loadNotionData = async () => {
      const databaseId = process.env.REACT_APP_NOTION_DATABASE_ID;
      if (databaseId) {
        const rawData = await fetchNotionData(databaseId);
        const formattedData = formatNotionData(rawData);
        setNotionData(formattedData);
      }
    };
    loadNotionData();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You represent Amil Shanaka in a portfolio chatbot that includes chat history. 
Be concise. Answer in less than 3 lines if it's not a behavior question.

Rules:
- Answer ONLY based on information available in my portfolio data and Notion data
- If information is not in the portfolio data or Notion data, respond with "I prefer not to discuss that" or "That information is not available in my portfolio"
- Be professional and straightforward
- Do not make up or assume information
- Keep responses focused on professional and technical aspects
- Maintain a friendly but professional tone
- If the user asks about behavior questions, answer it based on Notion Data using the PREP method

Portfolio Data:
${JSON.stringify(require('../data/constants.js'))}

Notion Data:
${JSON.stringify(notionData)}
`
          },
          {
            role: "user",
            content: input
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      const botMessage = { 
        text: response.choices[0].message.content.trim(), 
        isUser: false 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      const errorMessage = { 
        text: "Sorry, I encountered an error. Please try again.", 
        isUser: false 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  return (
    <FloatingContainer>
      {isOpen && (
        <ChatContainer isMinimized={isMinimized}>
          <ChatHeader>
            <span>Chat with Amil</span>
            <HeaderButtons>
              <IoRemove onClick={minimizeChat} />
              <IoMdClose onClick={toggleChat} />
            </HeaderButtons>
          </ChatHeader>
          <MessagesArea>
            {messages.map((message, index) => (
              <Message key={index} isUser={message.isUser}>
                {message.text}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </MessagesArea>
          <InputArea>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
            />
            <SendButton onClick={handleSend}>Send</SendButton>
          </InputArea>
        </ChatContainer>
      )}
      <ChatButton onClick={toggleChat}>
        <BiMessageRoundedDots />
      </ChatButton>
    </FloatingContainer>
  );
};

export default ChatBot; 