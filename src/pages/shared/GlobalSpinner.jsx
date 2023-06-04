const GlobalSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  backdrop-blur-sm">
      <div className="w-16 h-16 rounded-full animate-spin border-8 border-solid border-purple-500 border-t-transparent"></div>
    </div>
  );
};

export default GlobalSpinner;
