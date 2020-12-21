import React, { useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
  backgroundColor: "#fafafa",
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


  const [loading, setLoading] = React.useState(false);

  useEffect(() => {}, [files]);

  

  const onDrop = (acceptedFiles) => {
    const accpt = [acceptedFiles[acceptedFiles.length-1]]
    // alert(acceptedFiles.length)
    setFiles([])
    setLoading(true)
    accpt.forEach((element, index) => {
      
      if (files.length > 0) {
      //  if (files.every((fileItem) => fileItem.name !== element.name)) {
          setFiles([...files, element]);
       // }
      } else {
        setFiles([...files, ...acceptedFiles]);
        

      }
    });
    setLoading(false)
  };

  
  const fileNames = files.map((file,index) => {

    if(index === files.length-1)
    {
     return <li key={file.name}>{file.name}</li>
    }
  
  })

  const {
    // eslint-disable-next-line
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    init: function() {
      this.on("addedfile", function() {
        console.log(files)
        if (this.files[1]!=null){
          this.removeFile(this.files[0]);
        }
      });
    },
    accept: [
      "image/png",
     
    ],
    onDrop,
  });

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
      {loading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
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
