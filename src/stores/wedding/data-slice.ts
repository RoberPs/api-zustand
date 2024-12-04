import { StateCreator } from "zustand";


export interface DateSlice{
    eventDate:Date;
    
    eventYYMMDD:()=>string,
    eventHHDD:()=>string,

    setEventDate:(parcialData:string)=> void 
    setEventTime:(eventTime:string)=> void

    
}

export const createDateSlice:StateCreator<DateSlice> = (set,get)=>({

    eventDate:new Date(),

    // ! SET OBTIENE EL STATE
    // ? GET OBTIENE LOS VALORES DEL STATE

    eventYYMMDD:() =>{
        
        return get().eventDate.toISOString().split('T')[0]
    },
    eventHHDD:()=> {
        
        const hours = get().eventDate.getHours().toString().padStart(2, '0');
        const minuts = get().eventDate.getMinutes().toString().padStart(2,'0');

        return `${hours}:${minuts}`
    },
    setEventDate:(parcialDate:string)=> set((state) =>{
        
        //Otener la fecha que la persona selecciona del el input por parametro
        const dateInput = new Date(parcialDate)
        console.log(dateInput)
        
        //Separar los datos
        const year = dateInput.getFullYear();
        const month = dateInput.getMonth() ;
        const day = dateInput.getDate()
        
        //La nueva fecha que sustituye a la actual del state
        const newDate = new Date(state.eventDate);// Se crea una nuena fecha basada en la anterior
        newDate.setFullYear(year,month,day)// añadir los datos para crear esa fecha
        console.log(newDate) 

        return {eventDate:newDate}

    }),
    setEventTime:(eventTime:string) =>set((state)=>{
        
        //Extraer los dos valores de la hora
        const hours = parseInt(eventTime.split(':')[0])
        const minutes = parseInt(eventTime.split(':')[1])
        
        //Crear una nueva fecha basada en la inicial del state
        const newDate = new Date(state.eventDate)
        newDate.setHours(hours,minutes) //Añdir la nueva hora
        console.log(newDate)

        
        return{eventDate:newDate} 


    })

})