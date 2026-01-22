import React, { useState, useEffect, useContext, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Globe, 
  Download, 
  RefreshCw, 
  Info, 
  Check,
  X,
  Settings,
  Image as ImageIcon,
  Sun,
  Moon
} from 'lucide-react';

import sneak from './assets/sneak.gif'
import sk from './assets/sk.png'
import dsk from './assets/dsk.gif'
import homo from './assets/homo.png'
import hip from './assets/hip.gif'
import temple from './assets/temple.png'
import trump from './assets/trump.png'
import head from './assets/head.png'
import dhead from './assets/dhead.gif'
import litang from './assets/litang.png'

const ThemeContext = createContext({ isDark: false });

class GenContentProfile {
    constructor(img, name, hasBG, hasHead, hasSpeed, hasPitch, hasModel) {
        this.img = img;
        this.name = name;
        this.hasBG = hasBG;
        this.hasHead = hasHead;
        this.hasSpeed = hasSpeed;
        this.hasPitch = hasPitch;
        this.hasModel = hasModel;
    }
}

const allContents = [
    new GenContentProfile(sneak, 'sneak', true, true, true, false, true),
    new GenContentProfile(dsk, 'dsk', true, true, true, true, true),
    new GenContentProfile(sk, 'sk', true, true, false, false, true),
    new GenContentProfile(trump, 'trump', false, true, false, false, true),
    new GenContentProfile(homo, 'homo', false, true, false, false, true),
    new GenContentProfile(temple, 'temple', false, true, false, false, true),
    new GenContentProfile(litang, 'litang', false, true, false, false, true),
    new GenContentProfile(dhead, 'dhead', false, true, true, true, false),
    new GenContentProfile(head, 'head', false, true, false, false, false),
    new GenContentProfile(hip, 'hip', true, true, true, false, true),
];

const Button = ({ children, onClick, disabled, variant = 'primary', className = '', icon: Icon }) => {
  const { isDark } = useContext(ThemeContext);
  
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: isDark 
      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500 focus:ring-offset-slate-900"
      : "bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm focus:ring-emerald-600",
      
    secondary: isDark 
      ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-sm focus:ring-slate-600 focus:ring-offset-slate-900"
      : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm focus:ring-slate-400",
      
    text: isDark 
      ? "text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/20"
      : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50",
      
    icon: isDark 
      ? "p-2 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-emerald-400 rounded-full aspect-square"
      : "p-2 bg-transparent text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-full aspect-square"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={18} className={children ? "mr-2" : ""} />}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', active = false, onClick }) => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <div 
      onClick={onClick}
      className={`
        relative rounded-xl overflow-hidden transition-all duration-200 h-full
        ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}
        ${active 
          ? 'ring-2 ring-emerald-500 border-transparent shadow-md' 
          : `border shadow-sm ${isDark ? 'hover:border-emerald-500/30' : 'hover:shadow-md hover:border-emerald-200'}`}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder, type = "text", className = "" }) => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className={`text-xs font-semibold ml-1 uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-lg transition-all shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-2 
          ${isDark 
            ? 'bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500 focus:ring-emerald-900/30' 
            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-emerald-100'}`}
      />
    </div>
  );
};

const Slider = ({ value, min, max, step, onChange, label, displayValue }) => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <div className="w-full py-3">
      <div className="flex justify-between mb-2">
        <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{label}</span>
        <span className={`text-sm font-mono px-2 py-0.5 rounded text-xs border 
          ${isDark 
            ? 'text-emerald-400 bg-emerald-900/30 border-emerald-800' 
            : 'text-emerald-600 bg-emerald-50 border-emerald-100'}`}>
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-700 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
      />
    </div>
  );
};

const Switch = ({ checked, onChange, label }) => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <label className="inline-flex items-center cursor-pointer group select-none">
      <span className={`mr-3 text-sm font-medium transition-colors ${isDark ? 'text-slate-300 group-hover:text-slate-100' : 'text-slate-600 group-hover:text-slate-900'}`}>{label}</span>
      <div className="relative">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
        <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-2 transition-colors
          ${isDark 
            ? 'bg-slate-700 peer-focus:ring-emerald-800 after:border-slate-600' 
            : 'bg-slate-200 peer-focus:ring-emerald-300 after:border-gray-300'} 
          peer-checked:bg-emerald-600 
          peer-checked:after:translate-x-full peer-checked:after:border-white 
          after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}>
        </div>
      </div>
    </label>
  );
};

