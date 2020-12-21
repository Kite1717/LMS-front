export const MessageStatusCssClasses = ["danger", "success", "info", ""];
export const MessageStatusTitles = ["Suspended", "Active", "Pending", ""];
export const MessageTypeCssClasses = ["success", "primary", ""];
export const MessageTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "Id", order: "desc" }];
export const sizePerPageList = [];
export const initialFilter = {
  filter: {
    Text: "",
    FromUserId: "",
  },
  sortOrder: "desc", // asc||desc
  sortField: "Id",
  pageNumber: 1,
  pageSize: 999999,
};
