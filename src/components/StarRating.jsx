export default function StarRating({ value = 0, size = 14 }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} trên 5 sao`}>
      {stars.map((s) => (
        <svg
          key={s}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={s <= Math.round(value) ? "#C9A24B" : "#E0D2B4"}
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6z" />
        </svg>
      ))}
    </span>
  );
}
