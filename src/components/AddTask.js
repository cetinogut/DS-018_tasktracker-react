import { useState } from 'react'

const AddTask = ({ onAdd }) => {

    const [text, setText] = useState('') // componenet level state
    const [day , setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault() /* we are not submitting directly t oa page so we prevent default*/

        // short validation
        if(!text) {// if no text input in the task description field in the form
            alert('please add a task!!!')
        }

        onAdd({ text, day, reminder })

        setText('') // clear the form
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit= { onSubmit }>

            <div className='form-control'>
                <label htmlFor="">Task</label>
                <input type="text" placeholder='add task...' 
                value={text} 
                onChange={ (e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label htmlFor="">Day & Time</label>
                <input type="text" placeholder='add day & time...' 
                value={day} 
                onChange={ (e) => setDay(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label htmlFor="">Set Reminder</label>
                <input type="checkbox"  
                checked={reminder} // initial value
                value={reminder} 
                onChange={ (e) => setReminder(e.currentTarget.checked)}/>
            </div>
            
            <input type="submit" value="Save Task" className='btn btn-block' />
        </form>
    )
}

export default AddTask
