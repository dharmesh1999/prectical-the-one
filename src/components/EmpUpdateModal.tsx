import React, { useEffect, useState } from "react";
import CommonModal from "./CommonModal";
import { Emp, updateEmp } from "../slices/empSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../slices/store";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Emp | null;
}

const EmpUpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const [name, setName] = useState(employee?.name || "");
  const [age, setAge] = useState(employee?.age || 0);
  const [position, setPosition] = useState(employee?.position || "");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (employee) {
      setName(employee?.name);
      setAge(employee?.age);
      setPosition(employee?.position);
    }
  }, [employee]);

  if (!employee) return <></>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateEmp({ ...employee, name, age, position }));
    onClose();
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Update Employee</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Age"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </CommonModal>
  );
};

export default EmpUpdateModal;
