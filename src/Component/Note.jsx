import React, { useEffect, useRef, useState } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { MdFolderDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";



const Note = () => {

    // localStorage.removeItem('note');

    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [note, setNote] = useState(() => {
        const storeNote = localStorage.getItem('note');
        return storeNote ? JSON.parse(storeNote) : []
    })
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('note', JSON.stringify(note))
    }, [note])

    useEffect(() => {
        if (edit && inputRef.current) {
            inputRef.current.focus();
        }
    }, [edit])

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log('Heading is', title)
        // console.log('Description', des)
        const id = new Date().getTime().toString();

        const newNote = {
            id: id,
            title: title,
            des: des,
        }
        setNote((prev) => {
            return [newNote, ...prev]
        })
        setTitle('')
        setDes('')
        setOpen(!open)
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const id = editId
        const newNote = {
            id: id,
            title: title,
            des: des,
        }
        setNote(
            note.map((note) => note.id === id ? newNote : note)
        )
        setTitle('')
        setDes('')
        setEdit(false);
        setOpen(false)
    }

    const deleteNote = (id) => {
        const fil = note.filter((note) => note.id !== id)
        setNote(fil)
    }

    return (
        <div className='h-screen overflow-auto flex flex-col md:flex-row bg-black text-white'>
            {
                open &&
                <div className='w-full xl:w-2/3'>
                    {
                        edit ? (
                            <div>
                                <form onSubmit={handleEdit} className='w-full flex flex-col  items-start gap-4 px-4 lg:px-10 py-10'>
                                    <div className='flex items-center gap-8 justify-between sm:justify-normal'>
                                        <h3 className='text-3xl lg:text-3xl font-bold'>Update Note</h3>
                                        {
                                            open &&
                                            <button onClick={() => {
                                                setOpen(!open);
                                                setEdit(false);
                                            }}
                                                className='bg-white text-red-600 font-medium px-2 py-1 rounded'>
                                                Cancel
                                            </button>
                                        }
                                    </div>
                                    <input ref={inputRef} onChange={(e) => {
                                        setTitle(e.target.value)
                                    }} type='text' value={title} placeholder='Write heading' required className=' border-2 rounded px-3 py-2 md:py-3 outline-none w-full font-medium'></input>
                                    <textarea onChange={(e) => {
                                        setDes(e.target.value)
                                    }} type='text' value={des} placeholder='Write note' required className=' border-2 w-full px-3 py-3 h-28 md:h-32 rounded outline-none font-medium'></textarea>
                                    <button className='border-2 w-full bg-white text-black py-2 px-4 font-semibold rounded text-[16px] md:text-[17px] outline-none active:bg-gray-200 cursor-pointer active:scale-95'>Update Note</button>
                                </form>
                            </div>

                        ) : (
                            <div>
                                <form onSubmit={handleSubmit} className='w-full flex flex-col  items-start gap-4 px-4 lg:px-10 py-10'>
                                    <div className='flex items-center gap-8 justify-between sm:justify-normal'>
                                        <h3 className='text-3xl lg:text-3xl font-bold'>Add Notes</h3>
                                        {
                                            open &&
                                            <button onClick={() => {
                                                setOpen(!open);
                                            }}
                                                className='bg-white text-red-600 font-medium px-2 py-1 rounded'>
                                                Cancel
                                            </button>
                                        }
                                    </div>
                                    <input onChange={(e) => {
                                        setTitle(e.target.value)
                                    }} type='text' value={title} placeholder='Write heading' required className=' border-2 rounded px-3 py-2 md:py-3 outline-none w-full font-medium'></input>
                                    <textarea onChange={(e) => {
                                        setDes(e.target.value)
                                    }} type='text' value={des} placeholder='Write note' required className=' border-2 w-full px-3 py-3 h-28 md:h-32 rounded outline-none font-medium'></textarea>
                                    <button className='border-2 w-full bg-white text-black py-2 px-4 font-semibold rounded text-[16px] md:text-[17px] outline-none active:bg-gray-200 cursor-pointer active:scale-95'>Add Note</button>
                                </form>
                            </div>)
                    }
                </div>
            }

            <div className='w-full md:border-l-2 px-4 lg:px-10 py-10 md:py-10 md:overflow-auto'>
                <div className='flex items-center gap-8 justify-between sm:justify-normal '>
                    <h3 className='text-3xl lg:text-3xl font-bold'>Recent Notes</h3>
                    {
                        !open &&
                        <button onClick={() => {
                            setOpen(!open);
                        }}
                            className='bg-white text-black font-medium px-2 py-1 rounded'>
                            Add Note
                        </button>
                    }
                </div>
                <div className=' mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 space-y-4 xl:grid-cols-4 gap-2'>
                    {note.length === 0 &&
                        <p className='text-red-500 text-center'>No Note added</p>
                    }
                    {
                        note.map((item) => (
                            <div key={item.id} className='h-60 text-white xl:h-66 relative rounded overflow-hidden '>
                                <img src='https://plus.unsplash.com/premium_photo-1670057973828-2175bd7c700f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className=' absolute inset-0 object-cover w-full h-full opacity-50' />

                                <div className='flex flex-col items-center justify-between'>
                                    <div className='absolute top-0 text-white left-0 right-0 bottom-6 p-2 overflow-auto scroll-smooth hide-scrollbar'>
                                        <h2 className='text-[15px] uppercase leading-tight font-medium'>{item.title}</h2>
                                        <hr className='border-t-2 mt-1.5'></hr>
                                        <p className='mt-2 leading-snug text-[15px] text-white/90'>{item.des}</p>
                                    </div>
                                    <div className='absolute bottom-0 left-0 right-0 text-white'>
                                        <div className='grid grid-cols-2'>
                                            <div onClick={() => deleteNote(item.id)}
                                                className='flex flex-col p-1  items-center justify-center bg-red-600'>
                                                <MdFolderDelete className='text-xl' />
                                            </div>
                                            <div onClick={() => {
                                                setEditId(item.id);
                                                setEdit(true);
                                                setTitle(item.title);
                                                setDes(item.des);
                                                setOpen(true)
                                            }}
                                                className='flex flex-col p-1 items-center justify-center bg-green-600'>
                                                <FaUserEdit className='text-xl' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Note;