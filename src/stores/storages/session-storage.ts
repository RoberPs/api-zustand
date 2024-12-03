import{StateStorage, createJSONStorage} from 'zustand/middleware'


//CUSTOM STORAGE  OBJETO REUTILIZABLE 
//* SESSION STORAGE  
const storageApi:StateStorage ={
     
    //Obtener el name de persist
    getItem: function (name: string): string | null | Promise<string | null> {
         
        const data = sessionStorage.getItem(name)
        return data
    },
    //Setear los valores del objeto
    setItem: function (name: string, value: string): void {
        
        sessionStorage.setItem(name,value);

    },
    removeItem: function (name: string): void{
        console.log('removeItem',name)
        return
    }
}

export const customSessionStorage = createJSONStorage(()=>storageApi)