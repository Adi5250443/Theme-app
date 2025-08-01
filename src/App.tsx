import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChevronDown, Home, Info, Mail, ShoppingBag, Star, User } from 'lucide-react';

// Types
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

type ThemeType = 'theme1' | 'theme2' | 'theme3';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

// Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as ThemeType) || 'theme1';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Router Context (Simple implementation)
interface RouterContextType {
  currentPage: string;
  navigate: (page: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <RouterContext.Provider value={{ currentPage, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

// Theme Styles
interface ThemeStyles {
  container: string;
  header: string;
  headerContent: string;
  logo: string;
  dropdown: string;
  dropdownButton: string;
  dropdownMenu: string;
  nav: string;
  navButton: string;
  main: string;
  sidebar?: string;
  content?: string;
  title: string;
  paragraph: string;
  button: string;
  card: string;
  productGrid: string;
  productCard: string;
}

const getThemeStyles = (theme: ThemeType): ThemeStyles => {
  const baseTransition = 'transition-all duration-500 ease-in-out';
  
  switch (theme) {
    case 'theme1':
      return {
        container: `min-h-screen bg-gray-50 text-gray-900 font-sans ${baseTransition}`,
        header: `fixed top-0 w-full bg-white shadow-sm border-b border-gray-200 z-50 ${baseTransition}`,
        headerContent: 'max-w-6xl mx-auto px-4 py-4 flex justify-between items-center',
        logo: 'text-xl font-medium text-gray-900',
        dropdown: 'relative',
        dropdownButton: 'flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors',
        dropdownMenu: 'absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2',
        nav: 'flex space-x-6',
        navButton: 'flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors',
        main: 'pt-20 max-w-4xl mx-auto px-4 py-8',
        title: 'text-3xl font-light mb-6 text-gray-800',
        paragraph: 'text-base leading-relaxed mb-6 text-gray-600',
        button: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium',
        card: 'bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4',
        productGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8',
        productCard: 'bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow'
      };
    
    case 'theme2':
      return {
        container: `min-h-screen bg-gray-900 text-gray-100 font-serif ${baseTransition}`,
        header: `fixed top-0 w-full bg-gray-800 shadow-lg border-b border-gray-700 z-50 ${baseTransition}`,
        headerContent: 'max-w-6xl mx-auto px-4 py-4 flex justify-between items-center',
        logo: 'text-2xl font-bold text-yellow-400',
        dropdown: 'relative',
        dropdownButton: 'flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-gray-100',
        dropdownMenu: 'absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-600 py-2',
        nav: 'flex space-x-6',
        navButton: 'flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-yellow-400 transition-colors',
        main: 'pt-20 flex',
        sidebar: 'w-64 bg-gray-800 min-h-screen p-6 fixed left-0 top-20',
        content: 'ml-64 flex-1 p-8',
        title: 'text-4xl font-bold mb-8 text-yellow-400',
        paragraph: 'text-lg leading-relaxed mb-8 text-gray-300 font-light',
        button: 'px-8 py-4 bg-yellow-600 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-bold text-lg',
        card: 'bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 mb-6',
        productGrid: 'grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8',
        productCard: 'bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-yellow-600 transition-colors'
      };
    
    case 'theme3':
      return {
        container: `min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 text-gray-800 ${baseTransition}`,
        header: `fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-pink-200 z-50 ${baseTransition}`,
        headerContent: 'max-w-6xl mx-auto px-4 py-4 flex justify-between items-center',
        logo: 'text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent',
        dropdown: 'relative',
        dropdownButton: 'flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg',
        dropdownMenu: 'absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-pink-200 py-2',
        nav: 'flex space-x-4',
        navButton: 'flex items-center space-x-2 px-4 py-2 text-purple-600 hover:bg-purple-100 rounded-full transition-colors',
        main: 'pt-20 max-w-6xl mx-auto px-4 py-8',
        title: 'text-5xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent text-center',
        paragraph: 'text-lg leading-relaxed mb-8 text-center max-w-2xl mx-auto text-gray-700',
        button: 'px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg font-bold text-lg transform hover:scale-105',
        card: 'bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50 mb-6 hover:bg-white/70 transition-all',
        productGrid: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12',
        productCard: 'bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300'
      };
    
    default:
      return getThemeStyles('theme1');
  }
};

// Header Component
const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { navigate, currentPage } = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const styles = getThemeStyles(theme);

  const themes = [
    { id: 'theme1' as ThemeType, name: 'Light' },
    { id: 'theme2' as ThemeType, name: 'Dark' },
    { id: 'theme3' as ThemeType, name: 'Colorful' }
  ];

  const navItems = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'about', name: 'About', icon: Info },
    { id: 'contact', name: 'Contact', icon: Mail }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <ShoppingBag className="inline-block mr-2" size={24} />
          ThemeStore
        </div>
        
        <nav className={styles.nav}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`${styles.navButton} ${currentPage === item.id ? 'font-bold' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className={styles.dropdown}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={styles.dropdownButton}
          >
            <span>{themes.find(t => t.id === theme)?.name}</span>
            <ChevronDown size={16} />
          </button>
          
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              {themes.map(themeOption => (
                <button
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${theme === 'theme2' ? 'hover:bg-gray-700' : ''} ${theme === 'theme3' ? 'hover:bg-purple-100' : ''} transition-colors`}
                >
                  {themeOption.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Product Hook
const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  return (
    <div className={styles.productCard}>
      <img 
        src={product.image} 
        alt={product.title}
        className="w-full h-48 object-contain mb-4 rounded-lg"
      />
      <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.title}</h3>
      <p className="text-sm opacity-75 mb-3 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">${product.price}</span>
        <div className="flex items-center space-x-1">
          <Star size={16} className="fill-current text-yellow-500" />
          <span className="text-sm">{product.rating.rate}</span>
        </div>
      </div>
    </div>
  );
};

// Home Page
const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);
  const { products, loading, error } = useProducts();

  if (theme === 'theme2') {
    return (
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <h3 className="text-xl font-bold mb-4 text-yellow-400">Categories</h3>
          <ul className="space-y-2">
            {['Electronics', 'Clothing', 'Books', 'Home & Garden'].map(category => (
              <li key={category}>
                <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 rounded transition-colors">
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>Welcome to ThemeStore</h1>
          <p className={styles.paragraph}>
            Experience the power of dynamic theming with our multi-theme switcher application. 
            This dark theme features a bold sidebar layout with serif typography for a sophisticated reading experience.
          </p>
          <button className={styles.button}>Explore Products</button>
          
          <div className={styles.card}>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Featured Products</h2>
            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-400">Error: {error}</p>}
            <div className={styles.productGrid}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to ThemeStore</h1>
      <p className={styles.paragraph}>
        Experience the power of dynamic theming with our multi-theme switcher application. 
        Switch between different themes to see how layout, typography, and colors transform the entire user experience.
      </p>
      <div className="text-center mb-8">
        <button className={styles.button}>Explore Products</button>
      </div>
      
      <div className={styles.card}>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'theme3' ? 'text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent' : ''}`}>
          Featured Products
        </h2>
        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        <div className={styles.productGrid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

// About Page
const AboutPage: React.FC = () => {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  const content = (
    <>
      <h1 className={styles.title}>About ThemeStore</h1>
      <p className={styles.paragraph}>
        ThemeStore is a demonstration of advanced React theming capabilities. Built with TypeScript, 
        Context API, and modern React patterns, this application showcases how different themes can 
        completely transform user experience.
      </p>
      <div className={styles.card}>
        <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
        <ul className="space-y-2">
          <li>• React 18 with TypeScript</li>
          <li>• Context API for state management</li>
          <li>• Tailwind CSS for styling</li>
          <li>• FakeStore API integration</li>
          <li>• LocalStorage for persistence</li>
          <li>• Responsive design patterns</li>
        </ul>
      </div>
      <div className={styles.card}>
        <h2 className="text-2xl font-bold mb-4">Theme Features</h2>
        <p className="mb-4">Each theme offers unique characteristics:</p>
        <ul className="space-y-2">
          <li>• <strong>Theme 1:</strong> Clean minimalist design with light colors</li>
          <li>• <strong>Theme 2:</strong> Dark mode with sidebar navigation</li>
          <li>• <strong>Theme 3:</strong> Vibrant gradients with playful animations</li>
        </ul>
      </div>
    </>
  );

  if (theme === 'theme2') {
    return (
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <h3 className="text-xl font-bold mb-4 text-yellow-400">Navigation</h3>
          <ul className="space-y-2">
            {['Company', 'Team', 'Mission', 'Values'].map(item => (
              <li key={item}>
                <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 rounded transition-colors">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    );
  }

  return <main className={styles.main}>{content}</main>;
};

// Contact Page
const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const styles = getThemeStyles(theme);

  const content = (
    <>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.paragraph}>
        Get in touch with our team for any questions, feedback, or collaboration opportunities.
      </p>
      <div className={styles.card}>
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail size={20} />
            <span>contact@themestore.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <User size={20} />
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <h2 className="text-2xl font-bold mb-4">Send Message</h2>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea 
            placeholder="Your Message" 
            rows={4}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
          <button type="button" className={styles.button}>
            Send Message
          </button>
        </div>
      </div>
    </>
  );

  if (theme === 'theme2') {
    return (
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <h3 className="text-xl font-bold mb-4 text-yellow-400">Quick Links</h3>
          <ul className="space-y-2">
            {['Support', 'Sales', 'Partnership', 'Careers'].map(item => (
              <li key={item}>
                <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 rounded transition-colors">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    );
  }

  return <main className={styles.main}>{content}</main>;
};

// Main App Component
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </ThemeProvider>
  );
};

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const { currentPage } = useRouter();
  const styles = getThemeStyles(theme);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      {renderPage()}
    </div>
  );
};

export default App;