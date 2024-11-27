import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmps, deleteEmp, updateEmp } from "../slices/empSlice";
import { RootState, AppDispatch } from "../slices/store";
import EmpDetailsModal from "./EmpDetailsModal";
import EmpUpdateModal from "./EmpUpdateModal";
import { Emp } from "../slices/empSlice";
import EmployeeForm from "./EmpForm";
import EmpForm from "./EmpForm";

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { emps, loading } = useSelector((state: RootState) => state.employees);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<Emp | null>(null);

  useEffect(() => {
    dispatch(fetchEmps());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteEmp(id));
  };

  console.log({ isUpdateModalOpen, isDetailsModalOpen });
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold mb-4">Employee List</h1>
        <button
          onClick={() => {
            setIsAddModalOpen(true);
          }}
          className="bg-blue-500 rounded-md px-2 py-1"
        >
          ADD EMPLOYEE
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pl-5">
          {emps?.map((emp) => (
            <div className="grid grid-cols-5 gap-3 mb-3" key={emp.id}>
              <p className="text-start">{emp.id}</p>{" "}
              <p className="text-start">{emp.name}</p>
              <button
                onClick={() => {
                  setSelectedEmp(emp);
                  setIsDetailsModalOpen(true);
                }}
                className="bg-green-400 rounded-md text-white px-3 py-2"
              >
                More Details
              </button>
              <button
                onClick={() => {
                  setSelectedEmp(emp);
                  setIsUpdateModalOpen(true);
                }}
                className="bg-green-400 rounded-md text-white px-3 py-2"
              >
                Edit
              </button>
              <button
                className="ml-2 text-white bg-red-500 rounded-md px-3 py-2"
                onClick={() => handleDelete(emp.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <EmpDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        employee={selectedEmp}
      />
      <EmpUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        employee={selectedEmp}
      />
      <EmpForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default EmployeeList;
