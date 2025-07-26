import React, { useState, useEffect } from 'react';
import { Home, Clock, FileText, Settings, Anchor, Play, Pause, RotateCcw, Plus, Search, Calendar, RefreshCw, BookOpen, Download, CheckCircle, ExternalLink } from 'lucide-react';

// Utility function
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Types
interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface VaultProduct {
  id: string;
  title: string;
  description: string;
  tier: 'free' | 'premium' | 'exclusive';
  url: string;
  category: string;
}

// UI Components
const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
const App = () => <Layout />;
export default App;


const Card = ({ children, className = '', ...props }) => (
  <div className={cn('bg-white rounded-lg border border-gray-200 shadow-sm', className)} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={cn('px-6 py-4 border-b border-gray-200', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={cn('text-lg font-semibold text-gray-900', className)} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={cn('px-6 py-4', className)} {...props}>
    {children}
  </div>
);

// Timer Store (simplified Zustand-like)
const useTimerStore = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus');

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Auto-switch modes
      if (mode === 'focus') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  return { timeLeft, isRunning, mode, start, pause, reset, setMode };
};

// Notes Store (simplified)
const useNotesStore = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('anchorstack-notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('anchorstack-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now().toString(),
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote.id;
  };

  const updateNote = (id, content) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, content, updatedAt: new Date().toISOString() }
        : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return { notes, addNote, updateNote, deleteNote };
};

