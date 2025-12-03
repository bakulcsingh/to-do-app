import { useState } from "react";
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

  const handleAddTask = () => {
    setTasks([...tasks, taskForm]);
    setTaskForm(formInitialState);
    setShowNotes(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>To Do App</h1>
      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handleAddTask}>Add Task</button>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <label>Title:</label>
            <input
              type="text"
              value={taskForm.title}
              onChange={handleTitleChange}
              style={{ flex: 1 }}
            />
            <label>Expected hours:</label>
            <input
              type="number"
              value={taskForm.estimatedHours}
              onChange={handleEstimatedHoursChange}
              style={{ flex: 1 }}
            />
            <label>Complete by:</label>
            <input
              type="date"
              value={taskForm.completeBy}
              onChange={handleCompleteByChange}
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ display: "flex", gap:"0.5rem"}}>
            <label>First step:</label>
            <input
              type="text"
              value={taskForm.firstStep}
              onChange={handleFirstStepChange}
              style={{ flex: 1 }}
              title="First step"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <button onClick={() => setShowNotes(!showNotes)}>
              {showNotes ? "Hide Notes" : "Show Notes"}
            </button>
            {showNotes && (
              <textarea value={taskForm.notes} onChange={handleNotesChange} />
            )}
          </div>
        </div>
        <div>
          <ul>
            {tasks.length === 0
              ? "No tasks yet..."
              : [...tasks]
                  .sort((a, b) => {
                    if (!a.completeBy && !b.completeBy) return 0;
                    if (!a.completeBy) return 1;
                    if (!b.completeBy) return -1;

                    const dateA = new Date(a.completeBy);
                    const dateB = new Date(b.completeBy);

                    return dateA.getTime() - dateB.getTime();
                  })
                  .map((task, index) => (
                    <li key={index} style={{textAlign:"left"}}>
                      {task.title} - {task.completeBy}
                    </li>
                  ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
