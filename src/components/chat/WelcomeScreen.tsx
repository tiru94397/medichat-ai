import { Stethoscope, Pill, Calendar, FileText } from 'lucide-react';

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  {
    icon: Stethoscope,
    title: 'Symptom Analysis',
    prompt: 'I have a persistent headache and mild fever. What could be causing this?',
  },
  {
    icon: Pill,
    title: 'Medication Info',
    prompt: 'What are the common side effects of ibuprofen and when should I avoid taking it?',
  },
  {
    icon: Calendar,
    title: 'Appointment Prep',
    prompt: 'What questions should I ask my doctor during my annual checkup?',
  },
  {
    icon: FileText,
    title: 'Lab Results',
    prompt: 'Can you help me understand what elevated white blood cell count means?',
  },
];

const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 animate-fade-in">
      {/* Logo & Title */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl health-gradient flex items-center justify-center shadow-glow mb-4">
          <svg
            className="w-8 h-8 text-primary-foreground"
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
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Welcome to MediChat AI
        </h1>
        <p className="text-muted-foreground text-center max-w-md">
          Your intelligent healthcare assistant. Ask questions about symptoms, medications, wellness tips, and more.
        </p>
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.prompt)}
            className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl text-left hover:bg-accent hover:border-primary/20 transition-all duration-200 group shadow-soft hover:shadow-medium"
          >
            <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors">
              <suggestion.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm mb-1">
                {suggestion.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {suggestion.prompt}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
