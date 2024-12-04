import { WhiteCard } from '../../components';
import { useWeddingBoundStore } from '../../stores/wedding';


export const WeddingInvitationPage = () => {

  const firstName = useWeddingBoundStore(state=>state.firstName)
  const lastName = useWeddingBoundStore(state=>state.lastName)
  const setFirstName = useWeddingBoundStore(state=>state.setFirstName)
  const setLastName = useWeddingBoundStore(state=>state.setLastName)
  
  const guestCount = useWeddingBoundStore(state=>state.guestCount)
  const setGuestCount = useWeddingBoundStore(state=>state.setGuestCount)
  
  const eventDate = useWeddingBoundStore(state=>state.eventDate)
  const eventYYMMDD = useWeddingBoundStore(state=>state.eventYYMMDD)
  const eventHHDD = useWeddingBoundStore(state=>state.eventHHDD)
  
  const setEventDate = useWeddingBoundStore(state=>state.setEventDate)
  const setEventTime = useWeddingBoundStore(state=>state.setEventTime)

  const isConfirmed = useWeddingBoundStore(state=>state.isConfirmed)
  const setConfirmed = useWeddingBoundStore(state=>state.setConfirmed)

  

  const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log({
      formData:{firstName,lastName,guestCount,eventDate,isConfirmed}
    })
  }


  return (
    <>
      <h1>Invitación de Boda</h1>
      <p>Zustand segmentado en slices</p>
      <hr />

      <WhiteCard className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Primer Nombre
                  </label>
                  <input
                    value={firstName}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Primer Nombre"
                    onChange={(e)=>setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Apellido
                  </label>
                  <input
                    value={lastName}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Apellido"
                    onChange={(e)=>setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                ¿Cuántos invitados traerá?
              </label>
              <input
                type="number"
                name="guestNumber"
                id="guestNumber"
                placeholder="5"
                min={1}
                value={guestCount}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e)=>setGuestCount(+e.target.value)}
             />
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Fecha de evento
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    id="eventDate"
                    value={eventYYMMDD()}
                    onChange={(e)=>setEventDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Hora del evento
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    id="eventTime"
                    value={eventHHDD()}
                    onChange={(e)=>setEventTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                ¿Tu también vendrás?
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton1"
                    className="h-5 w-5"
                    checked={isConfirmed}
                    onChange={()=>setConfirmed(true)}
                  />
                  <label
                    className="pl-3 text-base font-medium text-[#07074D]"
                  >
                    Si
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton2"
                    className="h-5 w-5"
                    checked={!isConfirmed}
                    onChange={()=> setConfirmed(false)}
                  />
                  <label
                    className="pl-3 text-base font-medium text-[#07074D]"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button>
                Enviar
              </button>
            </div>
          </form>
        </div>
      </WhiteCard>
    </>
  );
};