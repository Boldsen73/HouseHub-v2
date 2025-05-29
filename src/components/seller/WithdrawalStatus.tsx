
import React from 'react';
import CaseWithdrawal from './CaseWithdrawal';

interface WithdrawalStatusProps {
  hasWithdrawnCase: boolean;
  caseWithdrawn: boolean;
  onWithdraw: () => void;
}

const WithdrawalStatus: React.FC<WithdrawalStatusProps> = ({
  hasWithdrawnCase,
  caseWithdrawn,
  onWithdraw
}) => {
  if (hasWithdrawnCase || caseWithdrawn) {
    return (
      <div className="mb-6 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Din sag er annulleret
        </h3>
        <p className="text-red-700">
          Du har annulleret dit salg. Alle mæglere er blevet informeret, og der kan ikke længere afgives tilbud.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <CaseWithdrawal
        caseId={1}
        onWithdraw={onWithdraw}
      />
    </div>
  );
};

export default WithdrawalStatus;
