import React from 'react';
import { useDispatch } from 'react-redux';
import { toggle } from '../../redux/modules/dialog';
import { Dialog as Preasentational } from './Dialog';

type Props = {
  message: { title: string; description: string };
};

export const Dialog: React.FC<Props> = ({ message }) => {
  const dispatch = useDispatch();

  const closeDialog = () => {
    dispatch(toggle());
  };
  return <Preasentational message={message} closeDialog={closeDialog} />;
};
