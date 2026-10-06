import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Camera,
  Paperclip,
  Mic,
  MicOff,
  X,
  FileText,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react';

interface ChatComposerProps {
  onSendMessage: (
    text: string,
    file?: { name: string; type: string; base64?: string; previewUrl?: string; size?: string }
  ) => void;
  isLoading: boolean;
  onSelectSuggestion?: (prompt: string) => void;
  showSuggestions?: boolean;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  onSendMessage,
  isLoading,
  onSelectSuggestion,
  showSuggestions = false,
}) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);

  // Attached file or captured image
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    type: string;
    base64?: string;
    previewUrl?: string;
    size?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Suggested prompts
  const suggestedPrompts = [
    'My online payment was fraudulent',
    'My employer has not paid my salary',
    'I received a legal notice',
    'My landlord refuses to return my deposit',
    'I bought a defective product',
    'I have a business dispute',
  ];

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechNotice('Listening... Speak clearly in your own words.');
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setSpeechNotice('Speech recognition was stopped or encountered an issue.');
        setTimeout(() => setSpeechNotice(null), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setSpeechNotice(null);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      setSpeechSupported(false);
    }
  }, []);

  const handleToggleMic = () => {
    if (!speechSupported || !recognitionRef.current) {
      setSpeechNotice("Voice input isn't supported by this browser.");
      setTimeout(() => setSpeechNotice(null), 3500);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const isImg = file.type.startsWith('image/');
      setSelectedFile({
        name: file.name,
        type: file.type || 'application/octet-stream',
        base64: isImg ? base64 : undefined,
        previewUrl: isImg ? base64 : undefined,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSend = () => {
    if ((!text.trim() && !selectedFile) || isLoading) return;
    onSendMessage(text.trim(), selectedFile || undefined);
    setText('');
    setSelectedFile(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Auto-grow
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="border-t border-[#E3E1D9] bg-[#FAF9F5] p-3 sm:p-4 transition-all">
      {/* Suggested Prompts if empty */}
      {showSuggestions && (
        <div className="mb-3 overflow-x-auto pb-1.5 scrollbar-thin">
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-1.5 font-medium">
            <span>Suggested scenarios:</span>
          </div>
          <div className="flex items-center gap-2 flex-nowrap">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelectSuggestion && onSelectSuggestion(prompt)}
                className="whitespace-nowrap px-3 py-1.5 text-xs rounded-full bg-white border border-[#D5D3CB] text-[#374151] hover:border-[#1F242C] hover:text-[#111827] transition-colors shrink-0 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Voice Status Indicator Banner */}
      {speechNotice && (
        <div className="mb-2.5 p-2 rounded-lg bg-stone-100 border border-stone-300 text-xs text-stone-800 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            {isListening && (
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
            )}
            <span>{speechNotice}</span>
          </div>
          <button
            onClick={() => setSpeechNotice(null)}
            className="text-stone-500 hover:text-stone-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* File Preview Chip */}
      {selectedFile && (
        <div className="mb-2.5 inline-flex items-center gap-2 bg-white border border-[#D5D3CB] p-2 rounded-lg shadow-xs text-xs">
          {selectedFile.previewUrl ? (
            <img
              src={selectedFile.previewUrl}
              alt="Uploaded Preview"
              className="w-8 h-8 rounded object-cover border border-[#E5E7EB]"
            />
          ) : (
            <div className="w-8 h-8 rounded bg-[#F4F3EE] flex items-center justify-center text-[#4B5563]">
              <FileText className="w-4 h-4" />
            </div>
          )}
          <div className="flex flex-col text-left">
            <span className="font-semibold text-[#111827] max-w-[200px] truncate">
              {selectedFile.name}
            </span>
            <span className="text-[10px] text-[#6B7280]">{selectedFile.size}</span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedFile(null)}
            className="p-1 text-[#9CA3AF] hover:text-red-600 rounded-full transition-colors ml-2"
            title="Remove attachment"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Composer Box */}
      <div className="flex items-end gap-1.5 sm:gap-2 bg-white rounded-xl border border-[#D5D3CB] p-1.5 sm:p-2 focus-within:border-[#1F242C] focus-within:ring-1 focus-within:ring-[#1F242C]/20 shadow-xs transition-all">
        {/* Hidden inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Camera Button */}
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          title="Capture or select photo/document"
          className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F3EE] rounded-lg transition-colors shrink-0"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Attachment Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Attach Document (PDF, DOCX, JPG, PNG)"
          className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F3EE] rounded-lg transition-colors shrink-0"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        {/* Multiline Text Input */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Explain what happened in your own words... (e.g., 'My landlord refuses to return my deposit')"
          rows={1}
          disabled={isLoading}
          className="flex-1 bg-transparent resize-none border-0 p-1.5 text-xs sm:text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-0 focus:outline-none min-h-[36px] max-h-[120px] leading-relaxed"
        />

        {/* Microphone Button */}
        <button
          type="button"
          onClick={handleToggleMic}
          title={isListening ? 'Stop listening' : 'Speak your legal question'}
          className={`p-2 rounded-lg transition-all shrink-0 ${
            isListening
              ? 'bg-red-50 text-red-700 animate-pulse border border-red-300'
              : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F3EE]'
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4 text-red-600" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={(!text.trim() && !selectedFile) || isLoading}
          className={`p-2 rounded-lg transition-all shrink-0 ${
            text.trim() || selectedFile
              ? 'bg-[#1F242C] text-white hover:bg-black shadow-xs'
              : 'bg-[#EAE8E0] text-[#9CA3AF] cursor-not-allowed'
          }`}
          title="Send legal question"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#6B7280] mt-1.5 px-1">
        <span>You don't need to know legal terminology. Plain language is best.</span>
        <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line</span>
      </div>
    </div>
  );
};
