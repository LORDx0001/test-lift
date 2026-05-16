import { createContext, useContext, useState } from 'react';
import { ru, uz } from './translations';

const I18nContext = createContext(null);

const dict = { ru, uz };

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('ru');
  const t = dict[lang] || dict.ru;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
