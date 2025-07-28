import React, { useState } from 'react';
import { Home, Clock, FileText, Anchor, Play, Pause, RotateCcw, Plus } from 'lucide-react';

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  const variantClasses = variant === 'primary' 
    ? 'bg-blue-600 text-white hover:bg-blue-700' 
    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50';
  
  return (
    <button className={cn(baseClasses, variantClasses, className)} onClick={onClick}>
      {children}
    </button>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={cn('bg-white rounded-lg border border-gray-200 shadow-sm p-6', className)}>
    {children}
  </div>
);

const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="text-center">
      <h2 className="text-xl font-bold mb-4 flex items-center justify-center">
        <Clock className="w-5 h-5 mr-2" />
        Focus Timer
      </h2>
      <div className="text-4xl font-bold mb-6 text-blue-600">
        {formatTime(timeLeft)}
      </div>
      <div className="flex justify-center space-x-4">
        <Button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outline" onClick={() => setTimeLeft(25 * 60)}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </Card>
  );
};

const QuickNote: React.FC = () => {
  const [note, setNote] = useState('');

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2" />
        Quick Notes
      </h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Capture your thoughts..."
        className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button className="mt-4">
        <Plus className="w-4 h-4 mr-2" />
        Save Note
      </Button>
    </Card>
  );
};

const ProductVault: React.FC = () => {
  const products = [
    { name: 'Digital Distraction Cleanse', tier: 'Premium', category: 'Focus' },
    { name: 'Notion Creator OS', tier: 'Premium', category: 'Productivity' },
    { name: 'Creator Flywheel System', tier: 'Exclusive', category: 'Business' },
    { name: 'Focus Session Starter', tier: 'Free', category: 'Focus' },
  ];

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Anchor className="w-5 h-5 mr-2" />
        Product Vault
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h3 className="font-semibold">{product.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">{product.category}</span>
              <span className={cn(
                'px-2 py-1 text-xs rounded',
                product.tier === 'Free' ? 'bg-green-100 text-green-800' :
                product.tier === 'Premium' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              )}>
                {product.tier}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: Home },
    { name: 'Focus', id: 'focus', icon: Clock },
    { name: 'Notes', id: 'notes', icon: FileText },
    { name: 'Vault', id: 'vault', icon: Anchor },
  ];

  const renderContent = () => {
    if (currentPage === 'focus') {
      return (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Focus Session</h1>
          <Timer />
        </div>
      );
    }

    if (currentPage === 'notes') {
      return (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Notes</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuickNote />
            <Card>
              <h2 className="text-xl font-bold mb-4">Recent Notes</h2>
              <p className="text-gray-500">No notes yet. Create your first note!</p>
            </Card>
          </div>
        </div>
      );
    }

    if (currentPage === 'vault') {
      return (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Creator Vault</h1>
          <ProductVault />
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to AnchorStack</h1>
          <p className="text-xl text-gray-600">Your creator operating system for focused work and intentional building.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Timer />
          <QuickNote />
        </div>

        <ProductVault />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b border-gray-200">
        <div className="flex justify-around py-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                'flex flex-col items-center space-y-1 px-3 py-2 rounded-md text-xs font-medium transition-colors',
                currentPage === item.id ? 'text-blue-700' : 'text-gray-600'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;