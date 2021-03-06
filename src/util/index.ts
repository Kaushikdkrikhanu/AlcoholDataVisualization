import { Wine } from "../interfaces/index";

//return an array with values malic acid content per class
export const average = (wines: Wine[]): number[] => {
  
 
 
  const total = wines.reduce(
    //The total malicAcid per class in index 0,1,2 and total count per class in index 3,4,5.
    (prev, curr) => {
      if (curr.class === 1) {
        prev[0]+= curr.malicAcid;
        prev[3]+=1;
      } else if (curr.class === 2) {
        prev[1]+= curr.malicAcid;
        prev[4]+=1;
      } else {
        prev[2]+= curr.malicAcid;
        prev[5]+=1;
      }
      return prev; 
    },
    [0, 0, 0, 0, 0, 0]
  );
  const average = [
    total[0] / total[3],
    total[1] / total[4],
    total[2] / total[5],
  ];

  return average;
};
