import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth.js';
import '../styles/header.css';

function Header() {
  const { t } = useTranslation();
  const { user, logOut } = useAuth();

  return (
    <div className="header">
      <Link className="header__logo" to="/">
        {t('hexletChat')}
      </Link>
      {user.userName !== 'guest' && (
        <button
          className="button button_secondary button_small header__exit"
          type="button"
          onClick={logOut}
        >
          {t('logout')}
        </button>
      )}
    </div>
  );
}

export default Header;
