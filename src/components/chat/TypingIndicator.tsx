const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full health-gradient flex items-center justify-center shadow-soft flex-shrink-0">
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
      <div className="bg-chat-assistant rounded-2xl rounded-tl-sm px-4 py-3 shadow-soft">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full typing-dot"></span>
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full typing-dot"></span>
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full typing-dot"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
