export const MeetingStatusCssClasses = ["danger", "success", "info", ""];
export const MeetingStatusTitles = ["Suspended", "Active", "Pending", ""];
export const MeetingTypeCssClasses = ["success", "primary", ""];
export const MeetingTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "Id", order: "desc" }];
export const sizePerPageList = [
  { text: "30", value: 12 },
  { text: "20", value: 10 },
  { text: "10", value: 5 },
  { text: "5", value: 2 },
];
export const initialFilter = {
  filter: {
    Name: "",
    Description: "",
  },
  sortOrder: "desc", // asc||desc
  sortField: "Id",
  pageNumber: 1,
  pageSize: 30,
};
