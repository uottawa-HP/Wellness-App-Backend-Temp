import IWellnessTip from './WellnessTipInterface';

const convertToWellnessTipSmartsheet = (cells:any[]) =>{
  //sets an interface for the wellness tips fetched 
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
