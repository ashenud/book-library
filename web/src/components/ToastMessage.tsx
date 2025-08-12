import { Toast } from 'bootstrap';
import React, { useEffect, useRef } from 'react';

type ToastMessageProps = {
  type?: 'success' | 'danger' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
};

const ToastMessage: React.FC<ToastMessageProps> = ({ type = 'info', message, onClose }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastRef.current) {
      const toast = new Toast(toastRef.current, { delay: 3000 });
      toast.show();
      toastRef.current.addEventListener('hidden.bs.toast', () => {
        onClose && onClose();
      });
    }
  }, [onClose]);

  return (
    <div
      className='toast align-items-center text-white border-0'
      style={{
        backgroundColor:
          type === 'success' ? '#28a745' : type === 'danger' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8',
      }}
      role='alert'
      ref={toastRef}
    >
      <div className='d-flex'>
        <div className='toast-body'>{message}</div>
        <button type='button' className='btn-close btn-close-white me-2 m-auto' data-bs-dismiss='toast'></button>
      </div>
    </div>
  );
};

export default ToastMessage;
