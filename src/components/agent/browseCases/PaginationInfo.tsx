
import React from 'react';

interface PaginationInfoProps {
  filteredCount: number;
  totalCount: number;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({ filteredCount, totalCount }) => {
  return (
    <div className="mt-12 text-center">
      <p className="text-gray-500">
        Viser {filteredCount} af {totalCount} aktive sager.
      </p>
    </div>
  );
};

export default PaginationInfo;
