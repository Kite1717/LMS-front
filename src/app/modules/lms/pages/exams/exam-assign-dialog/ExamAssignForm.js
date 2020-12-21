// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, FieldArray ,Field} from "formik";
import * as Yup from "yup";
import * as usersActions from "../../../_redux/users/usersActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { DatePickerField } from "../../../../../../_metronic/_partials/controls";

import ReactTags from "react-tag-autocomplete";
import "./ExamAssignForm.scss";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";
import axios from 'axios'


import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

import MaskedInput from 'react-text-mask';

// Validation schema
const ExamAssignSchema = Yup.object().shape({
    StartDate: Yup.string()
 
    .required("Başlangıç tarihi gereklidir"),
    EndDate: Yup.string()
 
    .required("Bitiş tarihi gereklidir"),

    StartTime: Yup.string()
 
    .required("Başlangıç zamanı gereklidir"),
    EndTime: Yup.string()
 
    .required("Bitiş zamanı gereklidir"),
});

function timeMask(value) {
  const chars = value.split('');

  var hours = [/[0-2]/];
  if (chars[0] === '0' || chars[0] === '1' || chars[0] === '2') {
    if (chars[1] === ':') {
      hours = [/[0-2]/];
    } else {
      hours = [/[0-2]/, chars[0] === '2' ? /[0-3]/ : /[0-9]/];
    }
  }

  const minutes = [/[0-5]/, /[0-9]/];

  return hours.concat(':').concat(minutes);
}


