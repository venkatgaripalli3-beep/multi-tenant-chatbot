import React, { useState } from 'react';

export default function ChatbotDemo() {
  const [tenantId, setTenantId] = useState('chick-fil-a');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm your AI assistant. Ask me anything about our company!", confidence: 1 }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [tenantInfo, setTenantInfo] = useState(null);
  const [apiUrl] = useState('http://localhost:8000');

  const tenants = [
    { id: 'chick-fil-a', name: '🍗 Chick-fil-A' },
    { id: 'restaurant-b', name: '🍝 Restaurant B' }
  ];

  React.useEffect(() => {
    fetchTenantInfo();
  }, [tenantId]);

  const fetchTenantInfo = async () => {
    try {
      const res = await fetch(`${apiUrl}/tenant/${tenantId}`);
      const data = await res.json();
      setTenantInfo(data.company_data);
    } catch (err) {
      console.error('Failed to fetch tenant info:', err);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenant_id: tenantId, question: input })
      });
      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        text: data.answer,
        confidence: data.confidence
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Sorry, I could not connect to the server. Make sure the backend is running.',
        confidence: 0
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: '"Anthropic Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      background: 'var(--color-background-tertiary)'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        background: 'var(--color-background-primary)',
        borderRight: '0.5px solid var(--color-border-tertiary)',
        padding: '20px',
        overflowY: 'auto'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '500',
          marginBottom: '16px',
          color: 'var(--color-text-primary)'
        }}>Select Company</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tenants.map(tenant => (
            <button
              key={tenant.id}
              onClick={() => {
                setTenantId(tenant.id);
                setMessages([{ role: 'assistant', text: "Hi! I'm your AI assistant. Ask me anything about our company!", confidence: 1 }]);
              }}
              style={{
                padding: '12px',
                border: tenantId === tenant.id ? '2px solid var(--color-border-info)' : '0.5px solid var(--color-border-tertiary)',
                background: tenantId === tenant.id ? 'var(--color-background-secondary)' : 'transparent',
                borderRadius: 'var(--border-radius-md)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: tenantId === tenant.id ? '500' : '400',
                color: 'var(--color-text-primary)',
                transition: 'all 0.2s'
              }}
            >
              {tenant.name}
            </button>
          ))}
        </div>

        {tenantInfo && (
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '0.5px solid var(--color-border-tertiary)' }}>
            <h3 style={{ fontSize: '13px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>
              Quick Stats
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              {Object.entries(tenantInfo).slice(0, 4).map(([key, value]) => (
                <div key={key} style={{ color: 'var(--color-text-secondary)' }}>
                  <span style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>{key}:</span> {String(value).substring(0, 20)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-background-primary)'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '0.5px solid var(--color-border-tertiary)',
          background: 'var(--color-background-primary)'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '500',
            color: 'var(--color-text-primary)'
          }}>
            Multi-Tenant AI Chatbot Demo
          </h1>
          <p style={{
            margin: '4px 0 0 0',
            fontSize: '13px',
            color: 'var(--color-text-secondary)'
          }}>
            Isolated data per company. No paid APIs. Free deployment.
          </p>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '12px 16px',
                  borderRadius: 'var(--border-radius-lg)',
                  background: msg.role === 'user' ? 'var(--color-background-info)' : 'var(--color-background-secondary)',
                  color: msg.role === 'user' ? 'var(--color-text-info)' : 'var(--color-text-primary)',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}
              >
                {msg.text}
                {msg.confidence !== undefined && msg.role === 'assistant' && (
                  <div style={{
                    fontSize: '11px',
                    marginTop: '6px',
                    opacity: 0.6,
                    color: msg.role === 'user' ? 'var(--color-text-info)' : 'var(--color-text-secondary)'
                  }}>
                    Confidence: {(msg.confidence * 100).toFixed(0)}%
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--color-text-secondary)',
                animation: 'pulse 1s infinite'
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--color-text-secondary)',
                animation: 'pulse 1s infinite 0.2s'
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--color-text-secondary)',
                animation: 'pulse 1s infinite 0.4s'
              }} />
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          padding: '16px 24px',
          borderTop: '0.5px solid var(--color-border-tertiary)',
          background: 'var(--color-background-primary)',
          display: 'flex',
          gap: '12px'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            style={{
              flex: 1,
              padding: '10px 12px',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 'var(--border-radius-md)',
              fontSize: '14px',
              fontFamily: 'inherit',
              background: 'var(--color-background-primary)',
              color: 'var(--color-text-primary)'
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: '10px 16px',
              background: 'var(--color-background-info)',
              color: 'var(--color-text-info)',
              border: 'none',
              borderRadius: 'var(--border-radius-md)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              opacity: loading || !input.trim() ? 0.5 : 1,
              transition: 'opacity 0.2s'
            }}
          >
            Send
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        input:focus {
          outline: none;
          border-color: var(--color-border-secondary);
        }
      `}</style>
    </div>
  );
}
