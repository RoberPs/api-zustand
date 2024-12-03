import { WhiteCard } from "../shared/cards/WhiteCard"
import { useBearStore } from "../../stores"


export const BearDetails = () => {
   
  const bears = useBearStore(state=>state.bears)
  const addBears = useBearStore(state=>state.addBears)
  const clearBears = useBearStore(state=>state.clearBears)


  return (

    <WhiteCard>
        <h1>Osos</h1>
        <div className="flex flex-col gap-2">
            <button className="w-60" onClick={()=>addBears()}>Agrega Osos</button>
            <button className="w-60"onClick={()=>clearBears()}>Borrar Osos</button>

         
            {bears.length !== 0 ? (<p>{JSON.stringify(bears)} </p>):''}
  
        </div>
        <div>BearDetails</div>
    </WhiteCard>
  )
}

