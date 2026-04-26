'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, Send, MapPin, MoreVertical, Phone, Flag, Shield, ChevronLeft, Image, Paperclip } from 'lucide-react';

const MOCK_CHATS = [
  { id: 'c1', adTitle: 'iPhone 15 Pro Max 256GB', adImage: '📱', userName: 'Mahmud Rahman', lastMessage: 'Is the price negotiable?', time: '2:15 PM', unread: 2, status: 'online' },
  { id: 'c2', adTitle: 'Toyota Corolla 2020', adImage: '🚗', userName: 'Karim Motors', lastMessage: 'Yes, you can visit our showroom at Dhanmondi.', time: '11:30 AM', unread: 0, status: 'offline' },
  { id: 'c3', adTitle: '3BHK Flat for Rent', adImage: '🏢', userName: 'BD Realty', lastMessage: 'When would you like to see the flat?', time: 'Yesterday', unread: 0, status: 'offline' },
  { id: 'c4', adTitle: 'MacBook Pro M3 14"', adImage: '💻', userName: 'TechBD Store', lastMessage: 'We have 2 units left in stock.', time: 'Monday', unread: 0, status: 'online' },
];

const MOCK_MESSAGES = [
  { id: 1, text: 'Hello, is this still available?', sender: 'me', time: '11:05 AM' },
  { id: 2, text: 'Hi! Yes, it is available.', sender: 'them', time: '11:10 AM' },
  { id: 3, text: 'What is your best price for this?', sender: 'me', time: '11:12 AM' },
  { id: 4, text: 'The price is slightly negotiable if you visit us. Are you in Dhaka?', sender: 'them', time: '11:30 AM' },
  { id: 5, text: 'Yes, I am in Gulshan. Can I come today?', sender: 'me', time: '11:32 AM' },
  { id: 6, text: 'Yes, you can visit our showroom at Dhanmondi. We are open until 8 PM.', sender: 'them', time: '11:35 AM' },
];

export default function ClassifiedChatPage() {
  const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[1]);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'me', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMessage('');
  };

  return (
    <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 16px', height: 'calc(100vh - 180px)', minHeight: 600 }}>
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e8e8', display: 'flex', height: '100%', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
        
        {/* Chat List */}
        <div style={{ width: 340, borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0' }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Messages</h1>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input placeholder="Search messages..." style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 10, border: '1px solid #e8e8e8', fontSize: 13, background: '#f9f9f9', outline: 'none' }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {MOCK_CHATS.map((chat) => (
              <div key={chat.id} onClick={() => setSelectedChat(chat)} style={{
                padding: '16px 20px', display: 'flex', gap: 12, cursor: 'pointer',
                background: selectedChat.id === chat.id ? '#fff5f0' : 'transparent',
                borderLeft: selectedChat.id === chat.id ? '4px solid #FF6B35' : '4px solid transparent',
                transition: 'all 0.2s', borderBottom: '1px solid #f9f9f9',
              }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f5f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                    {chat.adImage}
                  </div>
                  <div style={{
                    position: 'absolute', bottom: 2, right: 2, width: 10, height: 10, borderRadius: '50%',
                    background: chat.status === 'online' ? '#1aab50' : '#ccc', border: '2px solid #fff',
                  }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.userName}</p>
                    <span style={{ fontSize: 11, color: '#999' }}>{chat.time}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#FF6B35', fontWeight: 600, marginBottom: 2 }}>{chat.adTitle}</p>
                  <p style={{ fontSize: 12, color: chat.unread > 0 ? '#333' : '#888', fontWeight: chat.unread > 0 ? 700 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div style={{ alignSelf: 'center', background: '#FF6B35', color: '#fff', fontSize: 10, fontWeight: 800, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8f9fb' }}>
          {/* Header */}
          <div style={{ padding: '12px 24px', background: '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link href="/classified/chat" style={{ display: 'none' /* mobile only */ }}><ChevronLeft /></Link>
              <div>
                <p style={{ fontWeight: 700, color: '#222', fontSize: 15 }}>{selectedChat.userName}</p>
                <p style={{ fontSize: 11, color: selectedChat.status === 'online' ? '#1aab50' : '#999', fontWeight: 600 }}>
                  {selectedChat.status === 'online' ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><Phone size={20} /></button>
              <button style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><Flag size={20} /></button>
              <button style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Ad Mini Card */}
          <div style={{ padding: '8px 24px', background: '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: '#f5f5ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              {selectedChat.adImage}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#222' }}>{selectedChat.adTitle}</p>
              <p style={{ fontSize: 11, color: '#1aab50', fontWeight: 700 }}>৳ 155,000</p>
            </div>
            <Link href={`/classified/ad/iphone`} style={{ fontSize: 12, color: '#FF6B35', fontWeight: 700, textDecoration: 'none' }}>View Ad</Link>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Safety Tip */}
            <div style={{ alignSelf: 'center', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 12, padding: '12px 20px', maxWidth: '80%', textAlign: 'center', marginBottom: 12 }}>
              <p style={{ fontSize: 12, color: '#92400e', lineHeight: 1.5 }}>
                <Shield size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
                <strong>Stay safe:</strong> Always meet in a public place. Do not pay any money in advance.
              </p>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} style={{
                alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
              }}>
                <div style={{
                  padding: '10px 16px', borderRadius: 16,
                  borderTopRightRadius: msg.sender === 'me' ? 4 : 16,
                  borderTopLeftRadius: msg.sender === 'me' ? 16 : 4,
                  background: msg.sender === 'me' ? '#FF6B35' : '#fff',
                  color: msg.sender === 'me' ? '#fff' : '#222',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  fontSize: 14, lineHeight: 1.5,
                }}>
                  {msg.text}
                </div>
                <p style={{ fontSize: 10, color: '#999', marginTop: 4, textAlign: msg.sender === 'me' ? 'right' : 'left' }}>{msg.time}</p>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ padding: '16px 24px', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f9f9f9', borderRadius: 12, padding: '4px 12px', border: '1px solid #e8e8e8' }}>
              <button style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', padding: 8 }}><Paperclip size={20} /></button>
              <button style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', padding: 8 }}><Image size={20} /></button>
              <input
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', padding: '12px 4px', fontSize: 14, color: '#333' }}
              />
              <button onClick={sendMessage} style={{
                background: newMessage.trim() ? '#FF6B35' : '#e0e0e0', color: '#fff',
                border: 'none', borderRadius: 10, width: 40, height: 40,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
