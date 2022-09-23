import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return <h2>{t('notFound.title')}</h2>;
};

export default NotFound;
