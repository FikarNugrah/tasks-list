import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTask = createAsyncThunk("task/getTask", async () => {
  try {
    const resp = await axios.get(
      "https://650ba32cdfd73d1fab0a19b3.mockapi.io/task-list/v1/tasks"
    );
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const addTask = createAsyncThunk("task/addTask", async (newTask) => {
  // console.log(newTask);
  try {
    const resp = await axios.post(
      "https://650ba32cdfd73d1fab0a19b3.mockapi.io/task-list/v1/tasks",
      newTask
    );
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});

export const updateTaskCompletion = createAsyncThunk(
  "task/updateTaskCompletion",
  async ({ id, isComplated, added_on, complated_on }) => {
    // console.log(isComplated);
    try {
      const resp = await axios.put(
        `https://650ba32cdfd73d1fab0a19b3.mockapi.io/task-list/v1/tasks/${id}`,
        {
          isComplated,
          added_on,
          complated_on,
        }
      );
      window.location.reload();
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
        `https://650ba32cdfd73d1fab0a19b3.mockapi.io/task-list/v1/tasks/${updatedData.id}`,
        updatedData
      );
      window.location.reload();
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
      await axios.delete(
        `https://650ba32cdfd73d1fab0a19b3.mockapi.io/task-list/v1/tasks/${id}`
      );
      return id;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

const taskSliceReducerv2 = createSlice({
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
          taskToUpdate.added_on = updatedData.added_on;
          taskToUpdate.completed_on = updatedData.completed_on;
        }
      })
      .addCase(delateTask.fulfilled, (state, action) => {
        return state.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSliceReducerv2.reducer;
