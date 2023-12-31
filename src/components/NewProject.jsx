import Input from './Input'
import Modal from './Modal';
import { useRef } from 'react';

export default function NewProject({onAdd, onCancel}) {
    //references for all of the fields required to add a project, along with one for the modal to open it upon an error (empty string)
    const modal = useRef()
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave(){
        //sets local variables to the current values of the reference
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;
        //if any of the values are empty, return the error modal
        if(enteredTitle.trim() === ''||
        enteredDescription.trim() === ''||
        enteredDueDate.trim() === '') {

            modal.current.open();
            return;

        }
        //call the on add method and send a project object with all the fields
        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    }

    return (
    <>
        <Modal ref={modal} buttonText="Close">
            <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
            <p className='text-stone-600 mb-4'>Looks like you forgot to enter a value</p>
        </Modal>
        <div className='w-[35rem] mt-16'>
            <menu className='flex items-center justify-end gap-4 my-4'>
                <li>
                    <button className='text-stone-800 hover:text-stone-950' onClick={onCancel}>Cancel</button>
                    <button className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'
                        onClick={handleSave}>Save</button>
                </li>
            </menu>
            <div>
                <Input type="text" ref={title} label="Title"/>
                <Input ref={description} label="Description" textarea/>
                <Input type="date" ref={dueDate} label="Due Date"/>
            </div>
        </div>
        </>
    )
}