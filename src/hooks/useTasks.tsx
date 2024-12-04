import { useState } from "react"
import Swal, { SweetAlertResult } from "sweetalert2"
import { useTaskStore } from "../stores"
import { Task } from "../types"

// * Cuando son Hooks se suele usar el nombre de Options para los props
interface Options{
    status:Task['status']
}
export const useTasks=({status}:Options)=>{
 
    
    const [onDrageOver, setOnDragOver] = useState(false)
    const isDragging = useTaskStore(state=>!!state.draggingTaskId) //evalua true o false
    /* const onchangeStatus = useTaskStore(state=>state.changeStatus)
    const draggingTaskId = useTaskStore(state=>state.draggingTaskId) */
    const ontaskDrop = useTaskStore(state => state.ontaskDrop)
    const newTask = useTaskStore(state=>state.addTask)
  
     
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
       //onchangeStatus(draggingTaskId!,status)
        ontaskDrop(status) 
    };

    const handleNewTask = async()=>{
      
    
        const resp:SweetAlertResult = await Swal.fire({
             title:'Nueva Tarea',
             input:'text',
             inputLabel:'Nombre de la tarea',
             inputPlaceholder:'Ingresa el nombre de la tarea',
             showCancelButton:true,
             cancelButtonColor:"#d33",
             confirmButtonText:'ok',
             confirmButtonColor: "#4f46e5",
             inputValidator:(value)=>{
                if(!value){
                   return 'Debe de indicar el nombre de la tarea'
                }
             }
        })
        /* console.log(resp) */
   
        if(!resp.isConfirmed) return;
        newTask(resp.value,status)
   
        return resp
        
    }


    return {
        onDrageOver,
        isDragging,
        handleDragOver,
        handleDragLeave,
        handleDragDrop,
        handleNewTask
    }
}