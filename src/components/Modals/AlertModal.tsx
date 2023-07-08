import { ModalCSSProps } from './modals';

interface AlertModalProps extends ModalCSSProps {
  title: string;
  message: string; // 텍스트만 있는 경우 message
  children?: React.ReactNode; // 텍스트 외에 다른 컴포넌트가 있는 경우 children
  confirmText?: string; // 확인 버튼 텍스트
  onConfirm: () => void; // 확인 버튼 클릭 시 실행할 함수
}

const AlertModal = ({
  title,
  message,
  children,
  confirmType = 'confirm', //warning
  confirmText = '확인',
  alignType = 'top',
  onConfirm,
}: AlertModalProps) => {
  const modalContainerClasses = `fixed z-50 w-full max-w-lg bg-white rounded-lg p-8 box-border ${
    alignType === 'center'
      ? 'top-half left-half translate-center'
      : alignType === 'top'
      ? 'top-44 left-half translate-x-center'
      : 'top-half left-half translate-center'
  }`;

  const confirmButtonClasses = `px-4 py-2 rounded-md font-semibold cursor-pointer ${
    confirmType === 'confirm'
      ? 'bg-blue-500 hover:bg-blue-600'
      : confirmType === 'warning'
      ? 'bg-red-500 text-white hover:bg-red-600'
      : 'bg-blue-500 hover:bg-blue-600'
  }`;
  return (
    <div className="fixed z-40 inset-0 bg-black bg-opacity-50">
      <div className={modalContainerClasses}>
        <h2 className="mb-4">{title}</h2>
        <div>
          {message}
          {children}
        </div>
        <div className="flex justify-end mt-5">
          <button onClick={onConfirm} className={confirmButtonClasses}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
