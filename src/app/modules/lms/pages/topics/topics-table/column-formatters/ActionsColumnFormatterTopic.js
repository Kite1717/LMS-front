// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionsColumnFormatterTopic(
  cellContent,
  row,
  rowIndex,
  {
    openEditTopicDialog,
    openDeleteTopicDialog,
    goCourseSectionsPage,
    goQuestionsPage,
    goVisualQuestionsPage,
  }
) {
  return (
    <>
      <a
        title="Düzenle"
        className="btn btn-icon btn-light btn-hover-warning btn-sm "
        onClick={() => openEditTopicDialog(row.Id, row.CourseId)}
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
        onClick={() => openDeleteTopicDialog(row.Id, row.CourseId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG
            title="Sil"
            src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
          />
        </span>
      </a>

      <a
        title="Kurs Bölümleri"
        className="btn btn-icon btn-light btn-hover-secondary btn-sm "
        onClick={() => goCourseSectionsPage(row.Id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-secondary">
          <SVG
            title="Kurs Bölümleri"
            src={toAbsoluteUrl("/media/svg/icons/Files/Uploaded-file.svg")}
          />
        </span>
      </a>

      <a
        title="Sorular"
        className="btn btn-icon btn-light btn-hover-success btn-sm "
        onClick={() => goQuestionsPage(row.Id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-success">
          <SVG
            title="Sorular"
            src={toAbsoluteUrl("/media/svg/icons/Code/Question-circle.svg")}
          />
        </span>
      </a>
            <a
        title="Görüntü Soruları"
        className="btn btn-icon btn-light btn-hover-primary btn-sm "
        onClick={() => goVisualQuestionsPage(row.Id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            title="Görüntü Soruları"
            src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
          />
        </span>
      </a>  
    </>
  );
}
