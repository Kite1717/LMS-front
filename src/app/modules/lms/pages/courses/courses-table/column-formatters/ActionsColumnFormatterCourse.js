// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionsColumnFormatterCourse(
  cellContent,
  row,
  rowIndex,
  {
    openEditCourseDialog,
    openDeleteCourseDialog,
    goTopicsPage,
    openAssignCourseDialog,
    goReportPage,
    currentUser,
    goSurveysPage,
  }
) {
  console.log(currentUser);
  return (
    <>
      {currentUser === 1 ? (
        <>
          <a
            title="Düzenle"
            className="btn btn-icon btn-light btn-hover-warning btn-sm "
            onClick={() => openEditCourseDialog(row.Id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-warning">
              <SVG
                title="Düzenle"
                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
              />
            </span>
          </a>

          <a
            title="Sil"
            className="btn btn-icon btn-light btn-hover-danger btn-sm "
            onClick={() => openDeleteCourseDialog(row.Id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-danger">
              <SVG
                title="Sil"
                src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
              />
            </span>
          </a>

          <a
            title="Konular"
            className="btn btn-icon btn-light btn-hover-secondary btn-sm "
            onClick={() => goTopicsPage(row.Id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-info">
              <SVG
                title="Konular"
                src={toAbsoluteUrl("/media/svg/icons/Files/Folder-plus.svg")}
              />
            </span>
          </a>

          <a
            title="Kullanıcı Atama"
            className="btn btn-icon btn-light btn-hover-primary btn-sm "
            onClick={() => openAssignCourseDialog(row.Id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                title="Kullanıcı Atama"
                src={toAbsoluteUrl("/media/svg/icons/Files/User-folder.svg")}
              />
            </span>
          </a>

          <a
            title="Rapor"
            className="btn btn-icon btn-light btn-hover-success btn-sm "
            onClick={() => goReportPage(row.Id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-success">
              <SVG
                title="Rapor"
                src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-line1.svg")}
              />
            </span>
          </a>

          <a
            title="Anketler"
            className="btn btn-icon btn-light btn-hover-info btn-sm "
            onClick={() => goSurveysPage(row.Id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-info">
              <SVG
                title="Rapor"
                src={toAbsoluteUrl("/media/svg/icons/Shopping/Wallet3.svg")}
              />
            </span>
          </a>
        </>
      ) : (
          <>

            <a
              title="Kullanıcı Atama"
              className="btn btn-icon btn-light btn-hover-primary btn-sm "
              onClick={() => openAssignCourseDialog(row.Id)}
            >
              <span className="svg-icon svg-icon-md svg-icon-primary">
                <SVG
                  title="Kullanıcı Atama"
                  src={toAbsoluteUrl("/media/svg/icons/Files/User-folder.svg")}
                />
              </span>
            </a>
            <a
              title="Rapor"
              className="btn btn-icon btn-light btn-hover-success btn-sm "
              onClick={() => goReportPage(row.Id)}
            >
              <span className="svg-icon svg-icon-md svg-icon-success">
                <SVG
                  title="Rapor"
                  src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-line1.svg")}
                />
              </span>
            </a>
          </>
        )}
    </>
  );
}
