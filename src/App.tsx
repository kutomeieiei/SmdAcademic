/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Dna, FlaskConical, Atom, Calculator, Cpu, Library, HardDriveDownload, BookOpen, BadgeCheck, XCircle, ChevronDown } from 'lucide-react';
import { mockArchives } from './data/mockArchives';
import { ArchiveItem, ArchiveCategory } from './types';
import { motion, AnimatePresence } from 'motion/react';

const TypeIcon = ({ type, className, size = 24 }: { type: string, className?: string, size?: number }) => {
  // NOTE: If you decide to use Google Drive image URLs, you must use the `uc?export=view` format.
  // Instead of the share link: https://drive.google.com/file/d/FILE_ID/view
  // Use this formatted URL:     https://drive.google.com/uc?export=view&id=FILE_ID
  const getIconPath = () => {
    switch (type.toLowerCase()) {
      case 'posn': return 'https://drive.google.com/thumbnail?id=1bYZ03JwDRCJODvH9CIPRMazYqItUBrtv&sz=w400';
      case 'tcas': return 'https://drive.google.com/thumbnail?id=1eS1Q7O3FyDwqGsm64DZxN6TBrOaoUMfI';
      default: return 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=128&q=80';
    }
  };

  return (
    <img 
      src={getIconPath()} 
      alt={`${type} icon`} 
      className={`${className || ''} rounded-md object-cover`} 
      style={{ width: size, height: size }} 
      referrerPolicy="no-referrer"
      onError={(e) => {
        // Fallback to default if image fails to load (often due to Google Drive permissions)
        const target = e.target as HTMLImageElement;
        target.onerror = null; // Prevent infinite loop
        target.src = 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=128&q=80';
      }}
    />
  );
};

