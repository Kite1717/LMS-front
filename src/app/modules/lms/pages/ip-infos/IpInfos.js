import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import { Input, Select,RichTextEditor } from "../../../../../_metronic/_partials/controls";

import { Field ,Form} from "formik";
import { useIntl } from "react-intl";

export function IpInfos({ id, }) {

    const [show,setShow] = React.useState(true)

  // Courses Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.courses.actionsLoading }),
    shallowEqual
  );



  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  

  const intl = useIntl();

  return (
    <Modal

    size = "lg"
      show={show}
    
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          YETKİLİ IP ADRESLERİ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
         

               
                
             
                <div className="form-group row">
                  <div className="col-lg-12">
                  
                 <div className = "mb-3">
                       
                            <label>
                                Ip Adresi 1
                            </label>
                 </div>
                <div className="input-group mb-3">
                
                <div className="input-group-prepend">
                  
                </div>
                <input type="text" class="form-control" aria-label="Text input with checkbox"/>
                </div>
                
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-12">
                  
                 <div className = "mb-3">
                       
                            <label>
                                Ip Adresi 2
                            </label>
                 </div>
                <div className="input-group mb-3">
                
                <div className="input-group-prepend">
                  
                </div>
                <input     mask="(999) 999-99-99"  type="text" class="form-control" aria-label="Text input with checkbox"/>
                </div>
                
                  </div>
                </div>

            
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
          
            onClick = {() => setShow(false)}
            className="btn btn-light btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.CANCEL",
            })}
          </button>
          <> </>
          <button
           onClick = {() => setShow(false)}
            type="button"
           // onClick={deleteCourse}
            className="btn btn-primary btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.SAVE",
            })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
