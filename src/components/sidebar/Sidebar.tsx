import { Conversation } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Plus, PanelLeftClose, PanelLeft } from 'lucide-react';
import ConversationItem from './ConversationItem';
import { cn } from '@/lib/utils';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

const Sidebar = ({
  conversations,
  activeConversationId,
  isOpen,
  onToggle,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
}: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:relative z-50 h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out',
          isOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full lg:w-0'
        )}
      >
        <div className={cn('flex flex-col h-full', !isOpen && 'hidden')}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg health-gradient flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-sidebar-foreground">MediChat</span>
            </div>
            <Button
              variant="ghost"
              size="iconSm"
              onClick={onToggle}
              className="text-muted-foreground hover:text-foreground"
            >
              <PanelLeftClose className="w-4 h-4" />
            </Button>
          </div>

          {/* New Chat Button */}
          <div className="p-3">
            <Button
              variant="health"
              className="w-full justify-start gap-2"
              onClick={onNewChat}
            >
              <Plus className="w-4 h-4" />
              New Chat
            </Button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto px-3 pb-3 scrollbar-thin">
            <p className="text-xs font-medium text-muted-foreground px-3 py-2">
              Recent Conversations
            </p>
            <div className="space-y-1">
              {conversations.length === 0 ? (
                <p className="text-sm text-muted-foreground px-3 py-4 text-center">
                  No conversations yet
                </p>
              ) : (
                conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={conversation.id === activeConversationId}
                    onClick={() => onSelectConversation(conversation.id)}
                    onDelete={() => onDeleteConversation(conversation.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-muted-foreground text-center">
              Powered by MediChat AI
            </p>
          </div>
        </div>
      </aside>

      {/* Toggle button when closed */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="fixed top-4 left-4 z-30 bg-card shadow-soft hover:shadow-medium"
        >
          <PanelLeft className="w-4 h-4" />
        </Button>
      )}
    </>
  );
};

export default Sidebar;
