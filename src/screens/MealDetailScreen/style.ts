import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { horizontalScale, verticalScale } from "../../utils/Metrics";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(20),
  },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(18),
  },

  headerIcon: {
    width: horizontalScale(40),
    height: verticalScale(40),
    borderRadius: 20,
    backgroundColor: COLORS.appLinear1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },

  headerTitle: {
    fontSize: verticalScale(20),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
  },
  dateHourLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
    paddingHorizontal: horizontalScale(2),
  },
  dateHourLabel: {
    fontSize: verticalScale(14),
    color: COLORS.White,
    fontFamily: "Poppins-SemiBold",
  },

  /* Date & time inputs row */
  dateHourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(18),
  },

  dateHourBox: {
    width: "48%",
  },

  dateHourInput: {
    height: verticalScale(42),
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: horizontalScale(12),
    justifyContent: "center",
  },

  /* Card */
  cardForm: {
    marginTop: verticalScale(10),
    backgroundColor: COLORS.White,
    padding: horizontalScale(18),
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },

  fieldLabel: {
    fontSize: verticalScale(14),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
    marginBottom: verticalScale(15),
  },

  formInput: {
    height: verticalScale(48),
    borderRadius: 12,
    backgroundColor: COLORS.inputBackground,
    marginBottom: verticalScale(14),
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: horizontalScale(12),
    justifyContent: "center",
  },

  textAreaInput: {
    height: verticalScale(90),
    paddingTop: verticalScale(10),
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },

  smallLabel: {
    fontSize: verticalScale(13),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
  },

  howMuchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(6),
  },

  unitInput: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    height: verticalScale(48),
  },

  unitText: {
    fontSize: verticalScale(14),
    color: COLORS.black,
    fontFamily: "Poppins-Regular",
  },

  /* Save button */
  saveButton: {
    marginTop: verticalScale(30),
    alignSelf: "center",
    width: horizontalScale(190),
    height: verticalScale(52),
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.blue,
    elevation: 4,
  },

  /* Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",      // centers vertically
    alignItems: "center",          // centers horizontally
    paddingHorizontal: horizontalScale(20),
  },
  modalContainer: {
    width: "100%",                 // full width minus padding on overlay
    maxHeight: verticalScale(360),
    backgroundColor: COLORS.White,
    paddingHorizontal: horizontalScale(18),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(26),
    borderRadius: 18,
  },
  modalTitle: {
    fontSize: verticalScale(16),
    fontFamily: "Poppins-SemiBold",
    color: COLORS.black,
    marginBottom: verticalScale(12),
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: verticalScale(12),
  },
  modalItemText: {
    fontSize: verticalScale(15),
    color: COLORS.black,
    fontFamily: "Poppins-Regular",
  },
  modalSeparator: {
    height: 1,
    backgroundColor: COLORS.inputBorder,
  },
  modalCloseBtn: {
    marginTop: verticalScale(16),
    alignSelf: "center",
  },
  modalCloseText: {
    fontSize: verticalScale(15),
    color: COLORS.appLinear1,
    fontFamily: "Poppins-SemiBold",
  },
  dateview:{ 
    flexDirection: "row",
     justifyContent: "space-around" ,
     alignItems: "center",
    },
    dateTimeContainer:{
       flex: 1,
        marginRight: horizontalScale(30),
          marginLeft: horizontalScale(10),
          justifyContent: "space-around",
      },
      dateText:{ 
        color: COLORS.black,
         fontFamily: "Poppins-Regular",
          fontSize: 14 ,
        },
});
