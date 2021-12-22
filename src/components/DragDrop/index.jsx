import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const DragDrop = (props) => {
  const { text, handleFile, type, indexFile } = props;
  // console.log(props);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: type,
    maxFiles: 1,
  });
  const files = acceptedFiles.map((file) => {
    handleFile({ file: file, index: indexFile });
    // console.log(file);
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });
  // console.log(files);
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
              {type == 'image/jpeg, image/png' ? (
                <img
                  style={{ maxHeight: '100px' }}
                  src={files[0].key}
                  alt="new assets"
                />
              ) : (
                <audio controls>
                  <source src={files[0].key} />
                </audio>
              )}
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
