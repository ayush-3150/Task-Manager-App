const TaskForm = ({createTask, name, handleInputChange,isEditing,updateTask}) => {
  return (
    <div>
      <form className='task-form' onSubmit={isEditing?updateTask:createTask}>
        <input
          type='text'
          name='name'
          placeholder='Enter Task you want to do'
          onChange={handleInputChange}
          value={name}
        />
        <button type='submit'>{isEditing?"Edit":"ADD"}</button>
      </form>
    </div>
  )
}

export default TaskForm
