export const formatPetAge = (age: number): string => {
  let stringAge = '';
  if (age >= 1) {
    stringAge = age >= 2 ? `${age} ANOS` : `${age} ANO`;
  } else if (age < 1) {
    stringAge = age >= 0.2 ? `${age} MESES` : `${age} MÊS`;
  }

  return stringAge;
};
