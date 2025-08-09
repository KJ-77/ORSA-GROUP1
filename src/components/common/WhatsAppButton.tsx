import React from 'react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '+32478692586'; // Your WhatsApp number
  const message = 'Hello! I have a question about your products.'; // Pre-filled message

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-8 h-8 fill-current"
      >
        {/* Font Awesome WhatsApp icon path */}
        <path d="M380.9 97.1C339.4 55.6 283.9 32 224 32S108.6 55.6 67.1 97.1 32 183.9 32 243.9c0 43.9 12.4 86.1 36 122.9L32 480l117.6-30.7c36.7 20.1 78.8 30.7 122.4 30.7 59.9 0 115.4-23.6 156.9-65.1s65.1-97.1 65.1-156.9c0-59.9-23.6-115.4-65.1-156.9zM224 432c-40.8 0-79.3-11.1-112.9-32.4l-6.9-4.1-70.5 18.5 19.5-68.4-4.5-7.2c-22.3-35.6-34.1-76.6-34.1-119.3C64 134.1 134.1 64 224 64s160 70.1 160 160c0 43.9-11.8 84.9-34.1 119.3l-4.5 7.2 19.5 68.4-70.5-18.5-6.9 4.1c-33.6 21.3-72.1 32.4-112.9 32.4zM344 288c-4.4-2.2-26.1-12.9-30.1-14.4-4-1.5-6.9-2.2-9.9 2.2-3 4.4-11.5 14.4-14.1 17.3-2.6 2.9-5.2 3.3-9.7 1.1-4.4-2.2-18.6-6.9-35.5-21.9-13.1-11.4-21.9-25.5-24.5-30-2.6-4.4-0.3-6.8 1.9-9.1 2.2-2.2 4.9-5.2 7.1-7.8 2.2-2.6 2.9-4.4 4.4-6.9 1.5-2.6 0.7-4.9-0.7-6.9-1.5-2.2-14.1-33.9-19.3-46.5-5.2-12.6-10.4-10.8-14.1-10.8-3.7 0-6.9-0.4-9.9-0.4-3 0-7.8 1.1-11.8 5.6-4 4.4-15.2 14.8-15.2 36.1 0 21.3 15.6 41.8 17.8 44.4 2.2 2.6 30.7 47.3 74.5 66.2 43.8 18.9 43.8 12.6 51.7 11.8 7.9-0.8 26.1-10.6 29.7-21.3 3.6-10.8 3.6-20.1 2.6-21.9-1.1-1.8-4-2.6-8.4-4.8z"/>
      </svg>
    </button>
  );
};

export default WhatsAppButton;


