import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Emp {
  id: string;
  name: string;
  age: number;
  position: string;
}

interface EmpState {
  emps: Emp[];
  loading: boolean;
}

const initialState: EmpState = {
  emps: [],
  loading: false,
};

export const fetchEmps = createAsyncThunk("emps/fetch", async () => {
  const response = await fetch("/api/employees");
  // const data = await response.json();
  // console.log({ data });
  return response.json();
});

export const empSlice = createSlice({
  name: "emps",
  initialState,
  reducers: {
    addEmp(state, action) {
      state.emps.push(action.payload);
    },
    updateEmp(state, action) {
      const index = state.emps.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.emps[index] = action.payload;
      }
    },
    deleteEmp(state, action) {
      state.emps = state.emps.filter((e) => e.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmps.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmps.fulfilled, (state, action) => {
      console.log("---", action.payload.employees);
      state.emps = action.payload.employees;
      state.loading = false;
    });
    builder.addCase(fetchEmps.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error.message);
    });
  },
});

export const { addEmp, updateEmp, deleteEmp } = empSlice.actions;

export default empSlice.reducer;
