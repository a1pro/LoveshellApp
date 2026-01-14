import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { horizontalScale, verticalScale } from "../../utils/Metrics";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(20),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(18),
  },
  backIcon: {
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

  scrollContent: {
    paddingBottom: verticalScale(40),
  },

  recipeName: {
    fontSize: verticalScale(22),
    color: COLORS.orange,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
  },

  card: {
    backgroundColor: COLORS.White,
    borderRadius: 20,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(14),
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 4,
  },

  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: verticalScale(18),
    color: COLORS.black,
  },

  // Nutrition summary
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(8),
  },
  nutritionItem: {
    flex: 1,
    marginRight: horizontalScale(8),
  },
  nutritionItemFull: {
    flex: 1,
  },
  nutritionLabel: {
    fontSize: verticalScale(14),
    color: COLORS.buttonTxt,
    fontFamily: "Poppins-Regular",
  },
  nutritionValue: {
    fontSize: verticalScale(16),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
    marginTop: verticalScale(2),
  },
 
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  topRowLeft: {
    flex: 1,
    paddingRight: horizontalScale(8),
  },
  topName: {
    fontSize: verticalScale(14),
    color: COLORS.black,
  },
  mealBadge: {
    alignSelf: "flex-start",
    marginTop: verticalScale(6),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(4),
    borderRadius: 14,
    backgroundColor: COLORS.blue + "20",
  },
  mealBadgeText: {
    fontSize: verticalScale(11),
    color: COLORS.blue,
    textTransform: "uppercase",
    fontFamily: "Poppins-Medium",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginLeft: horizontalScale(4),
    fontSize: verticalScale(12),
    color: COLORS.orange,
    fontFamily: "Poppins-Medium",
  },

  sectionLabel: {
    fontSize: verticalScale(16),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
    marginBottom: verticalScale(4),
  },
  sectionLabelSmall: {
    fontSize: verticalScale(16),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
    marginBottom: verticalScale(2),
  },
  sectionText: {
    fontSize: verticalScale(14),
    color: COLORS.grey,
    fontFamily: "Poppins-Regular",
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: verticalScale(4),
  },
  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.orange,
    marginTop: verticalScale(6),
    marginRight: horizontalScale(6),
  },
  stepNumber: {
    fontSize: verticalScale(12),
    color: COLORS.orange,
    marginRight: horizontalScale(6),
    fontFamily: "Poppins-Medium",
    marginTop: verticalScale(2),
  },

  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeItem: {
    flex: 1,
    marginRight: horizontalScale(8),
  },

  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(6),
  },
  linkText: {
    marginLeft: horizontalScale(6),
    fontSize: verticalScale(12),
    color: COLORS.blue,
    textDecorationLine: "underline",
    flex: 1,
  },
});
