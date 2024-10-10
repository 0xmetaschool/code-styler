'use client';
import React, { useState, useEffect, useCallback, memo } from 'react';
import { Loader2, Code2, Paintbrush, Eye, Smartphone, Tablet, Monitor, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';
import { debounce } from 'lodash';  

const PreviewFrame = memo(({ code, previewSize, previewKey }) => {
  const iframeRef = React.useRef(null);

  React.useEffect(() => {
    if (iframeRef.current) {
      const document = iframeRef.current.contentDocument;
      document.open();
      document.write(code);
      document.close();
    }
  }, [code]);

  const getPreviewWidth = () => {
    switch (previewSize) {
      case 'mobile': return '320px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
      default: return '100%';
    }
  };

  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-md" style={{ maxWidth: '100%' }}>
      <div style={{ width: getPreviewWidth(), transition: 'width 0.3s ease' }}>
        <iframe
          key={previewKey}
          ref={iframeRef}
          className="w-full h-[500px]"
          title="Preview"
        />
      </div>
    </div>
  );
});

PreviewFrame.displayName = 'PreviewFrame';

export default function Home() {
  const [inputCode, setInputCode] = useState('');
  const [designDescription, setDesignDescription] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [cssOnly, setCssOnly] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('css');
  const [previewSize, setPreviewSize] = useState('desktop');
  const [isGenerated, setIsGenerated] = useState(false);
  const [floatingInput, setFloatingInput] = useState('');
  const [previewKey, setPreviewKey] = useState(0);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/style-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: inputCode, 
          designDescription
        }),
      });

      const data = await response.json();
      
      setOutputCode(data.styledCode);
      setCssOnly(data.cssOnly);
      setActiveTab('preview');
      setIsGenerated(true);
      setShowFloatingInput(false);
      setFloatingInput('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsGenerated(false);
    setInputCode('');
    setDesignDescription('');
    setOutputCode('');
    setCssOnly('');
    setPreviousCss('');
    setActiveTab('css');
    setChangeSummary('');
  };

  const handleFloatingInputChange = (e) => {
    setFloatingInput(e.target.value);
  };

  const handleFloatingSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/update-style', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: inputCode, 
          designDescription: floatingInput,
          previousCss: cssOnly
        }),
      });

      const data = await response.json();
      
      setOutputCode(data.styledCode);
      setCssOnly(data.cssOnly);
      setActiveTab('preview');
      setFloatingInput('');
      setPreviewKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center mb-6">
            <Code2 className="w-16 h-16 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-800">
              AI Code Styler
            </h1>
          </div>
          <p className="text-gray-600 text-xl">
            Transform your HTML with responsive, cross-browser compatible CSS
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isGenerated ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="inputCode" className="block text-sm font-medium text-gray-700 mb-2">Input HTML</label>
                  <textarea
                    id="inputCode"
                    className="w-full h-[200px] p-4 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 font-mono text-sm resize-none"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Paste your HTML code here..."
                  />
                </div>
                <div>
                  <label htmlFor="designDescription" className="block text-sm font-medium text-gray-700 mb-2">Design Description</label>
                  <textarea
                    id="designDescription"
                    className="w-full h-[100px] p-4 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm resize-none"
                    value={designDescription}
                    onChange={(e) => setDesignDescription(e.target.value)}
                    placeholder="Describe your desired design (e.g., color scheme, layout preferences, etc.)..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !inputCode}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Paintbrush className="w-5 h-5" />
                      <span>Style Code</span>
                    </>
                  )}
                </button>
              </form>
              </motion.div>
          ) : (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('css')}
                      className={`py-2 px-4 font-medium ${activeTab === 'css' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Generated CSS
                    </button>
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`py-2 px-4 font-medium ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Preview
                    </button>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Start Over
                  </button>
                </div>
              </div>

              {activeTab === 'css' && (
                <div className="space-y-6">
                  <div className="relative">
                    <div className="max-h-[400px] overflow-y-auto rounded-lg border border-gray-200 shadow-inner">
                      <Highlight className="css h-full">
                        {cssOnly}
                      </Highlight>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(cssOnly)}
                      className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition duration-200 flex items-center space-x-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy CSS</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="space-y-4">
                  <div className="flex justify-end space-x-2 mb-4">
                    {[
                      { size: 'mobile', icon: Smartphone },
                      { size: 'tablet', icon: Tablet },
                      { size: 'desktop', icon: Monitor }
                    ].map(({ size, icon: Icon }) => (
                      <button
                        key={size}
                        onClick={() => setPreviewSize(size)}
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          previewSize === size ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                        title={`${size.charAt(0).toUpperCase() + size.slice(1)} view`}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                  <PreviewFrame code={outputCode} previewSize={previewSize} previewKey={previewKey} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-0 right-0 mx-auto z-10 w-full max-w-xl"
          >
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4 border-black">
              <input
                type="text"
                className="flex-grow p-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Describe additional changes..."
                value={floatingInput}
                onChange={handleFloatingInputChange}
              />
              <button
                onClick={handleFloatingSubmit}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Paintbrush className="w-5 h-5" />
                    <span>Update</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}