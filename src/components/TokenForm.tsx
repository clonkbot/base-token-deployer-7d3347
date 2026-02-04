import { type Dispatch, type SetStateAction } from 'react';
import type { TokenData } from '../App';

interface TokenFormProps {
  tokenData: TokenData;
  setTokenData: Dispatch<SetStateAction<TokenData>>;
  onDeploy: () => void;
}

function TokenForm({ tokenData, setTokenData, onDeploy }: TokenFormProps) {
  const updateField = (field: keyof TokenData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTokenData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isValid = tokenData.name && tokenData.symbol && tokenData.totalSupply;

  return (
    <div className="w-full max-w-2xl">
      {/* Terminal-style form container */}
      <div
        className="relative p-1 rounded-lg animate-fade-in"
        style={{
          background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple), var(--neon-pink))',
          backgroundSize: '200% 200%',
          animation: 'border-flow 4s ease infinite',
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
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span
              className="ml-4 text-xs uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              token_config.sol
            </span>
          </div>

          {/* Form fields */}
          <div className="space-y-6">
            <FormField
              label="TOKEN_NAME"
              value={tokenData.name}
              onChange={updateField('name')}
              placeholder="My Awesome Token"
              required
              delay={1}
            />

            <FormField
              label="TOKEN_SYMBOL"
              value={tokenData.symbol}
              onChange={updateField('symbol')}
              placeholder="MAT"
              maxLength={10}
              required
              delay={2}
            />

            <FormField
              label="TOTAL_SUPPLY"
              value={tokenData.totalSupply}
              onChange={updateField('totalSupply')}
              placeholder="1000000000"
              type="number"
              required
              delay={3}
            />

            <FormField
              label="DECIMALS"
              value={tokenData.decimals}
              onChange={updateField('decimals')}
              placeholder="18"
              type="number"
              delay={4}
            />

            <div className="animate-fade-in-delay-4">
              <label
                className="block text-xs uppercase tracking-wider mb-2"
                style={{ color: 'var(--neon-purple)' }}
              >
                <span style={{ color: 'var(--text-muted)' }}>// </span>
                DESCRIPTION
              </label>
              <textarea
                value={tokenData.description}
                onChange={updateField('description')}
                placeholder="Optional: Describe your token..."
                rows={3}
                className="w-full px-4 py-3 rounded text-sm resize-none focus:outline-none transition-all duration-300"
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid var(--dark-border)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--neon-purple)';
                  e.target.style.boxShadow = '0 0 10px rgba(157, 0, 255, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--dark-border)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Deploy button */}
          <div className="mt-8 animate-fade-in-delay-4">
            <button
              onClick={onDeploy}
              disabled={!isValid}
              className="w-full py-4 rounded font-mono text-sm uppercase tracking-widest transition-all duration-300 relative overflow-hidden group"
              style={{
                background: isValid
                  ? 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))'
                  : 'var(--dark-border)',
                color: isValid ? '#fff' : 'var(--text-muted)',
                cursor: isValid ? 'pointer' : 'not-allowed',
                boxShadow: isValid ? '0 0 20px rgba(0, 240, 255, 0.3)' : 'none',
              }}
            >
              <span className="relative z-10">
                {isValid ? '[ INITIALIZE DEPLOYMENT SEQUENCE ]' : '[ FILL REQUIRED FIELDS ]'}
              </span>
              {isValid && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))',
                  }}
                />
              )}
            </button>
          </div>

          {/* Status line */}
          <div className="mt-4 flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>
              STATUS: <span style={{ color: 'var(--neon-green)' }}>READY</span>
            </span>
            <span>GAS: OPTIMIZED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  delay?: number;
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  maxLength,
  delay = 0,
}: FormFieldProps) {
  const animationClass = delay > 0 ? `animate-fade-in-delay-${delay}` : 'animate-fade-in';

  return (
    <div className={animationClass}>
      <label
        className="block text-xs uppercase tracking-wider mb-2"
        style={{ color: 'var(--neon-blue)' }}
      >
        <span style={{ color: 'var(--text-muted)' }}>// </span>
        {label}
        {required && <span style={{ color: 'var(--neon-pink)' }}> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-4 py-3 rounded text-sm focus:outline-none transition-all duration-300"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid var(--dark-border)',
          color: 'var(--text-primary)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--neon-blue)';
          e.target.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.3)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--dark-border)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

export default TokenForm;
