
import { BlackBears, PolarBears, PandaBears,BearDetails } from '../../components/Bears';


/* export type BearsType={
   id:number,   
   name:string
}[]

const bears:BearsType = [
   { 
    id:1, 
    name: 'Osos Negros'
   },
   {id:2,name: 'Osos Polares'},
   {id:3,name: 'Osos Panda'},
] */



export const BearPage = ()=> {


  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  
          <BlackBears />
           
          <PolarBears />

          <PandaBears />

          <BearDetails/>

      </div>

    </>
  );
};