import React from "react";
import CommonModal from "./CommonModal";
import { Emp } from "../slices/empSlice";

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Emp | null;
}

const EmpDetailsModal: React.FC<DetailsModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Employee Details</h2>
      <p className="text-center">Name:{employee?.name}</p>
      <p>Age:{employee?.age}</p>
      <p>Position:{employee?.position}</p>
      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Close
      </button>
    </CommonModal>
  );
};

export default EmpDetailsModal;
