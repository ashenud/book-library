import React from 'react';
import ToastMessage from './ToastMessage';

type ToastItem = {
  id: number;
  type?: 'success' | 'danger' | 'warning' | 'info';
  message: string;
};

type Props = {
  toasts: ToastItem[];
  removeToast: (id: number) => void;
};

const ToastContainer: React.FC<Props> = ({ toasts, removeToast }) => {
  return (
    <div className='toast-container position-fixed bottom-0 end-0 p-3' style={{ zIndex: 1055 }}>
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} type={toast.type} message={toast.message} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

export default ToastContainer;
