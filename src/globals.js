import log from 'debug';

log.enable('app,app:error');
globalThis.log = log('app');
globalThis.logError = log('app:error');