const DifficultyBar = ({ level }: { level: number }) => {
  return (
    <div className="flex items-center gap-1.5 shrink-0 border-l border-neutral-200 pl-3" title={`Difficulty: ${level}/5`}>
      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline">Difficulty</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <div 
            key={i} 
            className={`w-1.5 h-3 rounded-[1px] ${i <= level ? (level > 3 ? 'bg-rose-500' : level > 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-neutral-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

const handleMockDownload = (item: ArchiveItem) => {
  // Create a mock blob of data to act as the "download" file
  const element = document.createElement("a");
  const file = new Blob(
    [
      `DIGITAL ARCHIVE EXPORT\n\nID: ${item.id}\nTitle: ${item.title}\nCategory: ${item.category}\nDate Added: ${item.dateAdded}\n\nDescription: ${item.description}\n\n[End of File - Mock Archive]`
    ], 
    {type: 'text/plain'}
  );
  element.href = URL.createObjectURL(file);
  element.download = `${item.id}-${item.title.replace(/\\s+/g, '-').toLowerCase()}.txt`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  document.body.removeChild(element);
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'default' | 'year-desc' | 'year-asc' | 'difficulty-desc' | 'difficulty-asc'>('default');
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const categories: (ArchiveCategory | 'All')[] = ['All', 'Mathematics', 'Biology', 'Chemistry', 'Physics'];

  const sortOptions = [
    { id: 'default', label: 'เรียงปกติ' },
    { id: 'year-desc', label: 'Newest' },
    { id: 'year-asc', label: 'Oldest' },
    { id: 'difficulty-desc', label: 'Hardest' },
    { id: 'difficulty-asc', label: 'Easiest' },
  ];

  const filteredArchives = mockArchives.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'year-desc': return b.yearPublished - a.yearPublished;
      case 'year-asc': return a.yearPublished - b.yearPublished;
      case 'difficulty-desc': return b.difficulty - a.difficulty;
      case 'difficulty-asc': return a.difficulty - b.difficulty;
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-neutral-900 text-white p-2 rounded-lg">
                <Library size={24} />
              </div>
              <div>
                <h1 className="font-semibold text-lg leading-tight tracking-tight text-neutral-900">uunknown</h1>
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Exam Archive</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentView('home')} className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}>Home</button>
              <button onClick={() => setCurrentView('about')} className={`text-sm font-medium transition-colors ${currentView === 'about' ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}>About Me</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {currentView === 'about' ? (
          <section className="max-w-3xl mx-auto py-12 px-4 sm:px-0 flex flex-col gap-8 w-full">
            <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight">About Me</h2>
            <div className="prose prose-neutral max-w-none text-neutral-700">
              <p className="text-lg">
                ok doraymifasol
              </p>
              <div className="my-8 flex gap-4">
                <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80" alt="Library" className="rounded-xl w-1/2 object-cover" />
                <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80" alt="Books" className="rounded-xl w-1/2 object-cover" />
              </div>
              <h3>Mission</h3>
              <p>
                skibidi skibidi
              </p>
              <h3>Contact</h3>
              <p>
                tornado tornado
              </p>
            </div>
          </section>
        ) : (
          <>
        {/* Controls */}
        <section className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2 bg-neutral-200/50 p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-white text-neutral-900 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="ค้นหาข้อสอบโดยพิมพ์ ชื่อ, tag, ฯลฯ"
            className="w-full bg-white border border-neutral-300 rounded-xl py-4 pl-12 pr-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Archive Grid/List */}
        <section className="pb-24">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 border-b border-neutral-200 pb-4">
            <h3 className="text-xl font-semibold">ผลลัพธ์ ({filteredArchives.length} รายการ)</h3>
            
            <div className="flex flex-wrap gap-4 items-center">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-600 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={showDifficulty} 
                  onChange={(e) => setShowDifficulty(e.target.checked)} 
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 w-4 h-4 cursor-pointer"
                />
                เเสดงความยาก
              </label>
              <div className="relative w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="bg-white border border-neutral-200 text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 flex items-center justify-between gap-2 w-full sm:w-36 px-3 py-2 shadow-sm font-medium transition-all"
                >
                  <span>{sortOptions.find((o) => o.id === sortBy)?.label || 'เรียงปกติ'}</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-full sm:w-48 bg-white border border-neutral-200 rounded-xl shadow-lg z-20 py-1.5 overflow-hidden origin-top-right"
                      >
                        {sortOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id as any);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                              sortBy === option.id
                                ? 'bg-neutral-100 text-neutral-900 font-medium'
                                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {filteredArchives.length === 0 ? (
            <div className="text-center py-24 bg-white border border-neutral-200 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 text-neutral-500">
              <Search size={48} className="text-neutral-300" />
              <p className="text-lg">No archives found matching your criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                className="text-neutral-900 font-medium hover:underline focus:outline-none"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div 
              layout 
              className="flex flex-col gap-3"
            >
              <AnimatePresence>
                {filteredArchives.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-400 transition-colors shadow-sm focus-within:ring-2 focus-within:ring-neutral-900 p-4 sm:p-3 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="shrink-0 sm:block">
                        <div className="sm:hidden mt-0.5">
                          <TypeIcon type={item.type} size={40} />
                        </div>
                        <div className="hidden sm:block">
                          <TypeIcon type={item.type} size={48} />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-medium text-neutral-900 leading-snug truncate sm:whitespace-normal line-clamp-2">{item.title}</h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 sm:mt-1.5">
                          <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-wider shrink-0">{item.category}</span>
                          <div className="flex flex-wrap gap-1.5 shrink-0">
                            {item.tags.map(tag => (
                              <span key={tag} className="px-1.5 py-0.5 bg-neutral-100 text-neutral-600 text-[10px] font-mono rounded-md border border-neutral-200/60">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="hidden sm:block">
                            {showDifficulty && <DifficultyBar level={item.difficulty} />}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 mt-1 sm:mt-0 border-t sm:border-t-0 border-neutral-100">
                      <div className="flex items-center gap-2">
                        {!item.isOfficialSource && (
                          <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold border border-amber-200 shrink-0" title="Unofficial Source">
                            <span>ข้อสอบจากการจำ</span>
                          </div>
                        )}
                        <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded-md shrink-0 border border-neutral-200">
                          {item.yearPublished}
                        </span>
                        <div className="sm:hidden">
                          {showDifficulty && <DifficultyBar level={item.difficulty} />}
                        </div>
                      </div>
                      {item.downloadUrl ? (
                        <a
                          href={item.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-white py-2 px-3 sm:px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                          title="Download External Link"
                        >
                          <span>Download</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => handleMockDownload(item)}
                          className="flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-white py-2 px-3 sm:px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                          title="Download Mock"
                        >
                          <span>Download</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
        </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="bg-neutral-200 text-neutral-500 p-2 rounded-md">
                <Library size={20} />
              </div>
              <p className="text-neutral-500 text-sm">เว็บไซต์รวมข้อสอบของพรรค uunknown</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
