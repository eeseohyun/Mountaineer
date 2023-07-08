import { ModalCSSProps } from './modals';

interface AlertModalProps extends ModalCSSProps {
  title: string;
  message: string; // 텍스트만 있는 경우 message
  confirmText?: string; // 확인 버튼 텍스트
  cancelText?: string; // 취소 버튼 텍스트
  children?: React.ReactNode; // 텍스트 외에 다른 컴포넌트가 있는 경우 children
  onConfirm: () => void; // 확인 버튼 클릭 시 실행할 함수
  onCancel: () => void; // 취소 버튼 클릭 시 실행할 함수
}

const ConfirmModal = ({
  title,
  message,
  children,
  confirmType = 'confirm',
  confirmText = '확인',
  cancelText = '취소',
  alignType = 'top',
  onCancel,
  onConfirm,
}: AlertModalProps) => {
  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50">
      <div className="fixed z-60 max-w-md mx-auto mt-20 bg-white rounded-lg p-8">
        <h2 className="mb-4">{title}</h2>
        <div>
          {message}
          {children}
        </div>
        <div className="flex justify-end mt-5">
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-red-400 hover:bg-red-500 rounded-lg mr-2 font-semibold text-white"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-teal-400 hover:bg-teal-600 text-white rounded-lg font-semibold"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
