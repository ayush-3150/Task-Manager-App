import {FaEdit,FaCheck,FaRegTrashAlt} from 'react-icons/fa';
export const Task = ({task,index,deleteTask,getSingleTask,setToComplete}) => {
    return (
        <div className={task.completed? "task completed" :"task"}>
            <p>
                <b>{index+1}.</b>
                {task.name}
               
            </p>
            <div className="task-icons">
                <FaCheck color='green' onClick={()=>{setToComplete(task)}}></FaCheck>
                <FaEdit color='blue' onClick={()=>getSingleTask(task)}></FaEdit>
                <FaRegTrashAlt color='red' onClick={()=>deleteTask(task._id)}></FaRegTrashAlt>
            </div>
        </div>
    )
}
