// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionsColumnFormatterCourseLibraryCategory(
  cellContent,
  row,
  rowIndex,
  { goLibraryPage }
) {
  return (
    <>
      <a
        title="Düzenle"
        className="btn btn-icon btn-light btn-hover-success btn-sm "
        onClick={() => goLibraryPage(row.Id, row.CourseId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-success">
          <SVG
            title="Görüntü Kütüphanesi"
            src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
          />
        </span>
      </a>
    </>
  );
}
