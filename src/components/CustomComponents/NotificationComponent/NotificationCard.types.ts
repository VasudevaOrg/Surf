import {JSX} from 'react';

export type NotificationCardProps = {
  id: string;
  title: string;
  time: string;
  icon: JSX.Element;
  bg: string;
  isRead?: boolean;
};
