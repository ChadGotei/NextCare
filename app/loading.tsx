export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-green-500"></div>

        <p className="mt-4 text-lg font-semibold text-gray-300">Loading...</p>
      </div>
    </div>
  );
}
