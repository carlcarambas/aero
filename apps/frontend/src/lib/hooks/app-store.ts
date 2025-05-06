import { User } from '@aero/api-client';
import { ModalProps } from 'antd';
import { create, StoreApi } from 'zustand';

type TErrorDetails = {
  message: string;
  description: string;
  status: number;
};

type ModalContentType = ModalProps & { form: React.JSX.Element | null };

export type TAdminModalContent = {
  title: string;
  form: React.JSX.Element | null;
  okButtonText?: string;
  cancelButtonText?: string;
  onOk?: () => void;
  onCancel?: () => void;
} | null;

type AppState = {
  isLoading: boolean;
  showModal: boolean;
  modalContent?: ModalContentType | null;
  errorDetails?: TErrorDetails;
};

type AppActions = {
  setIsLoading: (isLoading: boolean) => void;
  setShowModal: (showModal: boolean, modalContent?: ModalContentType) => void;
};

export type AppSlice = AppState & AppActions;

const initialState: AppState = {
  isLoading: false,
  errorDetails: undefined,
  showModal: false,
  modalContent: null,
};

export type AppStore = {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  user: User | null;
  clear: () => void;
  set: StoreApi<AppStore>['setState'];
};

export const useAppStore = create<AppSlice>((set) => ({
  ...initialState,
  setIsLoading: (isLoading: boolean) => {
    set(() => ({
      isLoading: isLoading,
    }));
  },
  setShowModal: (showModal: boolean, modalContent?: ModalContentType) => {
    set(() => ({
      showModal: showModal,
      modalContent: modalContent || null,
    }));
  },
}));
