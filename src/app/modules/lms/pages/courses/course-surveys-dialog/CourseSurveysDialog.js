import React, { useEffect, useMemo ,useState} from "react";
import { Modal,Table,Row,Col ,Form,Tab,Tabs} from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/courses/coursesActions";
import { useCoursesUIContext } from "../CoursesUIContext";
import { useIntl } from "react-intl";

import  axios from 'axios'


export function CourseSurveysDialog({ id, show, onHide }) {
  // Courses UI Context


  // Courses Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.courses.actionsLoading }),
    shallowEqual
  );

  

  const intl = useIntl();

  const [surveyTitle,setSurveyTitle]  = useState("")
  const [surveysUser,setSurveysUser]  = useState([])
  const [surveysUserAnswer,setSurveysUserAnswer]  = useState([])
  const [surveysUserAnswerComment,setSurveysUserAnswerComment]  = useState([])
  const [statisticsData,setStatisticsData]  = useState([])

  const [selectedUser,setSelectedUser]  = useState("")
  
  useEffect(() => {
   
    axios.get("/surveys/user/answer/" + id).then((res)=>{

      if(res.data.length > 0)
      {

          setSelectedUser(res.data[0].FirstName + "  "  + res.data[0].LastName)
          getSurveyUserAnswer(res.data[0])

    
      }
      setSurveysUser(res.data)

      axios.get("/surveys/user/answer/all/count/" + id).then((res2)=>{

        let rawData = res2.data
    
        let effectedData =[]
       rawData.forEach(element => {

        let ind  = findElement(element,effectedData)
      
        if( ind === -1)
        {
          let quest = {
            id : element.Id,
            name :element.Question,
            groupName :element.GroupName
            
          }
          if(element.Answer === 1)
          {
            quest.one = 1;
            quest.two = 0;
            quest.three = 0;
            quest.four = 0;
            quest.five = 0;

          }
          else if(element.Answer === 2)
          {
            quest.one = 0;
            quest.two = 1;
            quest.three = 0;
            quest.four = 0;
            quest.five = 0;
          }
          else if(element.Answer === 3)
          {
            quest.one = 0;
            quest.two = 0;
            quest.three = 1;
            quest.four = 0;
            quest.five = 0;
          }
         else  if(element.Answer === 4)
          {
            quest.one = 0;
            quest.two = 0;
            quest.three = 0;
            quest.four = 1;
            quest.five = 0;
          }
         else if(element.Answer === 5)
          {
            quest.one = 0;
            quest.two = 0;
            quest.three = 0;
            quest.four = 0;
            quest.five = 1;


          }

          effectedData.push(quest)



        }
        else{
          

          if(element.Answer === 1)
          {
            effectedData[ind].one++ 

          }
          else if(element.Answer === 2)
          {
            effectedData[ind].two++ 
        
          }
          else if(element.Answer === 3)
          {
            effectedData[ind].three++ 
          }
         else  if(element.Answer === 4)
          {
            effectedData[ind].four++ 
          
          }
         else if(element.Answer === 5)
          {
            effectedData[ind].five++ 


          }
        }



       });

     
        setStatisticsData(effectedData)
      })


    }).catch((err)=>{
      console.log(err)
    })

  }, [id])

 

  const findElement = (el,effectedData)=>{

    for(let  i = 0 ; i < effectedData.length ; i++)
    {
      if(el.Id === effectedData[i].id)
      {
        return i;
      }
    }
    return -1;

  }

  const renderUserHTML = surveysUser.map((item)=>{

    return(
      <tr onClick={()=>getSurveyUserAnswer(item)}>
      <td>{item.FirstName}</td>
      <td>{item.LastName}</td>
      <td>{item.TCNo}</td>
      <td>{item.CompanyName}</td>
   
    </tr>
    )
  })


  const handleAnswer =(ans) =>{

    switch (ans) {
      case 1:
        return "Hiç Katılmıyorum"

      case 2:
        return "Katılmıyorum"

      case 3:
        return "Kısmen Katılmıyorum"


      case 4:
        return "Katılıyorum"


      case 5:
        return "Tamamen Katılıyorum"
    
      default:
        return "";
    }
  }
   const renderUserAnswerHTML = surveysUserAnswer.map((item,index)=>{

    return(
      <tr>
      <td>{index + 1}</td>
      <td>{item.Question}</td>
      <td>{item.GroupName}</td>
      <td>{handleAnswer(item.Answer)}</td>
    </tr>
    )
  })


  const getSurveyUserAnswer =(item)=>{

  
    axios.get("/surveys/user/get/answer/" + item.Id + "/" + id).then((res)=>{

      setSelectedUser(item.FirstName + "  "  + item.LastName)
      setSurveysUserAnswer(res.data)
      axios.get("/surveys/user/get/comment/answer/" + item.Id + "/" + id).then((res)=>{
        setSurveysUserAnswerComment(res.data[0].Comment)

      })

    
    }).catch((err)=>{
      console.log(err)
    })

  }


  const renderAnswerStatisticHTML = statisticsData.map((item,index)=>{


    return(
      <tr>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.groupName}</td>
      <td>{item.one}</td>
      <td>{item.two}</td>
      <td>{item.three}</td>
      <td>{item.four}</td>
      <td>{item.five}</td>
      </tr>
    )
  })




  

  return (
    <Modal
    size  ="xl"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
       
               
  Anket Sonuçları
         

        </Modal.Title>
      </Modal.Header>





      <Modal.Body>

      <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
  <Tab eventKey="home" title="Cevaplar">
  



  <Row>
  <Col>Seçili Kullanıcı : <strong> {selectedUser}</strong></Col>
        </Row>
      <Row>
        <Col>
        <Form.Label column = "lg">Kullanıcılar (Cevapları görmek için kullanıcıya tıklayınız)</Form.Label>
                    <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>İsim</th>
                  <th>Soy isim</th>
                  <th>TC No</th>
                  <th>Şube</th>
                </tr>
              </thead>
              <tbody>
              {
                renderUserHTML
              }
              </tbody>
            </Table>

        </Col>
        <Col>

        <Form.Label column = "lg" >Cevaplar</Form.Label>
        <Table striped bordered hover responsive>
       
  <thead>
    <tr>
      <th>#</th>
      <th>Soru</th>
      <th>Grup</th>
      <th>Cevap</th>
    </tr>
  </thead>
  <tbody>
   
  {renderUserAnswerHTML}
   
  </tbody>


</Table>

<Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Kullanıcın Yorumu</Form.Label>
    <Form.Control disabled = {true} value = {surveysUserAnswerComment} as="textarea" rows={3} />
  </Form.Group>


        </Col>
      </Row>




  </Tab>
  <Tab eventKey="statistic" title="İstatistikler">



  <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Soru</th>
                  <th>Grup</th>
                  <th>Hiç Katılmıyorum (adet)</th>
                  <th>Katılmıyorum (adet)</th>
                  <th>Kısmen Katılmıyorum (adet)</th>
                  <th>Katılıyorum (adet)</th>
                  <th>Tamamen Katılıyorum (adet)</th>
                </tr>
              </thead>
              <tbody>
              {
                renderAnswerStatisticHTML
              }
              </tbody>
            </Table>
  </Tab>

</Tabs>



      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-info btn-elevate"
          >
            Kapat
          </button>
       
        </div>
      </Modal.Footer>
    </Modal>
  );
}
