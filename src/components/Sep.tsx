/** Overpass sets its middle dot off-centre, so separators are drawn instead. */
export const Sep = () => <span className="sep" aria-hidden="true" />;

export function Dotted({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && <Sep />}
          {i > 0 && <span className="sr-only">, </span>}
          {item}
        </span>
      ))}
    </>
  );
}
