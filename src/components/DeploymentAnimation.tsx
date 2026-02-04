import { useState, useEffect } from 'react';
import type { TokenData } from '../App';

interface DeploymentAnimationProps {
  tokenData: TokenData;
  state: 'deploying' | 'success';
  onReset: () => void;
}

const DEPLOYMENT_STEPS = [
  { text: 'Initializing smart contract compiler...', delay: 0 },
  { text: 'Compiling ERC-20 standard interface...', delay: 600 },
  { text: 'Generating bytecode...', delay: 1200 },
  { text: 'Estimating gas requirements...', delay: 1800 },
  { text: 'Broadcasting to Base network...', delay: 2400 },
  { text: 'Awaiting block confirmation...', delay: 3000 },
  { text: 'Verifying contract on explorer...', delay: 3400 },
];

function DeploymentAnimation({ tokenData, state, onReset }: DeploymentAnimationProps) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [contractAddress, setContractAddress] = useState('');

  useEffect(() => {
    if (state === 'deploying') {
      DEPLOYMENT_STEPS.forEach((step, index) => {
        setTimeout(() => {
          setVisibleSteps((prev) => [...prev, index]);
          setProgress(((index + 1) / DEPLOYMENT_STEPS.length) * 100);
        }, step.delay);
      });
    }
  }, [state]);

  useEffect(() => {
    if (state === 'success') {
      // Generate fake contract address
      const chars = '0123456789abcdef';
      let addr = '0x';
      for (let i = 0; i < 40; i++) {
        addr += chars[Math.floor(Math.random() * chars.length)];
      }
      setContractAddress(addr);
    }
  }, [state]);

  return (
    <div className="w-full max-w-2xl">
      <div
        className="relative p-1 rounded-lg"
        style={{
          background: state === 'success'
            ? 'linear-gradient(135deg, var(--neon-green), var(--neon-blue))'
            : 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
          backgroundSize: '200% 200%',
          animation: 'border-flow 2s ease infinite',
        }}
      >
        <div
          className="rounded-lg p-6 md:p-8"
          style={{ background: 'var(--dark-surface)' }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center gap-2 pb-4 mb-6 border-b"
            style={{ borderColor: 'var(--dark-border)' }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: state === 'success' ? 'var(--neon-green)' : 'var(--neon-pink)' }} />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span
              className="ml-4 text-xs uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              deployment_sequence.sh
            </span>
          </div>

          {/* ASCII Art animation */}
          <div className="mb-6 text-center">
            {state === 'deploying' ? (
              <pre
                className="text-xs md:text-sm inline-block"
                style={{
                  color: 'var(--neon-purple)',
                  textShadow: '0 0 10px var(--neon-purple)',
                  animation: 'neon-pulse 1s ease-in-out infinite',
                }}
              >
{`    ╔══════════════════════╗
    ║   DEPLOYING TOKEN    ║
    ║   ▓▓▓▓▓▓░░░░░░░░░   ║
    ╚══════════════════════╝`}
              </pre>
            ) : (
              <pre
                className="text-xs md:text-sm inline-block"
                style={{
                  color: 'var(--neon-green)',
                  textShadow: '0 0 10px var(--neon-green)',
                }}
              >
{`    ╔══════════════════════╗
    ║   ✓ DEPLOY SUCCESS   ║
    ║   ████████████████   ║
    ╚══════════════════════╝`}
              </pre>
            )}
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: 'rgba(0, 0, 0, 0.5)' }}
            >
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  background: state === 'success'
                    ? 'var(--neon-green)'
                    : 'linear-gradient(90deg, var(--neon-purple), var(--neon-pink))',
                  boxShadow: state === 'success'
                    ? '0 0 10px var(--neon-green)'
                    : '0 0 10px var(--neon-purple)',
                }}
              />
            </div>
          </div>

          {/* Deployment logs */}
          <div
            className="font-mono text-xs md:text-sm space-y-2 p-4 rounded max-h-60 overflow-y-auto"
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          >
            {DEPLOYMENT_STEPS.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-2 transition-all duration-300"
                style={{
                  opacity: visibleSteps.includes(index) ? 1 : 0,
                  transform: visibleSteps.includes(index) ? 'translateX(0)' : 'translateX(-10px)',
                }}
              >
                <span style={{ color: index < visibleSteps.length ? 'var(--neon-green)' : 'var(--text-muted)' }}>
                  {visibleSteps.includes(index) ? '✓' : '○'}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>[{String(index).padStart(2, '0')}]</span>
                <span style={{ color: visibleSteps.includes(index) ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* Success details */}
          {state === 'success' && (
            <div className="mt-6 space-y-4 animate-fade-in">
              {/* Token summary */}
              <div
                className="p-4 rounded border"
                style={{
                  borderColor: 'var(--neon-green)',
                  background: 'rgba(0, 255, 136, 0.05)',
                }}
              >
                <h3
                  className="text-sm uppercase tracking-wider mb-3"
                  style={{ color: 'var(--neon-green)' }}
                >
                  Token Deployed Successfully
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--text-muted)' }}>Name:</span>
                    <span>{tokenData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--text-muted)' }}>Symbol:</span>
                    <span style={{ color: 'var(--neon-blue)' }}>${tokenData.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--text-muted)' }}>Supply:</span>
                    <span>{Number(tokenData.totalSupply).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--text-muted)' }}>Decimals:</span>
                    <span>{tokenData.decimals}</span>
                  </div>
                </div>
              </div>

              {/* Contract address */}
              <div
                className="p-4 rounded"
                style={{ background: 'rgba(0, 0, 0, 0.5)' }}
              >
                <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Contract Address:
                </span>
                <p
                  className="mt-1 font-mono text-sm break-all"
                  style={{ color: 'var(--neon-blue)' }}
                >
                  {contractAddress}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onReset}
                  className="flex-1 py-3 rounded font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:opacity-80"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--neon-blue)',
                    color: 'var(--neon-blue)',
                  }}
                >
                  [ Deploy Another ]
                </button>
                <button
                  className="flex-1 py-3 rounded font-mono text-xs uppercase tracking-wider transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, var(--neon-green), var(--neon-blue))',
                    color: '#000',
                  }}
                  onClick={() => window.open(`https://basescan.org/address/${contractAddress}`, '_blank')}
                >
                  [ View on BaseScan ]
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeploymentAnimation;
