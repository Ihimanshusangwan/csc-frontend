import React from 'react';
import '../css/common/header.scss';

interface HeaderProps {
  version: string;
}

const Header: React.FC<HeaderProps> = ({ version }) => {
  return (
    <div>
      <span className={`dokument-${version}`}>
        DOKUMENT <span className={`guru-${version}`}>GURU</span>
      </span>
    </div>
  );
};

export default Header;
