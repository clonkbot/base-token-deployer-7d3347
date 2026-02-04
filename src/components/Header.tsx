import { useState, useEffect } from 'react';

const ASCII_LOGO = `
╔═══════════════════════════════════════════════════════════════╗
║  ████████╗ ██████╗ ██╗  ██╗███████╗███╗   ██╗                 ║
║  ╚══██╔══╝██╔═══██╗██║ ██╔╝██╔════╝████╗  ██║                 ║
║     ██║   ██║   ██║█████╔╝ █████╗  ██╔██╗ ██║                 ║
║     ██║   ██║   ██║██╔═██╗ ██╔══╝  ██║╚██╗██║                 ║
║     ██║   ╚██████╔╝██║  ██╗███████╗██║ ╚████║                 ║
║     ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝                 ║
║  ██████╗ ███████╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗██████╗ ║
║  ██╔══██╗██╔════╝██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔══██╗║
║  ██║  ██║█████╗  ██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  ██████╔╝║
║  ██║  ██║██╔══╝  ██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══██╗║
║  ██████╔╝███████╗██║     ███████╗╚██████╔╝   ██║   ███████╗██║  ██║║
║  ╚═════╝ ╚══════╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝║
╚═══════════════════════════════════════════════════════════════╝
`;

function Header() {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const text = '> DEPLOY ERC-20 TOKENS ON BASE CHAIN';
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <header className="relative">
      {/* ASCII Logo */}
      <pre
        className="text-[6px] sm:text-[8px] md:text-[10px] leading-none text-center overflow-hidden"
        style={{
          color: 'var(--neon-blue)',
          textShadow: '0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue)',
          animation: 'flicker 8s infinite',
        }}
      >
        {ASCII_LOGO}
      </pre>

      {/* Subtitle with typing effect */}
      <div className="mt-4 text-center">
        <p
          className="text-sm md:text-base font-mono"
          style={{
            color: 'var(--neon-green)',
            textShadow: '0 0 5px var(--neon-green)',
          }}
        >
          {displayText}
          <span
            style={{
              opacity: cursorVisible ? 1 : 0,
              transition: 'opacity 0.1s',
            }}
          >
            █
          </span>
        </p>
      </div>

      {/* Network badge */}
      <div className="flex justify-center mt-6 gap-4">
        <div
          className="px-4 py-2 border rounded relative overflow-hidden"
          style={{
            borderColor: 'var(--neon-blue)',
            background: 'rgba(0, 240, 255, 0.05)',
          }}
        >
          <span
            className="text-xs uppercase tracking-wider"
            style={{ color: 'var(--neon-blue)' }}
          >
            ◆ Base Chain
          </span>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--neon-blue), transparent)',
              animation: 'border-flow 3s linear infinite',
              backgroundSize: '200% 100%',
            }}
          />
        </div>
        <div
          className="px-4 py-2 border rounded"
          style={{
            borderColor: 'var(--text-muted)',
            background: 'rgba(102, 102, 128, 0.1)',
          }}
        >
          <span className="text-xs uppercase tracking-wider text-gray-500">
            ◇ Testnet Mode
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
