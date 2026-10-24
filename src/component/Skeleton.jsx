export default function Skeleton() {
  return (
    <div className="skeleton-wrap" aria-busy="true" aria-label="Loading">
      <div className="sk title" />
      <div className="sk input" />
      <div className="sk input" />
      <div className="sk input" />
      <div className="sk button" />
    </div>
  );
}