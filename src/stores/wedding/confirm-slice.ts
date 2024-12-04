import { StateCreator } from 'zustand';


export interface ConfirmationSlice{
    isConfirmed:boolean

    setConfirmed:(value:boolean)=>void
}


export const createConfirmationSlice: StateCreator <ConfirmationSlice> = (set,get)=>({

    isConfirmed:false,

    setConfirmed:(value:boolean)=>set({isConfirmed:value})
    
})