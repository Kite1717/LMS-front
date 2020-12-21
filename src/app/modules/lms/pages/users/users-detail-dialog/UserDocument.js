import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import ReactDOM from "react-dom";

import React, { useEffect, useMemo } from "react";
import { withRouter } from "react-router";

import { PDFViewer } from "@react-pdf/renderer";

import moment from "moment";

import font from "./fonts/Roboto-Regular.ttf";

export default function UserDocument({ location }) {
  const {
    user,
    totalDuration,
    educations,
    exams,
    certificates,
    meetings,
  } = location.state.document;

  useEffect(() => {
    Font.register({
      family: "Roboto",
      src: font,
    });
  }, []);

  return (
    <PDFViewer width="100%" height={1200}>
      <Document>
        <Page size="A4" orientation="landscape">
          <View style={styles.main}>
            <Text style={styles.title}>Profil</Text>
            <Text style={styles.text}>TC No: {user.TCNo}</Text>
            <Text style={styles.text}>İsim: {user.FirstName}</Text>
            <Text style={styles.text}>Telefon: {user.PhoneNumber}</Text>
            <Text style={styles.text}>Email: {user.Email}</Text>
            <Text style={styles.text}>Adres: {user.Address}</Text>
            <Text style={styles.text}>Şube: {user.CompanyName}</Text>
            <Text style={styles.text}>
              Sistemde Kaldığı toplam süre {totalDuration}
            </Text>

            <View>
              {educations.length > 0 && (
                <View>
                  <Text style={styles.title}>Eğitimler</Text>
                  {educations.map((education) => {
                    return (
                      <View style={styles.main}>
                        <Text style={styles.text}>
                          Eğitim İsmi: {education.Name}{" "}
                          {education.Available === 1
                            ? "(Tamamlanmadı)"
                            : "(Tamamlandı)"}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}

              {exams.length > 0 && (
                <View>
                  <Text style={styles.title}>Sınavlar</Text>
                  {exams.map((exam) => {
                    return (
                      <View style={styles.main}>
                        {exam.Available === 0 && (
                          <Text style={styles.text}>
                            {exam.ExamTypeId === 1
                              ? "(Teorik Sınav)"
                              : "(Görsel Sınav)"}
                            {" - "}
                            {"Sınav İsmi: " + exam.Name} {" - "}
                            {exam.UserSuccessRate === null
                              ? "Başarı Oranı: %0"
                              : "Başarı Oranı: %" + exam.UserSuccessRate}{" "}
                            {" - "}
                            {exam.UserSuccessRate >= exam.MinSuccessRate
                              ? "(Geçti)"
                              : "(Kaldı)"}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              )}

              {certificates.length > 0 && (
                <View>
                  <Text style={styles.title}>Sertifikalar</Text>
                  {certificates.map((certificate) => {
                    return (
                      <View style={styles.main}>
                        <Text style={styles.text}>
                          {"Sertifika No: " + certificate.CCode}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}

              {meetings.length > 0 && (
                <View>
                  <Text style={styles.title}>Sanal Sınıflar</Text>
                  {meetings.map((meeting) => {
                    return (
                      <View style={styles.main}>
                        <Text style={styles.text}>
                          {"İsim: " + meeting.MeetingName}
                        </Text>
                        <Text style={styles.text}>
                          {"Başlangıç Tarihi: " +
                            moment(meeting.StartTime).format(
                              "DD.MM.YYYY HH:mm"
                            )}
                        </Text>
                        <Text style={styles.text}>
                          {"Bitiş Tarihi: " +
                            moment(meeting.EndTime).format("DD.MM.YYYY HH:mm")}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
  },

  title: {
    textAlign: "center",
    margin: 15,
    fontFamily: "Roboto",
  },
  text: {
    marginLeft: 70,
    fontSize: 15,
    fontFamily: "Roboto",
  },
});
