import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { horizontalScale, verticalScale } from "../../utils/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(16),
    backgroundColor: "transparent",
  },

  // header (back + title + home)
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },
  iconButton: {
    width: horizontalScale(36),
    height: verticalScale(36),
    borderRadius: horizontalScale(18),
    backgroundColor: COLORS.appLinear1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    fontSize: verticalScale(20),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
  },
  subTitle: {
    fontSize: verticalScale(12),
    color: COLORS.darkgrey,
    textAlign: "center",
  },

  // main white card
  card: {
    flex: 1,
    marginTop: verticalScale(10),
    borderRadius: 16,
    backgroundColor: COLORS.White,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(10),
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },

  // table header row
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(6),
  },
  headerText: {
    fontSize: verticalScale(12),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
  },
  headerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.bordercolor,
    marginBottom: verticalScale(4),
  },

  // columns
  colName: {
    flex: 2,
    justifyContent: "center",
  },
  colDDR: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  colAchieved: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // rows
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(8),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.bordercolor,
  },
  rowText: {
    fontSize: verticalScale(12),
    color: COLORS.darkgrey,
    fontFamily: "Poppins-Regular",
  },

  listContent: {
    paddingBottom: verticalScale(10),
  },

  loaderContainer: {
    paddingVertical: verticalScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
