const ProgressBar = ({ progress = 0 }: { progress?: number }) => {
  return (
    <div className="py-1.5 h-6 relative">
      <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-gray-400"></div>
      <div
        style={{
          width: `${progress}%`,
        }}
        className="absolute top-0 bottom-0 left-0 h-full transition-all duration-150 bg-gray-600"
      ></div>
      <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-full h-full">
        <span className="text-xs font-bold text-white">{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
