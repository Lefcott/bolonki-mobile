import { LANGUAGE_ACTIONS } from '../constants';

export const setLanguage = lang => ({ type: LANGUAGE_ACTIONS.SET_LANGUAGE, payload: lang });
