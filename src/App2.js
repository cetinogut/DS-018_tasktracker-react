import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] =useState(  // this state should be in redux or ContexAPI but we don't use them in this project. For this reason it should be at global level. And should be here.
    [
        // { moved the data to db.json after installing json-server
        //     id:1,
        //     text:'Doctors Appointment',
        //     day:'Feb 5th 2:30pm',
        //     reminder: true
        // },
        // {
        //     id:2,
        //     text:'Meetin at school',
        //     day:'Feb 6th 1:30pm',
        //     reminder: true
        // },
        // {
        //     id:3,
        //     text:'Food Shopping',
        //     day:'Feb 5th 2:30pm',
        //     reminder: false
        // }
    
    ] )

    useEffect( () => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      }
        getTasks()
      }, [] // dependency array, we dont have currently so empty array
    )


  const name = 'Cogut'

// fetch tasks 
const fetchTasks = async() => {
  const res = await fetch ('http://localhost:5000/tasks')
  const data = await res.json()
  console.log(data)
  return data
}

// fetch task
const fetchTask = async(id) => {
  const res = await fetch (`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  console.log(data)
  return data
}

// add task
const addTask = async (task) => {
  console.log(task)
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'applicaiton/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])

  // //UI de çalışıyor, ancak bu kod DB ye yazmaz. DBye yazabilmesi için yukaıdaki bölümü yazdık..
  // const id = Math.floor(Math.random() * 10000) +1
  // console.log(id)
  // const newTask = { id, ...task} // added id to the task object
  // setTasks([...tasks, newTask]) // add this new task to the tasks array

}

  // delete task (this in fact deletes from UI. to delete from the db we added await fetch below)
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    console.log('deleted', id);
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // toggle reminder
  const toggleReminder =  async(id) => {

    console.log(id)
    const taskToToggle = await fetchTask(id)

    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder} // toggle reminder here
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'applicaiton/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()

    setTasks(
      tasks.map( (task) =>
      task.id=== id ? {...task, reminder: !data.reminder} : task
      )
    )
  }

  return (
   <Router>
    <div className="container">
      {/* <Header title='Hello there..' /> embed components like an xml in App.js. Also you can use props fro passing data. We defined title here and will pass in header.js */}
      {/*<Header  title = { 2*3 }/>  You can type any valid JS here , if nothing, if no title included here , it can print the default props given in Header.js*/}
      <Header  onAdd= {() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      
      <Route path='/' exact render={(props) => (
        <>
        { showAddTask && <AddTask onAdd={ addTask } />} 
        {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete= {deleteTask} onToggle={toggleReminder} /> : 'No tasks to show'} {/* onDelete is a prop of tasks */} 
        </>
      )} />
      <Route path='/about' component={About} />
      <Footer />
    </div>
  </Router>
  )
}

export default App;
