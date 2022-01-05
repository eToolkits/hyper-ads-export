const fs = window.require('fs');
export const readInFolder = (linkFoler) => {
  try {
    return fs.readdirSync(linkFoler);
  } catch (error) {
    console.error(error)
  }

}
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
export const readFileDetail = (linkfile) => {
  try {
    return fs.readFileSync(`${linkfile}/index.html`, "utf8");
  } catch (error) {
    console.error(error)
  }
}
export const removeAllFile = (location) => {
  fs.readdirSync(location)
    .forEach((file) => {
      fs.unlink(`${location}/${file}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
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
export const deepClone = (data) => {
  const newData = JSON.stringify(data);
  return JSON.parse(newData);
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