// import toExport from './modules/toExport.js';
// import * as toExportES from './modules/toExportES.mjs';

// console.log('toExport: ', toExport);
// console.log('toExportES: ', toExportES);

const toExportES6 = await import('./modules/toExportES.mjs');
console.log('toExportES6: ', toExportES6);

const toExportCJS = await import('./modules/toExport.js');
console.log('toExportCJS: ', toExportCJS);
