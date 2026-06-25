const navItems = ["Home", "Explore", "Saved", "Profile"];

export function Navigation() {
  return (
    <>
      <header className="top-bar">
        <a className="brand" href="/" aria-label="Video community home">
          <span aria-hidden="true">VC</span>
        </a>
        <button className="icon-button" aria-label="Open notifications">
          <span aria-hidden="true">!</span>
        </button>
      </header>
      <nav className="side-rail" aria-label="Primary">
        {navItems.map((item, index) => (
          <a key={item} href="/" aria-current={index === 0 ? "page" : undefined}>
            <span aria-hidden="true">{item.slice(0, 1)}</span>
            <span className="sr-only">{item}</span>
          </a>
        ))}
      </nav>
      <nav className="bottom-nav" aria-label="Mobile primary">
        {navItems.map((item, index) => (
          <a key={item} href="/" aria-current={index === 0 ? "page" : undefined}>
            {item}
          </a>
        ))}
      </nav>
    </>
  );
}
