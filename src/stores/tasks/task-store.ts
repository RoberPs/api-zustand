import { Task,TaskStatus } from "../../types"
import { create } from 'zustand';
import {devtools} from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';




interface TaskState{
   
     /* tasks:Record<string,Task> */ 
     tasks:{[key:string]:Task} 
    
}
interface ActionTask{

    
    draggingTaskId?:string;
    getTaskByStatus:(status:TaskStatus)=> Task[]
    setDraggingTaskId:(taskId:string)=>void;
    removeDraggingTaskId:()=>void;
    changeStatus:(taskId:string, status:TaskStatus) => void;
    /* ontaskDrop:(status:TaskStatus) =>void */

    addTask:(title:string,status:TaskStatus) =>void
}

export const useTaskStore = create<TaskState & ActionTask>()(
    
    devtools(
            (set,get)=>({
             
            draggingTaskId:undefined,
        
            tasks:{
                
                "A-1" :{ id:'1', title:'tarea-1', status:'pending'},
                "A-2" :{ id:'2', title:'tarea-2', status:'in-progress'},
                "A-3" :{ id:'3', title:'tarea-3', status:'done'},
                "A-4" :{ id:'4', title:'tarea-4', status:'pending'},
            },
            getTaskByStatus:(status:TaskStatus)=>{

                const tasks = get().tasks
                return Object.values(tasks).filter(task => task.status === status)
            },
            setDraggingTaskId:(taskId:string)=>{
                set({draggingTaskId:taskId})
            },
            removeDraggingTaskId:()=>{
                set({draggingTaskId:undefined})
            },
            changeStatus:(taskId:string, status:TaskStatus)=>{
                
                //obtener la tarea por id argumento / drag del objeto de tareas
                const task = get().tasks[taskId];
                //el status de esa tarea se añade el status argumento
                task.status = status

                set((state)=>({
                      
                      //Actualiza la tarea en el state
                      tasks: {
                         ...state.tasks,
                         [taskId]:task 
                      }
                }))
            },

            addTask:(title:string,status:TaskStatus) =>{
                
                const newTask = {id:uuidv4(), title, status}

                set(state=>({

                    tasks:{
                        ...state.tasks,
                        [newTask.id]:newTask
                    }

                }))
            }

            // !combinar 3 metodos
/*             ontaskDrop:(status:TaskStatus)=>{

                const taskId = get().draggingTaskId; //puede ser un task o undefined
                
                if(!taskId) return; // si no hay nada

                get().changeStatus(taskId,status); // Si se mueve cambia el status
                get().removeDraggingTaskId(); 
            } */
            
                  
        })
   )
)
/* export const useTaskStore = create<TaskState & ActionsState>()(storeApi) */

