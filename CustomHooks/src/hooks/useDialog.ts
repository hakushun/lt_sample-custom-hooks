import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, selectDialogMessage, toggle } from '../redux/modules/dialog';

type UseDialog = () => {
  isOpend: boolean;
  message: {
    title: string;
    description: string;
  };
  closeDialog: () => void;
};
export const useDialog: UseDialog = () => {
  const dispatch = useDispatch();
  const isOpend = useSelector(selectDialog);
  const message = useSelector(selectDialogMessage);

  const closeDialog = () => {
    dispatch(toggle());
  };

  return { isOpend, message, closeDialog };
};
