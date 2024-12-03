import { IoCheckmarkCircleOutline, IoEllipsisHorizontalOutline} from 'react-icons/io5';
import { TaskStatus,Task } from '../../types/tasks';
import SingleTask from './SingleTask';
import { useTaskStore } from '../../stores';
import clsx from 'clsx';
import React, { useState } from 'react';





interface Props {
  title:string
  status:TaskStatus
  tasks:Task[]
}


export const JiraTasks = ({tasks, title, status }: Props) => {

  const isDragging = useTaskStore(state=>!!state.draggingTaskId) //evalua true o false
  const onchangeStatus = useTaskStore(state=>state.changeStatus)
  const draggingTaskId = useTaskStore(state=>state.draggingTaskId)
  /* const ontaskDrop = useTaskStore(state => state.ontaskDrop) */
  const [onDrageOver, setOnDragOver] = useState(false)

  const handleDragOver=(e:React.DragEvent<HTMLDivElement>)=>{

    e.preventDefault();
    /* console.log('dragOver') */
    setOnDragOver(true)
  };

  const handleDragLeave = (e:React.DragEvent<HTMLDivElement>) =>{
     e.preventDefault();
     setOnDragOver(false)
  };

  const handleDragDrop = (e:React.DragEvent<HTMLDivElement>) =>{
     e.preventDefault();
     setOnDragOver(false)
     onchangeStatus(draggingTaskId!,status)
  };

  return (
    <div 

      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragDrop}

      className={
        clsx(
          "!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
          {
            'border-blue-500 border-dotted': isDragging,
            'border-green-500 border-dotted': isDragging && onDrageOver,
            
          })
      }>

      {/* Task Header */ }
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={ { fontSize: '50px' } } />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{ title }</h4>
        </div>

        <button>
          <IoEllipsisHorizontalOutline />
        </button>

      </div>

      {/* Task Items */ }
     <div className="h-full w-full">
          
           {tasks.map(task=>(
               <SingleTask  
                  key={task.id}
                  task={task}
               />
           ))}
      
      </div>
    </div>
  );
};