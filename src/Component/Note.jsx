import React, { useState } from 'react';

const Note = () => {

    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [task, setTask] = useState([]);
    

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log('Heading is', title)
        // console.log('Description', des)

        const newTask = [...task]
        newTask.push({ title, des })
        setTask(newTask)
        console.log(newTask)

        setTitle('')
        setDes('')
    }


    const deleteNote = (index) => {
        // console.log('deleted', index)
         const newTask = [...task]
         newTask.splice(index,1)
         setTask(newTask)
    }

    return (
        <div className='h-screen lg:flex bg-black text-white overflow-auto'>
            <form onSubmit={handleSubmit} className='flex flex-col lg:w-1/2  items-start gap-4 p-10'>
                <h3 className='text-4xl font-bold pb-4'>Add Notes</h3>
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type='text' value={title} placeholder='Write heading' required className=' border-2 rounded px-3 py-3 outline-none w-full font-medium'></input>
                <textarea onChange={(e) => {
                    setDes(e.target.value)
                }} type='text' value={des} placeholder='Write note' required className=' border-2 w-full px-3 py-3 h-32 rounded outline-none font-medium'></textarea>
                <button className='border-2 w-full bg-white text-black py-2 px-4 font-semibold rounded text-lg outline-none active:bg-gray-200 cursor-pointer active:scale-95'>Add Note</button>
            </form>

            <div className='lg:w-1/2 lg:border-l-2 p-10 overflow-auto'>
                <h3 className='text-4xl font-bold'>Recent Notes</h3>
                <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4'>

                    {task.map(function (item, index) {

                        return <div key={index} className='h-52 w-36 flex flex-col justify-between items-start relative bg-cover bg-center bg-[url("https://t3.ftcdn.net/jpg/15/11/17/06/360_F_1511170665_HTCBlRKyWnRHoehUp6yauoNKtFnhtjh7.jpg")] rounded overflow-hidden'>
                            <div className='overflow-y-auto h-full'>
                                <h2 className='text-black text-xl font-bold leading-tight px-2 mt-5'>{item.title}</h2>
                                <h2 className='text-gray-700 font-medium leading-relaxed text-sm px-2 mt-1'>{item.des}</h2>
                            </div>
                            <button onClick={() =>{
                                deleteNote(index)
                            }} className='w-full border py-1 cursor-pointer active:scale-95 bg-red-600 text-sm font-semibold'>Delete</button>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Note;