export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="state-center" role="status" aria-live="polite">
      <div className="spinner" />
      <span>{label}</span>
    </div>
  );
}
