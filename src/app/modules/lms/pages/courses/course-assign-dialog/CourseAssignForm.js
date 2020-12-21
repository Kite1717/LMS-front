// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as usersActions from "../../../_redux/users/usersActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { DatePickerField } from "../../../../../../_metronic/_partials/controls";

import ReactTags from "react-tag-autocomplete";
import "./CourseAssignForm.scss";
import { withRouter } from "react-router";

import { useIntl } from "react-intl";
import axios from 'axios'

// Validation schema
const CourseAssignSchema = Yup.object().shape({
  StartDate: Yup.string()
 
  .required("Başlangıç tarihi gereklidir"),
  EndDate: Yup.string()

  .required("Bitiş tarihi gereklidir"),
});

export function CourseAssignForm_({
  saveAssignedUserForCourse,
  course,
  actionsLoading,
  onHide,
  match,
}) {
  const [usersState, setUsersState] = React.useState([]);

  console.log(course ,"start");
  const { userState } = useSelector(
    (state) => ({
      userState: state.users,
    }),
    shallowEqual
  );

  const { entities } = userState;
  console.log("CourseAssignForm -> entities", entities);




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

  let cid = 0;
  if (match && match.params && match.params != null) cid = match.params.cid;

  const intl = useIntl();

  useEffect(() => {

  
    if(entities !== null &&  entities !== undefined)
    {
      setTempEntities(entities)

      axios.get("/course-users/course/" + cid).then((res)=>{

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

  //mustafa
  const [selectedUsersAdd, setSelectedUsersAdd] = React.useState([]);
  const [tempEntities, setTempEntities] = React.useState([]);


  
  

  const handleAddition = () =>{

    const temp = [];
    console.log(  "eklemeden önce bir adımdır bu",selectedUsersAdd)
    
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
        initialValues={{ userIds: [], CourseId: cid }}
        validationSchema={CourseAssignSchema}
        onSubmit={(values) => {
          saveAssignedUserForCourse({ usersState, values });
        }}
      >
        {({ handleSubmit }) => (
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
                    <DatePickerField
                      name="StartDate"
                      label={intl.formatMessage({
                        id: "COURSES.ASSIGN.USER.START_DATE",
                      })}
                    />
                  </div>

                  <div className="col-lg-6">
                    <DatePickerField
                      name="EndDate"
                      label={intl.formatMessage({
                        id: "COURSES.ASSIGN.USER.END_DATE",
                      })}
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
                                 axios.delete("/course-users/" + cid + "/" + deleted[i].id )
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
                className="btn btn-light btn-elevate"
              >
                İptal
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Kaydet
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export const CourseAssignForm = withRouter(CourseAssignForm_);
