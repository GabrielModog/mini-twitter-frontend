export default function PostSkeleton() {
  return (
    <div className="w-160 bg-white border border-gray-200 rounded-xl shadow-sm p-4 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div className="flex flex-col gap-1">
          <div className="w-24 h-4 bg-gray-200 rounded" />
          <div className="w-16 h-3 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="w-3/4 h-5 bg-gray-200 rounded mb-2" />
      <div className="w-full h-20 bg-gray-200 rounded" />
    </div>
  );
}
