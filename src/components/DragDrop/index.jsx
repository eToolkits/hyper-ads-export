import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Textarea } from '@chakra-ui/react';
import { readInFile } from '../../Utils';
import * as Type from './../../constant';
const TypeAccept = [
  {
    type: Type.TYPE_IMG,
    component: (data) => (
      <img style={{ maxHeight: '100px' }} src={data} alt="new assets" />
    ),
  },
  {
    type: Type.TYPE_AUDIO,
    component: (data) => (
      <audio controls>
        <source src={data} />
      </audio>
    ),
  },
  {
    type: Type.TYPE_JSON,
    component: (data) => {
      const result = readInFile(data);
      return <Textarea type="text" value={result} alt="new map" rows="18"/>;
    },
  },
];

const DragDrop = (props) => {
  const { text, handleFile, type, indexFile } = props;
  // console.log(props);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: type,
    maxFiles: 1,
  });
  const files = acceptedFiles.map((file) => {
    handleFile({ file: file, index: indexFile });
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });
  return (
    <Box
      w="100%"
      border="2px dashed"
      p="10px"
      {...getRootProps({
        className: 'dropzone',
      })}
    >
      <input {...getInputProps()} />
      <>
        {files.length ? (
          <aside>
            <h4 className="path-select">
              {TypeAccept.map((item) => {
                if (item.type === type) {
                  return item.component(files[0].key);
                }
              })}
            </h4>
          </aside>
        ) : (
          <p>
            Drag 'n' drop new file {text} here <br />
          </p>
        )}
      </>
    </Box>
  );
};
export default DragDrop;
