// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
import axios from "axios";

export function ActionsColumnFormatterMeeting(
  cellContent,
  row,
  rowIndex,
  {
    openEditMeetingDialog,
    openDeleteMeetingDialog,
    goTopicsPage,
    goMeetingCalenderPage,
    openAssignMeetingDialog,
    goRollCallPage
  }
) {
  return (
    <>
      <a
        title="Düzenle"
        className="btn btn-icon btn-light btn-hover-warning btn-sm "
        onClick={() => openEditMeetingDialog(row.Id)}
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
        onClick={() => openDeleteMeetingDialog(row.Id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG
            title="Sil"
            src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
          />
        </span>
      </a>

      <a
        title="Kullanıcı Ata"
        className="btn btn-icon btn-light btn-hover-primary btn-sm "
        onClick={() => openAssignMeetingDialog(row.Id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            title="Kullanıcı Ata"
            src={toAbsoluteUrl("/media/svg/icons/Files/User-folder.svg")}
          />
        </span>
      </a>

      <a
        title="Moderatör Linki"
        className="btn btn-icon btn-light btn-hover-primary btn-sm "
        onClick={() =>
          axios
            .get("/meetings/moderator/" + row.MeetingID + "/" + row.ModeratorPW)
            .then(function(params) {
              console.log(params);
              window.open(params.data);
            })
        }
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            title="Moderatör Linki"
            src={toAbsoluteUrl("/media/svg/icons/Clothes/Shirt.svg")}
          />
        </span>
      </a>

      {/*      <a
        title="Katılımcı Linki"
        className="btn btn-icon btn-light btn-hover-primary btn-sm "
        onClick={() =>
          axios
            .get("/meetings/attendee/" + row.MeetingID + "/" + row.AttendeePW)
            .then(function(params) {
              console.log(params);
              window.open(params.data);
            })
        }
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            title="Katılımcı Linki"
            src={toAbsoluteUrl("/media/svg/icons/Clothes/T-Shirt.svg")}
          />
        </span>
      </a> */}

        <a
        title="Yoklama"
        className="btn btn-icon btn-light btn-hover-success btn-sm "
        onClick={() => goRollCallPage(row.Id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-success">
          <SVG
            title="Yoklama"
            src={toAbsoluteUrl("/media/svg/icons/Communication/Group.svg")}
          />
        </span>
      </a>
    </>
  );
}
