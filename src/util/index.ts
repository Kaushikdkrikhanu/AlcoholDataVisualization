import {Wine} from '../interfaces/index'

//return an array with values malic acid content per class
export const average = (wines: Wine[]): number[] => {
    let countClass1 = 0;
    let countClass2 = 0;
    let countClass3 = 0;
    
    const total = wines.reduce(
      (prev, curr) => {
        if (curr.class === 1){
          countClass1++;
          return [prev[0] + curr.malicAcid, prev[1], prev[2]];          //adding them in an array
        }              
        else if (curr.class === 2){
          countClass2++;
          return [prev[0], prev[1] + curr.malicAcid, prev[2]];
        }
        else {
          countClass3++;
          return [prev[0], prev[1], prev[2] + curr.malicAcid];}
      },
      [0, 0, 0]
    );
    const average = [
      total[0] / countClass1,
      total[1] / countClass2,
      total[2] / countClass3,
    ];

    return average;
  };