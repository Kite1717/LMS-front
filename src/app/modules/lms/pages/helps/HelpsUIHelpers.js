export const HelpStatusCssClasses = ["danger", "success", "info", ""];
export const HelpStatusTitles = ["Suspended", "Active", "Pending", ""];
export const HelpTypeCssClasses = ["success", "primary", ""];
export const HelpTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "Id", order: "desc" }];
export const sizePerPageList = [
  { text: "30", value: 15 },
  { text: "20", value: 10 },
  { text: "10", value: 5 },
  { text: "5", value: 2 },
];
export const initialFilter = {
  filter: {
    Title: "",
    Text: "",
  },
  sortOrder: "desc", // asc||desc
  sortField: "Id",
  pageNumber: 1,
  pageSize: 30,
};
