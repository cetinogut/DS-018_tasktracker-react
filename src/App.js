import {useState} from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';


function App() {
  const [tasks, setTasks] =useState(  // this state should be in redux or ContexAPI but we don't use them in this project. For this reason it should be at global level. And should be here.
    [
        {
            id:1,
            text:'Doctors Appointment',
            day:'Feb 5th 2:30pm',
            reminder: true
        },
        {
            id:2,
            text:'Meetin at school',
            day:'Feb 6th 1:30pm',
            reminder: true
        },
        {
            id:3,
            text:'Food Shopping',
            day:'Feb 5th 2:30pm',
            reminder: false
        }
    
    ]
)

  const name = 'Cogut'

  // delete task
  const deleteTask = (id) => {
    console.log('deleted', id);
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // toggle reminder
  const toggleReminder = (id) => {
    console.log(id)
    setTasks(
      tasks.map( (task) =>
      task.id=== id ? {...task, reminder: !task.reminder} : task
      )
    )
  }

  return (
    <div className="container">
      {/* <Header title='Hello there..' /> embed components like an xml in App.js. Also you can use props fro passing data. We defined title here and will pass in header.js */}
      {/*<Header  title = { 2*3 }/>  You can type any valid JS here , if nothing, if no title included here , it can print the default props given in Header.js*/}
      <Header />
      <AddTask/>
      {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete= {deleteTask} onToggle={toggleReminder} /> : 'No tasks to show'} {/* onDelete is a prop of tasks */} 
    </div>
  );
}

export default App;
