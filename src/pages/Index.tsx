import { useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    sendMessage,
    selectConversation,
    deleteConversation,
    startNewChat,
  } = useChat();

  const handleSend = (message: string) => {
    sendMessage(message);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={startNewChat}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {!sidebarOpen && <div className="w-10" />}
            <div>
              <h1 className="font-semibold text-foreground">
                {activeConversation?.title || 'MediChat AI'}
              </h1>
              <p className="text-xs text-muted-foreground">
                Your intelligent healthcare assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-soft"></span>
              Online
            </span>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <ChatMessages
            messages={activeConversation?.messages || []}
            isLoading={isLoading}
            onSuggestionClick={handleSend}
          />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
