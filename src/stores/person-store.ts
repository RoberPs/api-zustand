import {create, StateCreator} from "zustand";
import {persist ,devtools} from 'zustand/middleware'
/* import { customSessionStorage } from "./storages/session-storage"; */
/* import { firebaseStorage } from "./storages/firebase-storage"; */
/* import { logger } from "./middlewares/logger-middleware";
 */

//TIPADO DATOS
interface PersonState {
    firstName:string,
    lastName:string
   
}
//TIPADO METODOS
interface Actions{
    setFirstName:(value:string) =>void
    setLastName:(value:string) =>void
}


/*este tipado se debe indicar en el Generic del store para aplicar configuraciones en extension Redux [["zustand/devtools", never]] */
//DATOS Y METODOS PARA LOCAL STORAGE
const storeApi:StateCreator <PersonState & Actions,[["zustand/devtools", never]]> = (set)=> ({
   
    firstName:'',
    lastName:'',

    setFirstName:(value:string)=> set(({firstName:value}),false,'setFirstName'),
    setLastName:(value:string)=> set(({lastName:value}),false,'setLastName'),
})


//STORE 
export const usePersonStore = create<PersonState & Actions>()(
    
    
        devtools(  

        //MIDDLEWARE Persist Guarda los datos en local storage o session storage (se crea una función aparte con los datos y metodos para simplificar)
              
             // * 1- LS / 2- SS  / 3- FIREBASE
        
             persist(storeApi,
                 {
                    name:'person-storage',
                    // ? storage:customSessionStorage
                    // ? storage:firebaseStorage
                } 
            )
        )
   
)