import React from "react";
import { toAbsoluteUrl } from "../../../../_helpers";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import font from "./fonts/Roboto-Regular.ttf";
import moment from "moment";
import { Images } from "./constants/Images";
import { Color } from "./constants/Color";

/*
ttt:
CompanyId: null
CourseId: 1
CreatedAt: "2020-07-07T12:52:53.000Z"
CreatorUserId: 1
DeletedAt: null
DeleterUserId: null
Description: "Lorem ipsum dolor amet samet"
Duration: 10
EndDate: "2021-07-08T08:37:56.000Z"
CreatedAt: "8e3c0cc9-67c6-4ae9-a8e2-68aea017c889"
FirstName: "furkan"
Id: 13
IsDeleted: null
IsPublished: null
LastModifierUserId: null
LastName: "arslan"
Name: "Exam 352"
SuccessRate: 50
TCNo: "10000000001"
TopicId: 19
UpdatedAt: null
acronym: "E3"
*/
const Certificate = (props) => {
  console.log(props.data);

  return (
    <Document>
      <Page size="A4" orientation="landscape">
        <Image src={Images.BACKGROUND} style={styles.pageBackground} />

        <View style={styles.decoration}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image2}
              src={toAbsoluteUrl("/media/logos/nes-logo.png")}
              alt="images"
            />

            <Image style={styles.image} src={Images.LEFT_IMAGE} alt="images" />
          </View>
          <View style={styles.rightTitle}>
            <Text>
              HGD/HEK-32{"\n"}2020/1/
              {props.ttt.CCode}
            </Text>
          </View>
          <Text style={styles.header} fixed>
            UZAKTAN EĞİTİM BAŞARI SERTİFİKASI
          </Text>
          <Text style={styles.fullName}>
            {props.ttt.FirstName.toUpperCase() +
              "  " +
              props.ttt.LastName.toUpperCase()}
          </Text>
          <Text style={styles.tc}>{props.ttt.TCNo}</Text>

          <Text style={styles.subtitle}>
            SHT 17.2 SAYILI TALIMAT UYARINCA DUZENLENEN{" "}
            <Text style={styles.blackText}> {props.ttt.Name} </Text> BAŞARIYLA
            TAMAMLAYARAK BU SERTİFİKAYI ALMAYA HAK KAZANMIŞTIR.
          </Text>
          <View style={styles.footer}>
            <View>
              <Text style={styles.text}>
                EĞİTİM SÜRESİ :{" "}
                <Text style={styles.blackText}>
                  {" "}
                  {Math.round(props.ttt.Duration / 60)} Saat
                </Text>
              </Text>

              <Text style={styles.text}>
                EĞİTİM TAMAMLAMA TARİHİ :{" "}
                <Text style={styles.blackText}>
                  {moment(props.ttt.Finised).format("DD.MM.YYYY")}
                </Text>
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.text}>İMZA</Text>
              <Text style={styles.signature}>ELEKTRONİK İMZALIDIR</Text>

              <View style={styles.hr}></View>

              <Text style={styles.authorizedHeader}>
                EĞİTİM KURULUŞU{"\n"}YETKİLİSİ/ADI - SOYADI
              </Text>
              <Text style={styles.authorized}>{props.ttt.CompanyAdmin}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Roboto",
  src: font,
});

const styles = StyleSheet.create({
  fullName: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  tc: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    margin: 12,
    color: "grey",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  text: {
    margin: 10,
    fontSize: 15,

    fontFamily: "Roboto",
    color: "grey",
  },

  header: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "Roboto",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hr: {
    flexDirection: "column",
    borderWidth: 2.5,
    width: "60%",
    borderStyle: "solid",
    borderColor: "#808B96",
    marginTop: 5,

    marginBottom: 15,
  },
  right: {
    flex: 1,
    flexDirection: "column",

    alignItems: "center",
    marginBottom: 25,
  },
  decoration: {
    margin: 40,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    marginHorizontal: 30,
    marginTop: 5,
    width: 150,
    height: 78,
  },
  image2: {
    marginHorizontal: 30,
    marginTop: 5,
    width: 100,
    height: 90,
  },
  pageBackground: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    display: "block",
    height: "100%",
    width: "100%",
  },
  rightTitle: {
    flex: 1,
    flexDirection: "row-reverse",
    fontSize: 12,
    fontWeight: "bold",
    margin: 15,
  },
  blackText: {
    color: Color.BLACK,
  },
  signature: {
    fontFamily: "Roboto",
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  authorizedHeader: {
    fontFamily: "Roboto",
    color: "grey",
    fontSize: 14,
    textAlign: "center",
    marginRight: "35%",
  },
  authorized: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Certificate;
