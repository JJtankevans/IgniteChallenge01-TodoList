import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
      
      if(!newTaskTitle) return;

      //Gera id aleatório
      const randId = Math.floor(Date.now() * Math.random())
      //Cria um item do tipo task
      let newTask: Task = {
        "id": +randId,
        "title": newTaskTitle,
        "isComplete": false,
      }

        //Atualiza o estado da lista de tasks
        setTasks([...tasks,newTask])
        //Reseta o texto dentro do input
        setNewTaskTitle('');
        /* Feito na correção 
        setTasks(oldState => [...oldState,newTask]);
        setNewTaskTitle(''); -> Serve para resetar o Todo
        */
      
  }

  function handleToggleTaskCompletion(id: number) {
    //Marca como concluido feito por mim
    /*tasks.forEach(element => {
      if(element.id == id) {
        if(element.isComplete == false){
          element.isComplete = true
        }else {
          if(element.isComplete == true){
            element.isComplete = false
          }
        }
        setTasks([...tasks])
      }
    });*/

    //Como foi feito na correção vou deixar pq ficou mais estiloso
    const newtasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)

    setTasks(newtasks)
  }

  function handleRemoveTask(id: number) {

    /* Como foi feito na correção
    const filteredtasks = tasks.filter(e => e.id != id)
    */

    //HAHAHAHHA FIZ SEM A CORREÇÃO
    setTasks([...tasks.filter((element) => element.id != id)])
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}