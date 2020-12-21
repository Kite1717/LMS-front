// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo,useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/question-banks/questionBanksActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../QuestionBanksUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useQuestionBanksUIContext } from "../QuestionBanksUIContext";
import { useIntl } from "react-intl";

export function QuestionBanksTable() {
  // Questions UI Context
  const questionsUIContext = useQuestionBanksUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      ids: questionsUIContext.ids,
      setIds: questionsUIContext.setIds,
      queryParams: questionsUIContext.queryParams,
      setQueryParams: questionsUIContext.setQueryParams,
      openEditQuestionDialog: questionsUIContext.openEditQuestionDialog,
      openBulkInsertDialog: questionsUIContext.openBulkInsertDialog,
      openDeleteQuestionDialog: questionsUIContext.openDeleteQuestionDialog,
      goQuestionsPage: questionsUIContext.goQuestionsPage,
    };
  }, [questionsUIContext]);

  const intl = useIntl();

  // Getting curret state of questions list from store (Redux)
  const { questionBanksState, courseState } = useSelector(
    (state) => ({
      questionBanksState: state.questionBanks,
      courseState: state.courses,
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = questionBanksState;
  const { selectedCourse } = courseState;

  console.log(selectedCourse);

  useEffect(() => {
    if (!selectedCourse || selectedCourse == null) {
      return;
    }

    questionsUIProps.queryParams.filter.CourseId = selectedCourse.courseId;
  }, [selectedCourse]);

  

  // Questions Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list

    questionsUIProps.setIds([]);
    // server call by queryParams

    /*if (
      questionsUIProps.queryParams.filter.TopicId &&
      questionsUIProps.queryParams.filter.TopicId > 0
    )*/
    dispatch(actions.fetchQuestionBanks(questionsUIProps.queryParams));
  }, [questionsUIProps.queryParams, dispatch, selectedCourse]);
  // Table columns

  const [data, setData] = useState(null)
  const [count, setCount] = useState(0)
  const [questionStat, setQuestionStat] = useState("T")
   const [reset, setReset] = useState(true)
  

  useEffect(() => {
    if(entities !== null && entities !== undefined)
    {
      loadData(questionStat)

    }
   
  }, [entities])

  const loadData = (type) =>{

    if(type === "T")
    {
      setData(entities.theoric)
      setCount(entities.theoricCount)
      setReset( questionStat === "V")
      
      setQuestionStat("T")
    }
    else{
      setData(entities.visual)
      setCount(entities.visualCount)
      setReset( questionStat === "T")
      setQuestionStat("V")

    }
    console.log(  questionsUIProps.queryParams.pageNumber,"xxxxxxxxxxxxxx")
  
  }

 const handleTitle = ()=>{
   let title = questionStat === "T" ? "TEORİK SORULAR" : "GÖRSEL SORULAR"
   return <span style = {{marginLeft :"20px", fontSize: "20px" ,fontWeight : "bold",color :"#000"}}>{title}</span>
 }



  const columns = [
    {
      dataField: "Text",
      text: intl.formatMessage({ id: "COURSES.QUESTIONS.DATACOLUMN.TEXT" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
 
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: count,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: questionsUIProps.queryParams.pageSize,
    page: questionsUIProps.queryParams.pageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              reset = {reset}
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <button  onClick = {()=> loadData("V")} type="button" className="btn btn-success btn-elevate mx-auto">
                Görsel Sorular
              </button>
              <button   onClick = {()=> loadData("T")} type="button" className="btn btn-warning btn-elevate ml-3">
                Teorik Sorular
              </button>

             {handleTitle()}
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                remote
                keyField="Id"
                data={!data || data === null ? [] : data}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  questionsUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                
                  
                <PleaseWaitMessage entities={data} />
                <NoRecordsFoundMessage entities={data} />
              </BootstrapTable>

             
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
