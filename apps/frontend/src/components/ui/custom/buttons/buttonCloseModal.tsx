import React from 'react'
import { Button } from '../../button';
import clsx from 'clsx';

export default function ButtonCloseModal({ resetForm, title = "Cancelar", grow = false}: { resetForm: () => void, title?: string, grow?: boolean }) {
  return (
    <Button variant={'secondary'}
    onClick={(e) => {
      e.preventDefault();
      resetForm();
    }}
    className={clsx("text-xl font-bold py-6", {"w-full max-w-[206px]": !grow}, {"flex-grow": grow})} 
  >
    {title}
  </Button>
  )
}
