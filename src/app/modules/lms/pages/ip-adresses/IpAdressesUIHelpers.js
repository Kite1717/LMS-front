export const IpAdressStatusCssClasses = ["danger", "success", "info", ""];
export const IpAdressStatusTitles = ["Suspended", "Active", "Pending", ""];
export const IpAdressTypeCssClasses = ["success", "primary", ""];
export const IpAdressTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "Id", order: "desc" }];
export const sizePerPageList = [
  { text: "30", value: 15 },
  { text: "20", value: 10 },
  { text: "10", value: 5 },
  { text: "5", value: 2 },
];
export const initialFilter = {
  filter: {
    CompanyId: 0,
    Ip: "",
    Description: "",
  },
  sortOrder: "desc", // asc||desc
  sortField: "Id",
  pageNumber: 1,
  pageSize: 30,
};
