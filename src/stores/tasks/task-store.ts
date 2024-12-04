import { Task,TaskStatus } from "../../types"
import { create, StateCreator } from 'zustand';
import {devtools, persist} from 'zustand/middleware'
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
import { v4 as uuidv4 } from 'uuid';




interface TaskState{
   
     /* tasks:Record<string,Task> */ 
     tasks:{[key:string]:Task} 
    
     draggingTaskId?:string; // tarea que se mueve

     getTaskByStatus:(status:TaskStatus)=> Task[]
     setDraggingTaskId:(taskId:string)=>void;
     removeDraggingTaskId:()=>void;
     changeStatus:(taskId:string, status:TaskStatus) => void;
     ontaskDrop:(status:TaskStatus) =>void 
     addTask:(title:string,status:TaskStatus) =>void
     totalTasks:() => number
}


const storeApiTask: StateCreator<TaskState ,[["zustand/immer", never]]> = (set,get)=>({
             
            draggingTaskId:undefined,
        
            tasks:{
                
                "ABC-1": { id:'ABC-1', title:'tarea-1', status:'pending'},
                "ABC-2": { id:'ABC-2', title:'tarea-2', status:'in-progress'},
                "ABC-3": { id:'ABC-3', title:'tarea-3', status:'done'},
                "ABC-4": { id:'ABC-4', title:'tarea-4', status:'pending'},
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
      
              set(state =>{
                 state.tasks[taskId]={
                    ...state.tasks[taskId],
                    status,
                 }
              })
              //Posibles errores por la inmutabilidad del objeto 
            },

            addTask:(title:string,status:TaskStatus) =>{
                
                const newTask = {id:uuidv4(), title, status}
                 
                //? FORMAS DE MUTAR STATE
                
                // 1-IMMER DE ZUSTAND/MIDDLEWARE
                set(state=>{
                    state.tasks[newTask.id]=newTask
                })

                // 2-PRODUCE DE IMMER
                // set(produce((state:TaskState)=>{
                //     state.tasks[newTask.id] = newTask
                // }))    

                // 3-SPREAD OPERATOR
                //set(state=>({
                //    tasks:{
                //        ...state.tasks,
                //        [newTask.id]:newTask
                //    }
                //}))


            },

            // !combinar 3 metodos
            ontaskDrop:(status:TaskStatus)=>{

                const taskId = get().draggingTaskId; //puede ser un task o undefined
                
                if(!taskId) return; // si no hay nada

                get().changeStatus(taskId,status); // Si se mueve cambia el status
                get().removeDraggingTaskId(); 
            },
            
            totalTasks:()=>{
                
                const tasks = get().tasks
               
                const totales = Object.keys(tasks).length

                return totales
            
            },
                 
})
     
    



export const useTaskStore = create<TaskState>()(
  
  devtools(
     persist(
        immer(storeApiTask),
        
        {name:'task-store'}
      )
    )
) 

