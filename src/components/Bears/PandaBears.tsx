import { useBearStore } from '../../stores';
import { WhiteCard } from '../shared/cards/WhiteCard';

export const PandaBears = () => {
    
    const pandaBears = useBearStore(state=>state.pandaBears)
    const updatePandaBearQuantity = useBearStore(state=>state.updatePandaBearQuantity)
   
    return (
    <WhiteCard centered>
        <div>

        <h2>Osos Panda</h2>

        <div className="flex flex-col md:flex-row">
        <button     
            onClick={()=>updatePandaBearQuantity(+1)}
        > +1
        </button>
        <span className="text-3xl mx-2 lg:mx-10">{pandaBears}</span>
            <button
                onClick={()=>{ 
                    if(pandaBears > 0){
                        updatePandaBearQuantity(-1)
                        return;
                      }
                }}
            > -1
            </button>
        </div>
        </div>   
        </WhiteCard>

  )
}