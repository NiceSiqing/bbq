
export default function SpiceIcons({ level }: { level: number }) {
  const spiceIcons = [];
  for (let i = 0; i < level; i++) {
    spiceIcons.push(
      <img
        key={i}
        src="./icon-spice-one.png"
        alt="spice icon"
        className="w-5.5 h-7.5 relative -top-1"
      />
    );
  }
  return <>{spiceIcons}</>;
}
