import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTask = createAsyncThunk("task/getTask", async () => {
  try {
    const resp = await axios.get("http://[::1]:3000/todos");
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const addTask = createAsyncThunk("task/addTask", async (newTask) => {
  try {
    const resp = await axios.post("http://[::1]:3000/todos", newTask);
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});

export const updateTaskCompletion = createAsyncThunk(
  "task/updateTaskCompletion",
  async ({ id, isComplete, added_on, completed_on }) => {
    try {
      const resp = await axios.patch(`http://[::1]:3000/todos/${id}`, {
        isComplete,
        date: {
          added_on,
          completed_on,
        },
      });
      return resp.data;
    } catch (error) {
      console.error("Error updating task completion:", error);
      throw error;
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (updatedData) => {
    // console.log("slice", updatedData);
    try {
      const resp = await axios.put(
        `http://[::1]:3000/todos/${updatedData.id}`,
        updatedData
      );
      return resp.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
);

export const delateTask = createAsyncThunk(
  "task/delateTask",
  async ({ id }) => {
    try {
      await axios.delete(`http://[::1]:3000/todos/${id}`);
      return id;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

const tasksSliceReducer = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTask.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateTaskCompletion.fulfilled, (state, action) => {
        const { id, isComplete } = action.payload;
        const taskIndex = state.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
          state[taskIndex].isComplete = isComplete;
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedData = action.payload; // Mengambil payload dari action

        // Cari tugas yang sesuai berdasarkan ID
        const taskToUpdate = state.find((task) => task.id === updatedData.id);

        if (taskToUpdate) {
          // Perbarui properti isComplete
          taskToUpdate.isComplete = updatedData.isComplete;

          // Periksa apakah tugas memiliki properti date
          if (!taskToUpdate.date) {
            // Jika tidak, tambahkan properti date
            taskToUpdate.date = {};
          }

          // Perbarui properti added_on dan completed_on
          taskToUpdate.date.added_on = updatedData.date.added_on;
          taskToUpdate.date.completed_on = updatedData.date.completed_on;
        }
      })
      .addCase(delateTask.fulfilled, (state, action) => {
        return state.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSliceReducer.reducer;
