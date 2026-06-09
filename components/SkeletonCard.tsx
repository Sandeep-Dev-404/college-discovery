export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="h-5 w-3/4 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
        </div>
        <div className="h-6 w-12 rounded-full bg-gray-200" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="h-16 rounded-lg bg-gray-100" />
        <div className="h-16 rounded-lg bg-gray-100" />
      </div>

      <div className="mt-4 flex gap-2">
        <div className="h-9 flex-1 rounded-lg bg-gray-200" />
        <div className="h-9 w-10 rounded-lg bg-gray-200" />
        <div className="h-9 w-10 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}