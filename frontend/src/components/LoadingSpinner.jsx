const LoadingSpinner = ({ size = "md" }) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-5 h-5 border-2",
    lg: "w-7 h-7 border-2",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full border-transparent border-t-current animate-spin`}
    />
  );
};

export default LoadingSpinner;