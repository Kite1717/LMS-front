import React, { useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "red",
  borderStyle: "dashed",
  backgroundColor: "#questionBankfa",
  marginTop: "1rem",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const FileUpload = ({ setFiles, files }) => {
  useEffect(() => {}, [files]);
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((element, index) => {
      if (files.length > 0) {
        if (files.every((fileItem) => fileItem.name !== element.name)) {
          setFiles([...files, element]);
        }
      } else {
        setFiles([...files, ...acceptedFiles]);
      }
    });
  };

  const fileNames = files.map((file) => <li key={file.name}>{file.name}</li>);

  const {
    // eslint-disable-next-line
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <>
      <div {...getRootProps({ style })}>
        <input className="dropzone-input" {...getInputProps()} />
        <div className="text-center">
          <p style={{ color: "black" }}>
            Dosyaları buraya sürükle bırak yapabilirsiniz
          </p>
          {fileNames}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
