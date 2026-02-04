function Footer() {
  return (
    <footer className="mt-auto pt-8 pb-4">
      <div className="text-center">
        <p
          className="text-xs tracking-wider"
          style={{ color: 'var(--text-muted)', opacity: 0.6 }}
        >
          Requested by{' '}
          <a
            href="https://twitter.com/sat_org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-opacity hover:opacity-100"
            style={{ color: 'var(--text-muted)' }}
          >
            @sat_org
          </a>
          {' · '}
          Built by{' '}
          <a
            href="https://twitter.com/clonkbot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-opacity hover:opacity-100"
            style={{ color: 'var(--text-muted)' }}
          >
            @clonkbot
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
