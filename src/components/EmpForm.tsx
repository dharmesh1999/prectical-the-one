import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmp, updateEmp } from "../slices/empSlice";
import { AppDispatch } from "../slices/store";
import CommonModal from "./CommonModal";

interface EmployeeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmpForm: React.FC<EmployeeFormProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [position, setPosition] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    dispatch(addEmp({ id: Date.now().toString(), name, age, position }));
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Age"
          className="border p-2"
        />
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white py-2">
          Add
        </button>
      </form>
    </CommonModal>
  );
};

export default EmpForm;