const ColorPicker = ({ color, onChange, active }) => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <div className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all duration-200 
      ${active 
        ? (isDark ? 'bg-slate-800 border-slate-600 shadow-sm' : 'bg-white border-slate-300 shadow-sm') 
        : (isDark ? 'bg-slate-900 border-slate-800 opacity-50 grayscale' : 'bg-slate-50 border-slate-200 opacity-50 grayscale')}`}>
      <div className={`relative w-8 h-8 rounded-md overflow-hidden border shadow-sm cursor-pointer hover:scale-105 transition-transform ${isDark ? 'border-slate-600' : 'border-slate-200'}`}>
        <input 
          type="color" 
          value={color} 
          onChange={onChange} 
          disabled={!active}
          className="absolute -top-4 -left-4 w-16 h-16 cursor-pointer p-0 border-0" 
        />
      </div>
      <input 
        type="text" 
        value={color} 
        onChange={onChange}
        disabled={!active}
        className={`w-20 bg-transparent text-sm font-mono focus:outline-none uppercase ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
      />
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  const { isDark } = useContext(ThemeContext);
  
  if (!isOpen) return null;
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200 ${isDark ? 'bg-black/60' : 'bg-slate-900/20'}`}>
      <div className={`border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ring-1 
        ${isDark ? 'bg-slate-800 border-slate-700 ring-white/10' : 'bg-white border-slate-200 ring-slate-900/5'}`}>
        
        <div className={`flex justify-between items-center p-4 border-b ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/50'}`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{title}</h3>
          <button onClick={onClose} className={`p-1 rounded-full transition-colors ${isDark ? 'hover:bg-slate-700 text-slate-400 hover:text-slate-200' : 'hover:bg-slate-200 text-slate-500 hover:text-slate-800'}`}>
            <X size={20} />
          </button>
        </div>
        
        <div className={`p-6 max-h-[70vh] overflow-y-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {children}
        </div>
        
        <div className={`p-4 border-t flex justify-end ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};


