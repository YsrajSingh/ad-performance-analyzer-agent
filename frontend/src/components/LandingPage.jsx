const LandingPage = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-100 mb-6">
          Ad Performance Analyzer
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Welcome to the Ad Performance Analyzer dashboard. Upload your ad data to analyze performance and optimize your campaigns.
        </p>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
