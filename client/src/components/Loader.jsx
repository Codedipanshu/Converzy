const Loader = ({ isLoading }) => {
    if (!isLoading) return null;
  
    return (
      <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-lg font-semibold">Processing...</p>
        </div>
      </div>
    );
  };
  
  export default Loader;
  