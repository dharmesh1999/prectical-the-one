import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmp, updateEmp } from "../slices/empSlice";
import { AppDispatch } from "../slices/store";

interface EmployeeFormProps {
  existingEmp?: {
    id: string;
    name: string;
    age: number;
    position: string;
  };
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ existingEmp }) => {
  const [name, setName] = useState(existingEmp?.name || "");
  const [age, setAge] = useState(existingEmp?.age || 0);
  const [position, setPosition] = useState(existingEmp?.position || "");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (existingEmp) {
      dispatch(updateEmp({ id: existingEmp.id, name, age, position }));
    } else {
      dispatch(addEmp({ id: Date.now().toString(), name, age, position }));
    }
  };

  return (
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
        {existingEmp ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default EmployeeForm;