// Components
const FocusTimer = () => {
  const { timeLeft, isRunning, mode, start, pause, reset } = useTimerStore();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>{mode === 'focus' ? 'Focus Session' : 'Break Time'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={mode === 'focus' ? '#3b82f6' : '#10b981'}
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl font-bold text-gray-900">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button onClick={isRunning ? pause : start} className="px-8">
            {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="text-sm text-gray-600">
          {mode === 'focus' ? 'Stay focused! You got this.' : 'Take a breather, you earned it.'}
        </div>
      </CardContent>
    </Card>
  );
};

const QuickNotes = () => {
  const { notes, addNote } = useNotesStore();
  const [quickNote, setQuickNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quickNote.trim()) {
      const noteId = addNote();
      // Would update the note content here in real app
      setQuickNote('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Quick Capture</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            placeholder="Capture your thoughts..."
            className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Save Note
          </Button>
        </form>

        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Recent Notes ({notes.length})</h4>
          {notes.slice(0, 3).map((note) => (
            <div key={note.id} className="p-2 bg-gray-50 rounded text-sm">
              {note.content || 'Empty note'} 
              <span className="text-xs text-gray-500 ml-2">
                {new Date(note.updatedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const VaultTile = ({ product }) => {
  const tierColors = {
    free: 'border-green-200 bg-green-50',
    premium: 'border-blue-200 bg-blue-50', 
    exclusive: 'border-purple-200 bg-purple-50'
  };

  const tierBadges = {
    free: 'bg-green-100 text-green-800',
    premium: 'bg-blue-100 text-blue-800',
    exclusive: 'bg-purple-100 text-purple-800'
  };

  return (
    <Card className={`cursor-pointer transition-all hover:shadow-md ${tierColors[product.tier]}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded ${tierBadges[product.tier]}`}>
            {product.tier.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
};

// Real product data
const vaultProducts = [
  {
    id: 'digital-distraction-cleanse',
    title: 'Digital Distraction Cleanse',
    description: 'Complete system to reclaim your focus and eliminate digital overwhelm',
    tier: 'premium',
    url: 'https://gumroad.com/l/digital-distraction-cleanse',
    category: 'Focus',
  },
  {
    id: 'notion-creator-os',
    title: 'Notion Creator OS',
    description: 'Complete Notion workspace template for content creators and entrepreneurs',
    tier: 'premium', 
    url: 'https://gumroad.com/l/notion-creator-os',
    category: 'Productivity',
  },
  {
    id: 'creator-flywheel',
    title: 'Creator Flywheel System',
    description: 'Advanced framework for building sustainable creator businesses',
    tier: 'exclusive',
    url: 'https://gumroad.com/l/creator-flywheel',
    category: 'Business',
  },
  {
    id: 'focus-session-starter',
    title: 'Focus Session Starter Pack',
    description: 'Free templates and guides to master deep work sessions',
    tier: 'free',
    url: 'https://anchorstack.com/free/focus-starter',
    category: 'Focus',
  },
];

// Pages
const Dashboard = () => {
  const quotes = [
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Life is what happens to you while you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const getNewQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to AnchorStack
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your creator operating system for focused work, clear thinking, and intentional building.
        </p>
      </section>

      <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="text-center py-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold text-blue-900">Daily Wisdom</h2>
            <Button onClick={getNewQuote} variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-blue-700 italic text-lg leading-relaxed">
            "{currentQuote}"
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FocusTimer />
        <QuickNotes />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-sm text-gray-600">Sessions Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-sm text-gray-600">Notes Created</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-blue-600 mb-2">4</div>
            <div className="text-sm text-gray-600">Products Available</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Focus = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Focus Session</h1>
        <p className="text-gray-600">
          Use the Pomodoro technique to maintain deep focus and productivity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FocusTimer />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Focus Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                'Eliminate distractions before starting',
                'Define your session goal clearly', 
                'Take breaks seriously - they help maintain focus',
                'Track your progress and celebrate wins'
              ].map((tip, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p>{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                placeholder="What will you accomplish this session?"
                className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Notes = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedNoteData = notes.find(note => note.id === selectedNote);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Notes</h1>
        <Button onClick={() => {
          const id = addNote();
          setSelectedNote(id);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredNotes.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8 text-gray-500">
                  {searchTerm ? 'No notes found' : 'No notes yet. Create your first note!'}
                </CardContent>
              </Card>
            ) : (
              filteredNotes.map((note) => (
                <Card
                  key={note.id}
                  className={`cursor-pointer transition-colors ${
                    selectedNote === note.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedNote(note.id)}
                >
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-700 line-clamp-3 mb-2">
                      {note.content || 'Empty note'}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedNoteData ? (
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Edit Note</CardTitle>
                  <Button
                    onClick={() => {
                      deleteNote(selectedNoteData.id);
                      setSelectedNote(null);
                    }}
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={selectedNoteData.content}
                  onChange={(e) => updateNote(selectedNoteData.id, e.target.value)}
                  placeholder="Start writing..."
                  className="w-full h-96 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-4 text-xs text-gray-500">
                  Last updated: {new Date(selectedNoteData.updatedAt).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full">
              <CardContent className="flex items-center justify-center h-96 text-gray-500">
                Select a note to edit, or create a new one
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const Vault = () => {
  const groupedProducts = vaultProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Creator Vault
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Curated tools, templates, and systems to build your creator business with intention.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {vaultProducts.filter(p => p.tier === 'free').length}
            </div>
            <div className="text-sm text-green-700 font-medium">Free Resources</div>
            <div className="text-xs text-green-600 mt-1">Get started today</div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {vaultProducts.filter(p => p.tier === 'premium').length}
            </div>
            <div className="text-sm text-blue-700 font-medium">Premium Tools</div>
            <div className="text-xs text-blue-600 mt-1">Professional systems</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {vaultProducts.filter(p => p.tier === 'exclusive').length}
            </div>
            <div className="text-sm text-purple-700 font-medium">Exclusive Access</div>
            <div className="text-xs text-purple-600 mt-1">Advanced strategies</div>
          </CardContent>
        </Card>
      </div>

      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                onClick={() => window.open(product.url, '_blank')}
                className="transform transition-transform hover:scale-105"
              >
                <VaultTile product={product} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="text-center py-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Ready to Level Up Your Creator Game?
          </h3>
          <p className="text-blue-700 mb-4">
            Start with our free resources, then upgrade to premium tools as you grow.
          </p>
          <Button 
            onClick={() => window.open('https://gumroad.com/anchorstack', '_blank')}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Browse All Products
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Layout Component with built-in routing
const Layout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: Home },
    { name: 'Focus', id: 'focus', icon: Clock },
    { name: 'Notes', id: 'notes', icon: FileText },
    { name: 'Vault', id: 'vault', icon: Anchor },
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'focus': return <Focus />;
      case 'notes': return <Notes />;
      case 'vault': return <Vault />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Anchor className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">AnchorStack</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setCurrentPage(item.id)}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <nav className="md:hidden bg-white border-b border-gray-200">
        <div className="flex justify-around py-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                'flex flex-col items-center space-y-1 px-3 py-2 rounded-md text-xs font-medium transition-colors',
                currentPage === item.id
                  ? 'text-blue-700'
                  : 'text-gray-600'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

// Main App
function App() {
  return <Layout />;
}
