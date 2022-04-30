import { Wine } from "../interfaces/index";

//return an array with values malic acid content per class
export const average = (wines: Wine[]): number[] => {
  
  //The total malicAcid per class in index 0,1,2 and total count per class in index 3,4,5.

  const total = wines.reduce(
    (prev, curr) => {
      if (curr.class === 1) {
        return [
          prev[0] + curr.malicAcid,
          prev[1],
          prev[2],
          prev[3]+1,
          prev[4],
          prev[5],
        ]; 
      } else if (curr.class === 2) {
        return [
          prev[0],
          prev[1] + curr.malicAcid,
          prev[2],
          prev[3],
          prev[4]+1,
          prev[5],
        ];
      } else {
        return [
          prev[0],
          prev[1],
          prev[2] + curr.malicAcid,
          prev[3],
          prev[4],
          prev[5]+1,
        ];
      }
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
