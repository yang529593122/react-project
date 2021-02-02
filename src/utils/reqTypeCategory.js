const reqType = {
  select: ['4', '5', '6', '7'],
  input: ['1', '11'],
  date: ['9'],
};

export const reqTypeCategory = componentType => {
  let keysList = Object.keys(reqType);
  let typeName = '';
  for (let i = 0; i < keysList.length; i++) {
    if (reqType[keysList[i]].includes(componentType.toString())) {
      typeName = keysList[i];
      break;
    }
  }
  return typeName;
};
