export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3">

      {/* Zalo */}
      <a
        href="https://zalo.me/0988043899"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        className="relative w-13 h-13 flex items-center justify-center"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-500" style={{ animationDuration: '1.8s' }} />
        <span className="absolute inset-0 rounded-full animate-ping opacity-10 bg-blue-500" style={{ animationDuration: '1.8s', animationDelay: '0.4s' }} />

        {/* Button */}
        <div className="relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ background: 'linear-gradient(145deg, #0E84E5 0%, #0068FF 100%)' }}>
          {/* Zalo SVG icon */}
          <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
            <text x="6" y="34" fontSize="28" fontWeight="900" fill="white" fontFamily="Arial Black, Arial, sans-serif">Z</text>
          </svg>
        </div>
      </a>

      {/* Phone */}
      <a
        href="tel:0988043899"
        aria-label="Gọi điện thoại"
        className="relative w-13 h-13 flex items-center justify-center"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-green-500" style={{ animationDuration: '2s' }} />
        <span className="absolute inset-0 rounded-full animate-ping opacity-10 bg-green-500" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />

        {/* Button */}
        <div className="relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ background: 'linear-gradient(145deg, #22c55e 0%, #15803d 100%)' }}>
          {/* Phone icon */}
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>
      </a>

    </div>
  );
}
