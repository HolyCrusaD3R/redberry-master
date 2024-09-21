export default function DetailsSkeleton() {
  return (
    <div
      role="status"
      className="max-w-[1600px] flex mx-auto gap-12 animate-pulse mt-6"
    >
      <div className="flex-1 h-[670px] w-full mb-4 bg-gray-200 rounded-t-xl"></div>
      <div className="flex-1">
        <div className="h-20 bg-gray-200 rounded-md max-w-[200px] mt-4 mb-6 "></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-3"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-3"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-3"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-12"></div>
        <div className="h-20 bg-gray-200 rounded-md max-w-[270px] mb-12"></div>
        <div className="h-32 bg-gray-200 rounded-md max-w-[300px] mb-3"></div>
        <div className="h-6 bg-gray-200 rounded-md max-w-[100px] mb-3"></div>
        <span className="sr-only">იტვირთება...</span>
      </div>
    </div>
  );
}
