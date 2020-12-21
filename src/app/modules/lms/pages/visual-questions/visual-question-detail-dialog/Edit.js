import React ,{useRef} from 'react';
import { render } from 'react-dom';
import { Stage, Layer,Image, Rect, Transformer } from 'react-konva';
import useImage from 'use-image';
import 'tui-image-editor/dist/tui-image-editor.css'

import ImageFilter from 'react-image-filter';




const Rectangle = ({ shapeProps, isSelected, onSelect, onChange,img,imgOP,ref}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  console.log(img)
  const [image] = useImage(img,'Anonymous');

 


  

  React.useEffect(() => {

    if(trRef.current !== undefined)
    trRef.current.forceUpdate()

  }, []);
  React.useEffect(() => {


    


    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
      
    }
  }, [isSelected]);

  return (
    <React.Fragment>
        
      <Image
      
      ref = {ref !== null ? ref : null}
      image = {image}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        opacity = {imgOP === null ? 1: imgOP}
        
        onDragEnd={e => {
           
                onChange({
                    ...shapeProps,
                    x: e.target.x(),
                    y: e.target.y()
                  });
            
         
        }}
        onTransformEnd={e => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY)
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width : 400,
    height : 400,
    
    id: 'rect1'
  },
  {
    x: 150,
    y: 150,
   
    width : 200,
    height : 200,
    id: 'rect2'
  }
];
const myTheme = {
};

const Edit = (props) => {

  console.log(props.img1, "-------",props.img2)


  const img2Ref = React.useRef(null)
  const imgFinal = React.useRef(null)
  const tui = React.useRef(null)

  const [imageUri,setImageUri] = React.useState(null)
  const logImageContent = () =>{

    let instance = tui.current.getInstance();
    
    //instance.applyFilter('Grayscale')

    setTimeout(()=>{

      instance.addImageObject(imageUri)
        //color change
      /*  instance.ui._subMenuElement.children[2].firstElementChild.lastElementChild.children[1]
            .firstElementChild.firstElementChild.firstElementChild.firstElementChild
            .firstElementChild.firstElementChild.lastElementChild.firstElementChild.value = "#ffbb3b" */
     
            //apply color
        console.log(instance.ui._subMenuElement.children[2].firstElementChild.lastElementChild.children[1]
            .firstElementChild.firstElementChild.firstElementChild.firstElementChild
            .firstElementChild.firstElementChild.lastElementChild.firstElementChild.click())
       
       instance.ui._subMenuElement.children[2].firstElementChild.lastElementChild.children[1]
        .lastElementChild.firstElementChild.firstElementChild.click()  //multiply color
        let dataURL = instance.toDataURL(); 
       console.log(dataURL) 
      
    },2000)


    instance.ui._subMenuElement.children[2].firstElementChild.children[2]
    .firstElementChild.firstElementChild.firstElementChild.firstElementChild
    .firstElementChild.click()  // remove white

    
}

React.useEffect(() => {


    
  if(imageUri !== null && imageUri !== undefined)
  {
    
    setTimeout(()=>{

      logImageContent()
   },2000)

  }


    
}, [imageUri]);

const [op,setOp] = React.useState(1)

  const [rectangles, setRectangles] = React.useState(initialRectangles);


  const [selectedId, selectShape] = React.useState(null);

  const stageRef = React.useRef()
  const twoImage = React.useRef()

  const checkDeselect = e => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleOpacity = () =>{


    if(op - 0.25 === 0)
    {
      setOp(1)
    }
    else{
      setOp(op - 0.25)
    }

    console.log(op)
  
  }

  const handleSaveImage = event => {
 
    console.log(img2Ref.current , "!!!!!!!!")
    selectShape(null)
   
    let dataURL;
    setTimeout(()=>{

     
      if(stageRef.current !== null)
      {
        dataURL = stageRef.current.toDataURL({
          mimeType: "image/png",
          quality: 0,
          pixelRatio: 2
        });
        props.setFieldValue("Image",dataURL)
        console.log(dataURL)
          
      }
         
      
          
         
          //props.setImageURL(dataURL)
       // console.log(dataURL)
    },2000)
    
    //downloadURI(dataURL, "test");
  };



  
  
  

  return (
    <div  style = {{   width :640 ,
      marginBottom : "70px",
    height:480, borderStyle :'solid',backgroundColor: '#f0f0f0'}}>

    
    <Stage
     ref ={stageRef}
      width = {640}
      height={480}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}

   
    >
      <Layer>
       
       {
         !props.reset &&
         <>
            <Rectangle
            imgOP = {null}
              key={0}
              img = { 
                props.img1 !== null && props.img1.src
              }
             
              shapeProps={rectangles[0]}
              isSelected={"rect1" === selectedId}
              onSelect={() => {
                selectShape("rect1");
              }}
              onChange={newAttrs => {
                const rects = rectangles.slice();
                rects[0] = newAttrs;
                setRectangles(rects);
              }}

             
            />

            <Rectangle
              
              ref = {img2Ref}
            imgOP = {op}
            
              key={1}
              img = { 
                props.img2 !== null && props.img2.src
              }
              shapeProps={rectangles[1]}
              isSelected={"rect2" === selectedId}
              onSelect={(e) => {
               console.log(e)
               props.setFieldValue("TruePlaceToClick",{
                 height : e.target.attrs.height,
                 rotation : e.target.attrs.rotation,
                 width : e.target.attrs.width,
                 x : e.target.attrs.x,
                 y : e.target.attrs.y,
               })
                handleOpacity()
                selectShape("rect2");
              }}
              onChange={newAttrs => {
                console.log(props.values.TruePlaceToClick , "45545435345435") // buradan koordinatları çek
                props.setFieldValue("TruePlaceToClick",   { ...props.values.TruePlaceToClick ,
                  height : newAttrs.height,
                  width : newAttrs.width,
                  x: newAttrs.x,
                  y: newAttrs.y,
                   })
                const rects = rectangles.slice();
                rects[1] = newAttrs;
                setRectangles(rects);
              }}

            />
      
         </>
       }
          
      </Layer>
    </Stage>
    <button  type = "button" className = "btn btn-warning mt-3 mb-3" onClick = {handleSaveImage}> Bu resmi kaydet</button>
{/*     
    <ImageFilter
    ref = {imgFinal}
        image='https://source.unsplash.com/random/1200x800'
        filter={[
          0.3, 0.45, 0.1, 0, 0,
          0.2, 0.45, 0.1, 0, 0,
          0.1, 0.3, 0.1, 0, 0,
          0, 0, 0, 1, 0,
        ] } // see docs beneath
      /> */}
    </div>
  );
};

export default Edit;