import AnimatedIn from "../AnimatedIn";

export default function HomeFeature ({ title, description, className }: { title: string; description: string, className?: string }) {
  return (
    <AnimatedIn className={`
    bg-white p-6 rounded-lg shadow-md text-center hover:bg-gray-100 transition
      ${className}`}>
      <h3 className="text-xl font-semibold text-green-600">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </AnimatedIn>
  );
}