import { useState, useEffect } from 'react';
import TokenForm from './components/TokenForm';
import DeploymentAnimation from './components/DeploymentAnimation';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles.css';

export interface TokenData {
  name: string;
  symbol: string;
  totalSupply: string;
  decimals: string;
  description: string;
}

type DeploymentState = 'idle' | 'deploying' | 'success' | 'error';

function App() {
  const [tokenData, setTokenData] = useState<TokenData>({
    name: '',
    symbol: '',
    totalSupply: '1000000000',
    decimals: '18',
    description: '',
  });
  const [deploymentState, setDeploymentState] = useState<DeploymentState>('idle');
  const [scanLineOffset, setScanLineOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLineOffset((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleDeploy = () => {
    if (!tokenData.name || !tokenData.symbol || !tokenData.totalSupply) return;

    setDeploymentState('deploying');

    // Simulate deployment
    setTimeout(() => {
      setDeploymentState('success');
    }, 4000);
  };

  const handleReset = () => {
    setDeploymentState('idle');
    setTokenData({
      name: '',
      symbol: '',
      totalSupply: '1000000000',
      decimals: '18',
      description: '',
    });
  };

  return (
    <div className="app-container">
      {/* Scan lines overlay */}
      <div
        className="scan-lines"
        style={{ backgroundPositionY: `${scanLineOffset}px` }}
      />

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Grid background */}
      <div className="grid-bg" />

      <div className="content-wrapper">
        <Header />

        <main className="main-content">
          {deploymentState === 'idle' && (
            <TokenForm
              tokenData={tokenData}
              setTokenData={setTokenData}
              onDeploy={handleDeploy}
            />
          )}

          {(deploymentState === 'deploying' || deploymentState === 'success') && (
            <DeploymentAnimation
              tokenData={tokenData}
              state={deploymentState}
              onReset={handleReset}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
