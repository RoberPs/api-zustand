
import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';
import { useShallow } from 'zustand/shallow';



export const JiraPage = () => {

  
  const pendingStatus = useTaskStore(useShallow(state=>state.getTaskByStatus('pending')))
  const inprogressStatus = useTaskStore(useShallow(state=>state.getTaskByStatus('in-progress')))
  const doneStatus = useTaskStore(useShallow(state=>state.getTaskByStatus('done')))
  

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks title='Pendientes' status='pending' tasks={pendingStatus} />
          
          <JiraTasks title='Avanzando' status='in-progress' tasks={inprogressStatus} />
          
          <JiraTasks title='Terminadas' status='done' tasks={doneStatus} />

      </div>


    </>
  );
};