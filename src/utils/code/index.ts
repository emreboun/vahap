interface TypeMap {
  [key: string]: string;
}

export function generateTypes(jsonObject: any): string {


  const typeMap: TypeMap = {};

  function parseObject(obj: any, parentKey: string = '') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const type = typeof value;

        const currentKey = parentKey ? `${parentKey}.${key}` : key;

        if (type === 'object' && value !== null) {
          parseObject(value, currentKey);
          typeMap[currentKey] = `I${key.charAt(0).toUpperCase() + key.slice(1)}`;
        } else {
          typeMap[currentKey] = type;
        }
      }
    }
  }

  parseObject(jsonObject);

  let typeScriptOutput = '';

  for (const key in typeMap) {
    if (typeMap.hasOwnProperty(key)) {
      const type = typeMap[key];
      if (type === 'number' || type === 'string' || type === 'boolean') {
        typeScriptOutput += `export type ${key} = ${type};\n`;
      } else if (typeof type === 'string') {
        typeScriptOutput += `export interface ${type} {\n`;
        for (const subKey in jsonObject[type.toLowerCase()]) {
          if (jsonObject[type.toLowerCase()].hasOwnProperty(subKey)) {
            const subType = typeof jsonObject[type.toLowerCase()][subKey];
            typeScriptOutput += `  ${subKey}: ${subType};\n`;
          }
        }
        typeScriptOutput += `}\n`;
      }
    }
  }

  return typeScriptOutput;
}
