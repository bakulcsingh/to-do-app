import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import type { Task } from "./models/Task";

function App() {
  const formInitialState: Task = {
    title: "",
    estimatedHours: 0,
    completeBy: "",
    firstStep: "",
    notes: "",
  };

  const [taskForm, setTaskForm] = useState<Task>(formInitialState);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskForm({ ...taskForm, title: event.target.value });
  };

  const handleEstimatedHoursChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskForm({ ...taskForm, estimatedHours: Number(event.target.value) });
  };

  const handleCompleteByChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskForm({ ...taskForm, completeBy: String(event.target.value) });
  };
  const handleFirstStepChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskForm({ ...taskForm, firstStep: event.target.value });
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskForm({ ...taskForm, notes: event.target.value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h1>To Do App</h1>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <input
          type="text"
          value={taskForm.title}
          onChange={handleTitleChange}
          style={{ flex: 1 }}
        />
        <input
          type="number"
          value={taskForm.estimatedHours}
          onChange={handleEstimatedHoursChange}
          style={{ flex: 1 }}
        />
        <input
          type="date"
          value={taskForm.completeBy}
          onChange={handleCompleteByChange}
          style={{ flex: 1 }}
        />
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={taskForm.firstStep}
          onChange={handleFirstStepChange}
          style={{ flex: 1 }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <button onClick={() => setShowNotes(!showNotes)}>
          {showNotes ? "Hide Notes" : "Show Notes"}
        </button>
        {showNotes && (
          <textarea value={taskForm.notes} onChange={handleNotesChange} />
        )}
      </div>
    </div>
  );
}

export default App;
