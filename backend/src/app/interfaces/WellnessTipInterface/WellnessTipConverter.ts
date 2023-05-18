import IWellnessTip from './WellnessTipInterface';
// Convert to wellness tip format
const convertToWellnessTipSmartsheet = (cells:any[]) =>{
  const converted:IWellnessTip = {
    date:cells[1].value,
    specialDay:cells[2].value,
    tipEN:cells[3].value,
    tipFR:cells[4].value,
    source:cells[5].value
  };
  return converted;
};

export {
  convertToWellnessTipSmartsheet,
};
