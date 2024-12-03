import { create } from 'zustand'
import { persist } from 'zustand/middleware'

//! No es necesario envolver el main con ningun Provider ni función


interface Bears{
    id:number,
    name:string,
}

interface BearState{
   
    blackBears:number,
    polarBears:number,
    pandaBears:number,

    bears:Bears[]
    
    totalBears:() => number


    /*computed:{
        totalBears:number
    } */

    updateBlackBearQuantity: (by: number)=> void;
    updatePolarBearQuantity: (by: number)=> void;
    updatePandaBearQuantity: (by: number)=> void;
    
    addBears:()=> void;
    removeBear:(id:number)=>void
    clearBears:()=>void;
}


// * State tipado con Generic 
export const useBearStore = create<BearState>()(
    
    //cursor al final de persist y despues del cierre del parentesis azul SHIFT 
    //crear un nuevo grupo de parentesis

    persist(
    
    //El funcionamiento de set y get se explica en la carpeta middlewares
    (set, get) => ({
     
    

    blackBears:10,
    polarBears:5,
    pandaBears:1,
    
    //*Anidar objetos y metodos
    bears:[],
    
    totalBears:()=>{
        return  get().blackBears + get().polarBears + get().pandaBears;
    },
    
    //* Propiedades computadas => obtener el total de osos con get de js
    /* computed:{ 
        get totalBears():number{
            return get().blackBears + get().polarBears + get().pandaBears;
        }
    }, */
    
    
    // * METODOS
    //? Metodo toma parametro => toma state(set) tomar propiedad = state.propiedad + numero (actualiza state)
    
    updateBlackBearQuantity:(by:number) => set((state) =>({blackBears: state.blackBears + by,})),
    updatePolarBearQuantity:(by:number) => set((state) =>({polarBears: state.polarBears + by,})),
    updatePandaBearQuantity:(by:number) => set((state) =>({pandaBears: state.pandaBears + by,})),
    
    // ? Tomamos compia del arreglo  y le añadimos el nuevo elemento
    addBears:() => set(state => ({
        bears:[
            ...state.bears,
           {id: state.bears.length +1 , name:`Oso ${ state.bears.length + 1}`}
        ]
    })),
    
    // ? Eliminar un elemento por id
    removeBear:(id:number)=> set(state =>({
         
          bears:state.bears.filter(item=> item.id !== id)
    })),


    // ? limpia el arreglo y borra datos
    clearBears:() => set({ bears:[  ]} )
    
}),

  {
    name:'bear-store'
  }


    ),


)