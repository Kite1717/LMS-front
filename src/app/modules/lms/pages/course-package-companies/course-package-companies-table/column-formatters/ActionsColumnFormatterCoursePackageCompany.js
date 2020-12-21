// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionsColumnFormatterCoursePackageCompany(
  cellContent,
  row,
  rowIndex,
  {
    openEditCoursePackageCompanyDialog,
    openDeleteCoursePackageCompanyDialog,
    openAssignCoursePackageCompanyDialog,
  }
) {
  return (
    <>
      <a
        title="Sil"
        className="btn btn-icon btn-light btn-hover-danger btn-sm "
        onClick={() => openDeleteCoursePackageCompanyDialog(row.Id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG
            title="Sil"
            src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
          />
        </span>
      </a>

      <a
        title="Kullanıcı Atama"
        className="btn btn-icon btn-light btn-hover-secondary btn-sm "
        onClick={() =>
          openAssignCoursePackageCompanyDialog(row.Id, row.SuccessRate)
        }
      >
        <span className="svg-icon svg-icon-md svg-icon-warning">
          <SVG
            title="Kullanıcı Atama"
            src={toAbsoluteUrl("/media/svg/icons/Files/User-folder.svg")}
          />
        </span>
      </a>
    </>
  );
}
