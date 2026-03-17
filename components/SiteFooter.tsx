export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="brand footer-brand">
            <img className="brand-logo" src="/logo/logo.png" alt="THE MUSE 로고" />
            <span className="brand-text">THE MUSE</span>
          </div>
          <p className="footer-copy">© 2026 THE MUSE Drum Studio. All rights reserved.</p>
        </div>

        <div className="footer-links">
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
        </div>
      </div>
    </footer>
  );
}
