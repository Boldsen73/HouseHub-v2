
interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressIndicator = ({ currentStep, totalSteps, className = "" }: ProgressIndicatorProps) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center justify-center mb-4">
        <span className="text-sm font-medium text-gray-600">
          Trin {currentStep} af {totalSteps}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
