export function SubpageIntro({ label, title, copy }: { label: string; title: string; copy: string }) {
  return (
    <section className="subpage-intro">
      <div className="container">
        <p className="subpage-label">{label}</p>
        <h1 className="subpage-title">{title}</h1>
        <p className="subpage-copy">{copy}</p>
      </div>
    </section>
  );
}
