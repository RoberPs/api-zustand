import{StateStorage, createJSONStorage} from 'zustand/middleware'


const firebaseUrl = 'https://zustand-storage-ro-default-rtdb.europe-west1.firebasedatabase.app/zustand'


//CUSTOM STORAGE  OBJETO REUTILIZABLE 
//* GUARDAR DATOS EN FIREBASE 
const storageApi:StateStorage ={
     

    //Enviar y actualizar los valores a firebase 
    setItem: async function (name: string, value: string):Promise<void | string> {
    
        const data = await fetch(`${firebaseUrl}/${name}.json`,{
            method:'PUT',
            body:value
        }).then(response=> response.json())
        
        /* console.log('setItem') */
        return  data
    },


    //Obtener LOS VALORES 
    getItem: async function (name: string):Promise<string | null> {
         
        try {

            const data = await fetch(`${firebaseUrl}/${name}.json`).then(response=> response.json())
            console.log(data)
            return JSON.stringify(data)             
            
        } catch (error) {

            throw error
        }
    },



    removeItem: function (name: string): void{
        console.log('removeItem',name)
        return
    }
}

export const firebaseStorage = createJSONStorage(()=>storageApi)