import { ChevronRightIcon, TrashIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Button from "./Button";

function Tasks(props) {
    const navigate = useNavigate();
    
    function onSeeDetailsclick(task) {
        const query = new URLSearchParams();
        query.set('title', task.title);
        query.set('description', task.description);
        navigate(`/task?${query.toString()}`);
               
    }

    return <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">{props.tasks.map((t) => 
            <li key={t.id}  className="flex gap-2">                
                <button 
                    onClick={() => props.taskClick(t.id)} 
                    className={`bg-slate-400 text-left w-full text-white p-2 rounded-md ${t.isCompleted && "line-through"}`}
                >
                    {t.title}
                    
                </button>
                
                <Button 
                    onClick={() => onSeeDetailsclick(t)} className="bg-slate-400 p-2 rounded-md text-white">
                    <ChevronRightIcon/>
                </Button>

                <Button
                    onClick={() => props.deleteTask(t.id)}                   
                >
                    <TrashIcon/>
                </Button>
            </li>
        )
    }</ul>
}

export default Tasks