const fs = window.require('fs');
export const writeInFile = (linkfile, content) => {
  try {
    fs.writeFileSync(
      `${linkfile}`, content
    );
    return true
  } catch (error) {
    return error
  }
}
export const readInFile = (linkfile) => {
  try {
    return fs.readFileSync(linkfile, { encoding: 'utf8' });
  } catch (error) {
    return error
  }
}
export const convertFileToArray = (content) => {
  return content.split('var ')
    .map((item) => {
      return item
        .split(' = ')
        .map((item, index) =>
          index == 1
            ? item.trim().replace(/["]/g, '').slice(0, -1)
            : item.trim().replace(/["]/g, '')
        );
    })
    .slice(1);
}
export const convertArrayToFile = (array) => {
  return array.map((item) => `var ${item.name} = "${item.url}";`).join('\n');
}
export const convertAssetToBase64 = (assetPath) => {
  try {
    return fs.readFileSync(assetPath, 'base64');
  } catch (error) {
    return console.error(error);
  }
}