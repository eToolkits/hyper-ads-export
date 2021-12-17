export const DataProcses = (data) => {
  let img = document.createElement("img");
  img.setAttribute("src", data[1]);
  console.dir(img);
  let width = img.naturalWidth;
  let height = img.naturalHeight;
  console.log(width, height);
};

// class Employee {
//     constructor() {
//         this.name = '';
//         this.dept = 'general';
//     }
// }
