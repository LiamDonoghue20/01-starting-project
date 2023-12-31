import { createPortal } from 'react-dom'
import { forwardRef, useImperativeHandle, useRef } from 'react';
import Button from './Button';

const Modal = forwardRef( function Modal({children, buttonText}, ref){
    //local reference for the dialog of the modal
    const dialog = useRef();
    //Use imperative handle exposes this function (to open the modal) so it can be used in other components
    useImperativeHandle(ref, () => {
        return {
            open() {
                //show the modal for the current value of the dialog ref
                dialog.current.showModal()
            }
        }
    });
    //create portal is to move a component to a different level on the dom, this adds the button to modal-root so it shows ontop
    //of the rest of the dom which can prevent issues with visability
    return createPortal(
        <dialog ref={dialog} className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'>
            {children}
            <form method="dialog" className='mt-4 text-right'>
                <Button>{buttonText}</Button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    )

})

export default Modal;