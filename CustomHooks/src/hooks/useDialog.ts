import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, selectDialogMessage, toggle } from '../redux/modules/dialog';

type UseDialogType = () => {
  isOpend: boolean;
  message: {
    title: string;
    description: string;
  };
  closeDialog: () => void;
};
export const useDialog: UseDialogType = () => {
  const dispatch = useDispatch();
  const isOpend = useSelector(selectDialog);
  const message = useSelector(selectDialogMessage);

  const closeDialog = () => {
    dispatch(toggle());
  };

  return { isOpend, message, closeDialog };
};