export function ExamAssignForm_({
  saveAssignedUserForExam,
  exam,
  actionsLoading,
  onHide,
  match,
}) {
  const [usersState, setUsersState] = React.useState([]);
  
  const { userState } = useSelector(
    (state) => ({
      userState: state.users,
    }),
    shallowEqual
  );

  //mustafa
  let { entities } = userState;
  console.log(entities)


  
  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(usersActions.fetchUserTag());
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = (i) => {
    const User = usersState.slice(0);
    User.splice(i, 1);
    setUsersState(User);
  };

  const onAddition = (tag) => {
    setUsersState([...usersState, tag]);
  };

  let eid = 0;
  if (match && match.params && match.params != null) eid = match.params.eid;

  const intl = useIntl();

  
  //mustafa
  const [selectedUsersAdd, setSelectedUsersAdd] = React.useState([]);
  const [tempEntities, setTempEntities] = React.useState([]);
  useEffect(() => {

  
    if(entities !== null &&  entities !== undefined)
    {
      setTempEntities(entities)

      axios.get("/user-exams/user/exam/" + eid).then((res)=>{

        const temp = [];
   
        for(let i = 0 ; i< res.data.length ; i++)
        {
          temp.push({
            id:res.data[i].Id,
            name : res.data[i].NAME,
          })
        }
           console.log(res.data)
          // console.log(companies)
           console.log(usersState)
   
           setUsersState([...temp])
         
   
       })
    }
   

  }, [entities]); 

  
  

  const handleAddition = () =>{

    const temp = [];
    
    for(let i = 0 ; i < selectedUsersAdd.length ; i++){

      if(usersState.find(el => el.id === selectedUsersAdd[i].id) === undefined)
      temp.push(selectedUsersAdd[i])
    }

  
      setUsersState([...usersState,...temp])
   
  }
  useEffect(() => {

  
    if(entities !== null && entities !== undefined )
    {
      let temp2 = [...entities];
      for(let i = 0 ; i<usersState.length ; i++)
      {
        
         temp2 = temp2.filter(item => item.id !== usersState[i].id)
      }
      
      setTempEntities([...temp2])
    }
   


  }, [usersState]);
//mustafa--------------------------


  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ userIds: [], ExamId: eid }}
        validationSchema={ExamAssignSchema}
        onSubmit={(values) => {
          if(values.Endtime !== "" && values.StartTime !== "" )
          saveAssignedUserForExam({ usersState, values });
        }}
      >
        {({ handleSubmit ,setFieldValue,values}) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right" autoComplete="off">
                <div className="form-group row">
                  {/* Date of birth */}
                  <div className="col-lg-6">
                    <label class = "mr-3">{intl.formatMessage({
                        id: "EXAMS.ASSIGNFORM.START_DATE",
                      })} </label>
                    <DatePickerField
                      name="StartDate"
                      
                    /> 
                  </div>

                  <div className="col-lg-6">
                    <label class = "mr-3">
                    {intl.formatMessage({
                        id: "EXAMS.ASSIGNFORM.END_DATE",
                      })}
                    </label>
                    <DatePickerField
                      name="EndDate"
                   
                    />


                  </div>

                  
                </div>


                <div className = "form-group row">  
                <div className="col-lg-6">  
                <label class = "mr-3"> Başlangıç Zamanı </label>
                  <MaskedInput
                            guide={false}
                            name="StartTime"
                            className="form-control"
                            mask={timeMask}
                            type="text"
                            placeholder="Örnek: 15:30"
                            value={values.StartTime}
                            onChange={event => setFieldValue("StartTime",event.target.value)}
                         />

                         
                </div>


                <div className="col-lg-6">  
                <label class = "mr-3"> Bitiş Zamanı </label>
                  <MaskedInput
                            guide={false}
                            name="EndTime"
                            className="form-control"
                            mask={timeMask}
                            type="text"
                            placeholder="Örnek: 15:30"
                            value={values.EndTime}
                            onChange={event => setFieldValue("EndTime",event.target.value)}
                         />

                         
                </div>


                </div>
                

                <div className="form-group row">
                  <div className="col-lg-12">
                  <label>Tüm Kullanıcılar </label>
                  <Field
                 
                     component="select"
                      name="categoryIds"
                      style = {{width : "100%",height : "100%"}}
                      onChange={(e) => {                             
                               const adding = [];
                               for(let i = 0 ; i < e.target.selectedOptions.length ; i++)
                               {
                                const user= {
                                  id : Number(e.target.selectedOptions[i].value),
                                  name : e.target.selectedOptions[i].textContent,
                                }
                              
                                
                                if(usersState.find(el => el.id === user.id) === undefined
                                )
                                adding.push(user)
                                
                               }

                              
                               if(selectedUsersAdd.length >=  e.target.selectedOptions.length)
                               {
                                 
                                 const ttt = [...adding]
                               const temp = []
                               for(let i= 0 ; i< ttt.length ; i++)
                               {
                                 if(temp.find(el => el.id === ttt[i].id) === undefined)
                                 temp.push(ttt[i])

                               }



                                  setSelectedUsersAdd([...temp])
                               }
                               else{

                                const ttt = [...adding,...selectedUsersAdd]
                                const temp = []
                                for(let i= 0 ; i< ttt.length ; i++)
                                {
                                  if(temp.find(el => el.id === ttt[i].id) === undefined)
                                  temp.push(ttt[i])
 
                                }
 
 
 
                                   setSelectedUsersAdd([...temp])
                               }
                              
                            
                            }}

                      multiple={true}
                    >

                            {tempEntities !== null &&
                            tempEntities.map((user) => (
                              <option
                                    key={user.id} value={user.id}>
                              {user.name}
                            </option>
                            ))}
                      
                 </Field>   

                

                    
                  </div>
                </div>


                <div className="form-group row">
                  <div className="col-lg-12 mt-3">
                  <button
                   onClick = {handleAddition}
                  
                  type="button" class="btn btn-success">Seç ve ekle</button>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12 mt-3">
                  <label>Ekli Kullanıcılar (--Kişinin üzerine tıklayıp yada çoklu seçerek kaldırabilirsiniz--)</label>
                  <Field
                 
                     component="select"
                      name="categoryIds"
                      style = {{width : "100%",height : "100%"}}
                      onChange={(e) => {

                               let newUsers = [...usersState];
                               let deleted = [];
                               for(let i = 0 ; i < e.target.selectedOptions.length ; i++)
                               {
                                const user= {
                                  id : Number(e.target.selectedOptions[i].value),
                                  name : e.target.selectedOptions[i].textContent,
                                }
                                
                                deleted.push(user)
                                newUsers = newUsers.filter(el => el.id !== user.id)
                                
                                
                               }
                               for(let i = 0; i < deleted.length ; i++)
                               {
                                 axios.delete("/user-exams/" + eid + "/" + deleted[i].id )
                               } 
                               setUsersState([...newUsers])


                            }}

                      multiple={true}
                    >

                            {usersState !== null &&
                            usersState.map((user) => (
                              <option
                                    key={user.id} value={user.id}>
                              {user.name}
                            </option>
                            ))}
                      
                 </Field>   

                

                    
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-secondary btn-elevate"
              >
                {intl.formatMessage({
                  id: "MODAL.CANCEL",
                })}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-success btn-elevate"
              >
                {intl.formatMessage({
                  id: "MODAL.SAVE",
                })}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export const ExamAssignForm = withRouter(ExamAssignForm_);
