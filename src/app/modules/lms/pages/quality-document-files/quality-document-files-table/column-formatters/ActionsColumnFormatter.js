// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
import { useDispatch } from "react-redux";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  {
    openEditQualityDocumentFileDialog,
    openDeleteQualityDocumentFileDialog,
    goQualityDocumentFilesPage,
    openQualityDocumentFile
  }
) {
  return (
    <>
      <a
        title="Sil"
        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-3"
        onClick={() =>
          openDeleteQualityDocumentFileDialog(row.Id, row.DocumentSubCategoryId)
        }
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG
            title="Sil"
            src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
          />
        </span>
      </a>

      {/*  <a
        title="Belgeyi Görüntüle"
        className="btn btn-icon btn-light btn-hover-success btn-sm mx-3"
        onClick={() =>
          openQualityDocumentFile(row.Id, row.DocumentSubCategoryId)
        }
      >
        <span className="svg-icon svg-icon-md svg-icon-success">
          <SVG
            title="Sil"
            src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
          />
        </span>
      </a> */}


    </>
  );
}
