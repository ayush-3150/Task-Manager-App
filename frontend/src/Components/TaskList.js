import { Task } from './Task'
import TaskForm from './TaskForm'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { URL } from '../App'
import axios from 'axios'
import { trusted } from 'mongoose'
export const TaskList = () => {
  const [completedTask, setCompletedTask] = useState(0)
  const [isLoading, setisLoading] = useState(false)
  const [task, setTask] = useState([])
  const [isEditing, setisEditing] = useState(false)
  const [taskId, settaskId] = useState('')
  const [formData, setformData] = useState({
    name: '',
    completed: false
  })
  const { name } = formData
  const getTasks = async () => {
    try {
      setisLoading(true)
      const { data } = await axios.get(`${URL}/api/tasks`)
      setTask(data)
      // console.log(data)
      setisLoading(false)
    } catch (error) {
      toast.error(error.message)
      setisLoading(false)
    }
  }
  useEffect(() => {
    getTasks()
  }, [])
  const handleInputChange = e => {
    // console.log('target ' + e.target)
    // console.log("DEBUG "+e.target.name+''+e.target.value);

    const { name, value } = e.target
    setformData({ ...formData, [name]: value })
  }

  const createTask = async e => {
    e.preventDefault()
    if (name === '') {
      toast.error("Input field can't be empty")
    }
    try {
      console.log('URL ' + URL)
      await axios.post(`${URL}/api/tasks`, formData)
      setformData({ ...formData, name: '' })
      toast.success(`Task ${formData.name} added succesfully!`)
      getTasks()
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  const deleteTask = async id => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`)
      toast.success(`Task Deleted succesfully!`)
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getSingleTask = async task => {
    try {
      setformData({
        name: task.name,
        completed: false
      })
      settaskId(task._id)
      setisEditing(true)
      // await axios.get(`${URL}/api/tasks/${id}`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const cTask = task.filter(t => {
      return t.completed === true
    })
    setCompletedTask(cTask)
  }, [task])

  const setToComplete = async task => {
    const newFormData = {
      name: task.name,
      completed: true
    }
    try {
      await axios.patch(`${URL}/api/tasks/${task._id}`, newFormData)
      getTasks()
      toast.success('Task marked as completed successfully!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const updateTask = async e => {
    if (name === '') {
      return toast.error('Form is empty ')
    }
    try {
      e.preventDefault()

      await axios.patch(`${URL}/api/tasks/${taskId}`, formData)
      toast.success('Task Edited successfully!')
      setisEditing(false)
      setformData({
        name: ''
      })
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      ></TaskForm>
      {task.length > 0 && (
        <div className='--flex-between --pb'>
          <p>
            <b>Total Tasks: </b>
            {task.length}
          </p>
          <p>
            <b>Completed Tasks: </b>
            {completedTask.length}
          </p>
        </div>
      )}
      <hr />
      {/* {isLoading && toast.info('Data fetching is in process')} */}
      {!isLoading && task.length === 0 ? (
        <p>No task found</p>
      ) : (
        <>
          {task.map((t, i) => {
            return (
              <Task
                task={t}
                key={task._id}
                index={i}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              ></Task>
            )
          })}
        </>
      )}
    </div>
  )
}
