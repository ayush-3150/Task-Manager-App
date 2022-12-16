import { TaskList } from './Components/TaskList'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const URL = process.env.REACT_APP_BACKEND_URL
function App () {
  console.log('App. js ' + URL)
  return (
    <div className='app'>
      <div className='task-container'>
        <TaskList></TaskList>
        <ToastContainer />
      </div>
    </div>
  )
}

export default App
