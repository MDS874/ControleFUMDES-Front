import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { PiStudentFill } from "react-icons/pi";

export const SidebarData = [
  {
    title: 'Inicio',
    path: '/home',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'Alunos',
    icon: <PiStudentFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Enviar Comprovante',
        path: '/alunos/enviar-comprovante',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Extrato',
        path: '/alunos/consultar-extrato',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Admin',
    icon: <RiIcons.RiAdminLine />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Listar Alunos',
        path: '/admin/alunos',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Solicitações',
        path: '/admin/solicitacoes',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  }
];
