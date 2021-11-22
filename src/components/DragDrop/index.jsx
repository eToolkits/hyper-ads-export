import { Box } from "@chakra-ui/layout";
import React from "react";
import { useDropzone } from "react-dropzone";

const DragDrop = (props) => {
    let {text} = props
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: ".js",
        maxFiles: 1,
    });
    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    return (
        <Box
            w="100%"
            border="2px dashed"
            p="10px"
            {...getRootProps({
                className: "dropzone",
            })}
        >
            <input {...getInputProps()} />
            <p>
                {files.length ? (
                    <aside>
                        <h4 className="path-select">
                            New {text} file selected path /:{" "}
                            <span>{files}</span>
                        </h4>
                    </aside>
                ) : (
                    <p>
                        Drag 'n' drop new file {text} here <br />
                    </p>
                )}
            </p>
        </Box>
    );
};
export default DragDrop;
