import { useBearStore } from '../../stores';
import { WhiteCard } from '../shared/cards/WhiteCard';
export const PolarBears = () => {
    
    const polarBears = useBearStore(state=>state.polarBears)
    const updatePolarBearQuantity = useBearStore(state=>state.updatePolarBearQuantity)
    return (
    
     <WhiteCard centered>
        <div>
        
          <h2>Osos Polares</h2>

            <div className="flex flex-col md:flex-row">
            
                <button 
                    onClick={()=>updatePolarBearQuantity(+1)}
                > +1
                </button>
                <span className="text-3xl mx-2 lg:mx-10">{polarBears}</span>
                    <button
                        onClick={()=>{ 
                            if(polarBears > 0){
                                updatePolarBearQuantity(-1)
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