export default function App() {
    const { t, i18n } = useTranslation();
    
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const isDark = theme === 'dark';

    const [imgSrc, setImgSrc] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [warnMsg, setWarnMsg] = useState("");
    const [genContent, setGenContent] = useState("sneak");
    const [userId, setUserId] = useState("");
    const [lastGen, setLastGen] = useState(new Date().getTime());
    const [isStatic, setIsStatic] = useState(false);
    
    const [background, setBackground] = useState('#ffffff');
    const [transparentBG, setTransparentBG] = useState(false);
    const [light, setLight] = useState('#ffffff');
    const [ignoreLight, setIgnoreLight] = useState(false);
    const [headSize, setHeadSize] = useState(1);
    const [speed, setSpeed] = useState(1);
    const [pitch, setPitch] = useState(0);
    const [slim, setSlim] = useState(0);
    
    const [aboutOpen, setAboutOpen] = useState(false);

    const currentGenProfile = allContents.find(c => c.name === genContent) || allContents[0];

    useEffect(() => {
        setTransparentBG(false);
        setIgnoreLight(false);
    }, [genContent]);

    async function parseGen(res) {
        try {
            if (res.status !== 200) {
                setImgSrc("");
                switch (res.status) {
                    case 400:
                    case 429:
                        setWarnMsg(t("warning.too_fast"));
                        break;
                    case 404:
                    case 500:
                        setErrorMsg(t("error.failed"));
                        break;
                    case 503:
                        setErrorMsg(t("error.network"));
                        break;
                    default:
                        setErrorMsg(t("error.unknown"));
                        break;
                }
                return;
            }

            const blob = await res.blob();
            setIsStatic(blob.type === "image/png");
            const url = URL.createObjectURL(blob);
            setLastGen(new Date().getTime());
            setImgSrc(url)
            setErrorMsg("");
            setWarnMsg("");
        } catch {
            setErrorMsg(t("error.unknown"));
        }
    }

    function handleGen() {
        if (new Date().getTime() - lastGen < 1000) {
            setWarnMsg(t("warning.too_fast"));
            return;
        }
        setImgSrc("loading") 
        setErrorMsg("")
        setWarnMsg("")
        
        const parsedBG = transparentBG ? "0x00000000" : background.replace("#", "0x");
        const parsedLight = ignoreLight ? "0xFFFFFFFF" : light.replace("#", "0x");
        let args = `bg=${parsedBG}&light=${parsedLight}&head=${headSize}&x=${1 / speed * 20}&y=${pitch}`;

        if (slim !== 0) {
            args += `&t=${slim === 2}`;
        }

        if (genContent === "sneak") {
            args += "&duration=" + (Math.round((100 / speed) / 10) * 10).toString();
        } else args += "&duration=100"

        fetch(`/api/render/?name=${userId}&pose=${genContent}&${args}`).then(parseGen);
    }

    async function handleRefresh() {
        try {
            if (userId.trim() === "") return;
            setImgSrc("loading");
            const res = await fetch(`/refresh/name/${userId}`)
            if (res.status !== 204) {
                setErrorMsg(t("error.refresh_failed"));
                return;
            }
            handleGen();
        } catch {
            setErrorMsg(t("error.refresh_failed"));
        }
    }

    function handleDownload() {
        if (!imgSrc || imgSrc === "loading" || errorMsg !== "") {
            setWarnMsg(t("warning.no_content"));
            return;
        }
        const fileName = "mcgif" + (isStatic ? ".png" : ".gif");
        const link = document.createElement("a");
        link.href = imgSrc;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const languages = [
        { code: 'zh-CN', name: '简体中文' },
        { code: 'zh-TW', name: '繁體中文' },
        { code: 'en', name: 'English' },
        { code: 'ja', name: '日本語' },
        { code: 'ko', name: '한국어' },
        { code: 'de', name: 'Deutsch' },
        { code: 'ru', name: 'русский язык' }
    ];

    const scrollbarStyles = `
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background-color: ${isDark ? '#334155' : '#cbd5e1'}; /* slate-700 : slate-300 */
            border-radius: 9999px;
            border: 2px solid transparent;
            background-clip: content-box;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: ${isDark ? '#475569' : '#94a3b8'}; /* slate-600 : slate-400 */
        }
        /* Firefox 适配 */
        * {
            scrollbar-width: thin;
            scrollbar-color: ${isDark ? '#334155 transparent' : '#cbd5e1 transparent'};
        }
    `;

    return (
        <ThemeContext.Provider value={{ isDark }}>
            <style>{scrollbarStyles}</style>
            
            <div className={`min-h-screen font-sans transition-colors duration-300 
                ${isDark 
                  ? 'bg-slate-950 text-slate-100 selection:bg-emerald-900 selection:text-emerald-100' 
                  : 'bg-slate-50 text-slate-800 selection:bg-emerald-100 selection:text-emerald-900'
                }`}>
                
                <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 
                    ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img 
                                src="/mcgif.svg" 
                                alt="Logo" 
                                className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-300" 
                            />
                            <h1 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {t('title')}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <button 
                                onClick={() => setAboutOpen(true)}
                                className={`hidden md:block text-sm font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}
                            >
                                {t('about')}
                            </button>
                            
                            <div className={`h-6 w-px hidden md:block ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>

                            <button 
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800' : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-100'}`}
                                aria-label="Toggle theme"
                            >
                                {isDark ? <Moon size={20} /> : <Sun size={20} />}
                            </button>

                            <div className="relative group">
                                <button className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800' : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-100'}`}>
                                    <Globe size={20} />
                                </button>
                                
                                <div className={`absolute right-0 top-full mt-2 w-36 border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 overflow-hidden ring-1 ring-black/5 
                                    ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                                    {languages.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => i18n.changeLanguage(lang.code)}
                                            className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between 
                                                ${i18n.language === lang.code 
                                                    ? (isDark ? 'text-emerald-400 font-medium bg-emerald-900/20' : 'text-emerald-600 font-medium bg-emerald-50') 
                                                    : (isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-50')}`}
                                        >
                                            {lang.name}
                                            {i18n.language === lang.code && <Check size={14} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                    
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className={`text-lg font-semibold flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                                {t('gen.title')}
                            </h2>
                        </div>

                        <div className={`flex gap-4 overflow-x-auto pb-4 px-1 snap-x`}>
                            {allContents.map((content) => (
                                <div 
                                    key={content.name} 
                                    className="flex-none w-24 sm:w-28 md:w-32 snap-start"
                                >
                                    <Card 
                                        onClick={() => setGenContent(content.name)}
                                        active={genContent === content.name}
                                        className="group h-full flex flex-col"
                                    >
                                        <div className={`aspect-[2/3] w-full overflow-hidden relative ${isDark ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
                                            <img 
                                                src={content.img} 
                                                alt={t(`gen.${content.name}`)}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                            />
                                            {genContent === content.name && (
                                                <div className="absolute inset-0 ring-inset ring-2 ring-emerald-500 rounded-xl pointer-events-none"></div>
                                            )}
                                        </div>
                                        <div className={`p-2 text-center border-t flex-1 flex items-center justify-center ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                                            <span className={`text-xs sm:text-sm font-medium leading-tight ${genContent === content.name ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-slate-300' : 'text-slate-600')}`}>
                                                {t(`gen.${content.name}`)}
                                            </span>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        <div className="lg:col-span-5 space-y-6">
                            <Card className="p-6 h-full">
                                <div className={`flex items-center gap-2 mb-4 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                                    <Settings size={20} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                                    <h3 className="font-semibold">{t('config.title')}</h3>
                                </div>

                                <div className="flex gap-3 mb-8">
                                    <Input 
                                        label={t('gen.id')}
                                        placeholder="Steve"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        className="flex-1"
                                    />
                                    <div className="flex items-end">
                                        <Button 
                                            onClick={handleGen} 
                                            disabled={!userId.trim() || imgSrc === "loading"}
                                            className={`h-[42px] px-6 ${isDark ? 'shadow-none' : 'shadow-emerald-100'}`}
                                        >
                                            {t('gen.apply')}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className={`space-y-4 transition-opacity duration-300 ${currentGenProfile.hasBG ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t('config.bg')}</span>
                                            <div className="flex items-center gap-4">
                                                <ColorPicker color={background} onChange={e => setBackground(e.target.value)} active={!transparentBG} />
                                                <Switch 
                                                    label={t('config.transparent')} 
                                                    checked={transparentBG} 
                                                    onChange={e => setTransparentBG(e.target.checked)} 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t('config.light')}</span>
                                            <div className="flex items-center gap-4">
                                                <ColorPicker color={light} onChange={e => setLight(e.target.value)} active={!ignoreLight} />
                                                <Switch 
                                                    label={t('config.transparent')} 
                                                    checked={ignoreLight} 
                                                    onChange={e => setIgnoreLight(e.target.checked)} 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`pt-2 border-t ${isDark ? 'border-slate-700' : 'border-slate-100'} ${currentGenProfile.hasHead ? '' : 'opacity-40 pointer-events-none grayscale'}`}>
                                        <Slider 
                                            label={t('config.head')} 
                                            value={headSize} 
                                            min={0} max={5} step={0.1} 
                                            onChange={e => setHeadSize(Number(e.target.value))}
                                            displayValue={`${Math.round(headSize * 100)}%`}
                                        />
                                    </div>

                                    <div className={currentGenProfile.hasSpeed ? '' : 'opacity-40 pointer-events-none grayscale'}>
                                        <Slider 
                                            label={t('config.speed')} 
                                            value={speed} 
                                            min={0.1} max={5} step={0.1} 
                                            onChange={e => setSpeed(Number(e.target.value))}
                                            displayValue={`${Math.round(speed * 100)}%`}
                                        />
                                    </div>

                                    <div className={currentGenProfile.hasPitch ? '' : 'opacity-40 pointer-events-none grayscale'}>
                                        <Slider 
                                            label={t('config.pitch')} 
                                            value={pitch} 
                                            min={0} max={360} step={1} 
                                            onChange={e => setPitch(Number(e.target.value))}
                                            displayValue={`${pitch}°`}
                                        />
                                    </div>

                                    {currentGenProfile.hasModel && (
                                        <div className={`border p-4 rounded-xl flex items-center justify-between mt-4 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                                            <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t('config.slim')}</span>
                                            <div className={`flex gap-2 p-1 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                                                {[0, 1, 2].map(v => (
                                                    <button
                                                        key={v}
                                                        onClick={() => setSlim(v)}
                                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all 
                                                            ${slim === v 
                                                                ? (isDark ? 'bg-emerald-900/30 text-emerald-400 ring-1 ring-emerald-800' : 'bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-200') 
                                                                : (isDark ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-50')}`}
                                                    >
                                                        {t(`model.${v === 0 ? 'default' : v === 1 ? 'standard' : 'slim'}`)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>

                        <div className="lg:col-span-7">
                            <Card className={`h-full min-h-[600px] flex flex-col p-0 border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
                                <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                                    <h3 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{t('message.view')}</h3>
                                    <div className="flex gap-2">
                                        <Button variant="text" onClick={handleRefresh} icon={RefreshCw}>
                                            {t('message.refresh')}
                                        </Button>
                                        <Button variant="secondary" onClick={handleDownload} disabled={!imgSrc || imgSrc === "loading"} icon={Download}>
                                            Download
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className={`flex-1 relative flex items-center justify-center p-8 transition-colors duration-300 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50/50'}`}
                                     style={{
                                         backgroundImage: isDark 
                                            ? 'radial-gradient(#334155 1px, transparent 1px)' 
                                            : 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                                         backgroundSize: '24px 24px'
                                     }}>
                                    
                                    {imgSrc === "loading" ? (
                                        <div className="text-center">
                                            <div className={`w-12 h-12 border-4 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4 ${isDark ? 'border-emerald-900 border-t-emerald-500' : 'border-emerald-200'}`}></div>
                                            <p className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-medium`}>{t('message.warn1')}</p>
                                        </div>
                                    ) : imgSrc ? (
                                        <div className="relative group p-4">
                                            <img 
                                                src={imgSrc} 
                                                alt="Result" 
                                                className="max-h-[500px] w-auto object-contain drop-shadow-2xl rounded-lg transform transition-transform group-hover:scale-[1.02] duration-300" 
                                            />
                                        </div>
                                    ) : errorMsg ? (
                                        <div className={`text-center px-8 py-6 rounded-xl border ${isDark ? 'bg-red-900/20 border-red-900/30 text-red-500' : 'bg-red-50 border-red-100 text-red-500'}`}>
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border ${isDark ? 'bg-red-900/50 border-red-800' : 'bg-white border-red-100'}`}>
                                                <Info size={24} className={isDark ? 'text-red-400' : 'text-red-500'} />
                                            </div>
                                            <p className="font-medium">{errorMsg}</p>
                                        </div>
                                    ) : (
                                        <div className={`text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border shadow-sm ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                                                <ImageIcon size={40} className={isDark ? 'text-slate-600' : 'text-slate-300'} />
                                            </div>
                                            <p className={`text-lg font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('message.info')}</p>
                                            <p className={`text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Enter your ID on the left to start</p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </main>

                <footer className={`border-t mt-12 py-12 transition-colors duration-300 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                    <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
                        <div className={`flex justify-center gap-8 text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            <a href="https://www.mcnav.net/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'}`}>
                                {t('footer.friends.mcnav')}
                            </a>
                            <a href="https://mccag.cn" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'}`}>
                                {t('footer.friends.mccag')}
                            </a>
                            <a href="https://o.xbottle.top/mcsounds/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'}`}>
                                {t('footer.friends.sounds')}
                            </a>
                        </div>
                        <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            <p>{t('footer.disclaimer')}</p>
                            <p className="mt-2">{t('footer.dev')}</p>
                        </div>
                    </div>
                </footer>

                <Modal 
                    isOpen={aboutOpen} 
                    onClose={() => setAboutOpen(false)} 
                    title={t('about')}
                >
                    <div className={`prose prose-sm ${isDark ? 'prose-invert text-slate-300' : 'prose-slate text-slate-600'}`}>
                        <p className="whitespace-pre-line leading-relaxed">
                            {t('description')}
                        </p>
                    </div>
                </Modal>
            </div>
        </ThemeContext.Provider>
    );
}