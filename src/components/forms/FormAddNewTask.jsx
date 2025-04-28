import { useState,useEffect } from "react";

const FormAddNewTask = ({
  formSubmit,
  selectedTask,
  setSelectedTask,
  allTasks,
  removeTask,
}) => {
  const [values, setValues] = useState({
    title: selectedTask?.title || '',
    description: selectedTask?.description || '',
  });

  useEffect(() => {
    // Обновляем значения при изменении selectedTask
    if (selectedTask) {
      setValues({
        title: selectedTask.title || '',
        description: selectedTask.description || '',
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskId = selectedTask?.id;
    formSubmit(values.title, values.description);
    setValues({ title: '', description: '' });
    setSelectedTask(null);
    if (taskId) {
      removeTask(taskId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <select
        value={selectedTask?.id || ''}
        onChange={(e) => {
          const selected = allTasks.find((task) => task.id === e.target.value);
          setSelectedTask(selected);
        }}
      >
        <option value="">Select existing task</option>
        {allTasks?.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="title"
        placeholder="Enter task title"
        value={values.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Enter task description"
        value={values.description}
        onChange={handleChange}
      />

      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
};

export default FormAddNewTask;
