// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Select } from "../../../../../../_metronic/_partials/controls";
import * as coursePackagesActions from "../../../_redux/coursePackages/coursePackagesActions";
import * as companiesActions from "../../../_redux/companies/companiesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ReactTags from "react-tag-autocomplete";
import "./CoursePackageAssignForm.scss";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";
import axios from 'axios'

// Validation schema
const CoursePackageAssignSchema = Yup.object().shape({
  /*Name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Course Package Name is required"),*/
});

export function CoursePackageAssignForm_({
  saveCoursePackageCompany,
  coursePackage,
 // actionsLoading,
  onHide,
  match,
}) {
  const { coursePackageState, companyState } = useSelector(
    (state) => ({
      coursePackageState: state.coursePackages,
      companyState: state.companies,
    }),
    shallowEqual
  );
  //local state
  const [companiesState, setCompaniesState] = React.useState([]);

  const { entities } = coursePackageState;

  const { entities: companies } = companyState;
  // Companies Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    // server call by queryParams
    dispatch(coursePackagesActions.fetchAllCoursePackages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(companiesActions.fetchCompaniesTags());
  }, []);

  const onDelete = (i) => {
    const Company = companiesState.slice(0);
    Company.splice(i, 1);
    setCompaniesState(Company);
  };

  const onAddition = (tag) => {
    setCompaniesState([...companiesState, tag]);
  };
  let cpid = 0;
  if (match && match.params && match.params != null) cpid = match.params.cpid;
  console.log(cpid ,"sdsdasddasdasdas")
  const intl = useIntl();



 

  //mustafa
  const [selectedUsersAdd, setSelectedUsersAdd] = React.useState([]);
  const [tempEntities, setTempEntities] = React.useState([]);




  

  useEffect(() => {

  
    console.log(entities)
    if(companies !== null &&  companies !== undefined)
    {
      console.log(companies , "dsfsdfdsfsdfsdfdsfds")
      setTempEntities(companies)

      axios.get("/course-package-companies/packageid/" + cpid).then((res)=>{

        const temp = [];
   
        for(let i = 0 ; i< res.data.length ; i++)
        {
          temp.push({
            id:res.data[i].CompanyId,
            name : res.data[i].ShortName,
          })
        }
           console.log(res.data)
           console.log(companies)
           console.log(companiesState)
   
           setCompaniesState([...temp])
         
   
       })
     
    }
   

  }, [companies]); 



  
  

  const handleAddition = () =>{

    const temp = [];
    console.log(selectedUsersAdd)
    for(let i = 0 ; i < selectedUsersAdd.length ; i++){

      if(companiesState.find(el => el.id === selectedUsersAdd[i].id) === undefined)
      temp.push(selectedUsersAdd[i])
      
    }
console.log(temp)
  
    setCompaniesState([...companiesState,...temp])
   
  }
  
  useEffect(() => {

  
    if(companies !== null && companies !== undefined )
    {
      let temp2 = [...companies];
      for(let i = 0 ; i<companiesState.length ; i++)
      {
        
         temp2 = temp2.filter(item => item.id !== companiesState[i].id)
      }
      
      setTempEntities([...temp2])
    }
   


  }, [companiesState]);
//mustafa--------------------------



  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ companyIds: [], CoursePackageId: cpid }}
        validationSchema={CoursePackageAssignSchema}
        onSubmit={(values) => {
          saveCoursePackageCompany({ companiesState, values });
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {/* {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )} */}
              <Form className="form form-label-right">
             
                <div className="form-group row">
                  <div className="col-lg-12">
                  <label>Tüm Firmalar </label>
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
                              
                                 
                            
                                if(companiesState.find(el => el.id === user.id) === undefined
                                  )
                                adding.push(user)

                                console.log(companiesState  ,"cvcvc",selectedUsersAdd)
                                
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
                  <label>Ekli Firmalar (--Firmanın üzerine tıklayıp yada çoklu seçerek kaldırabilirsiniz--)</label>
                  <Field
                 
                     component="select"
                      name="categoryIds"
                      style = {{width : "100%",height : "100%"}}
                      onChange={(e) => {

                               let newUsers = [...companiesState];
                               let deleted = [];
                               console.log(newUsers ,"mmmmmmmmmmmmmmmm")
                               for(let i = 0 ; i < e.target.selectedOptions.length ; i++)
                               {
                                const user= {
                                  id : Number(e.target.selectedOptions[i].value),
                                  name : e.target.selectedOptions[i].textContent,
                                }
                                deleted.push(user)
                                console.log(user)

                                newUsers = newUsers.filter(el => el.id !== user.id)
                                
                                
                               }
                               console.log(newUsers,  "nbnbnbnbnnbnbnbnb")

                               console.log(deleted , "deleteeddddd")
                               for(let i = 0; i < deleted.length ; i++)
                               {
                                 axios.delete("/course-package-companies/" + cpid + "/" + deleted[i].id )
                               } 
                               setCompaniesState([...newUsers])


                            }}

                      multiple={true}
                    >

                            {companiesState !== null &&
                            companiesState.map((user) => (
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
                  id: "BUTTON.CANCEL",
                })}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-success btn-elevate"
              >
                {intl.formatMessage({
                  id: "BUTTON.SAVE",
                })}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export const CoursePackageAssignForm = withRouter(CoursePackageAssignForm_);
