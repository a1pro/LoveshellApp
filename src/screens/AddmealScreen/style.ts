import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { horizontalScale, verticalScale } from "../../utils/Metrics";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: horizontalScale(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: verticalScale(10),
    color: COLORS.black,
    fontSize: verticalScale(16),
    fontFamily: "Poppins-Medium",
  },
  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
  },

  backIcon: {
    width: horizontalScale(40),
    height: verticalScale(40),
    borderRadius: horizontalScale(20),
    backgroundColor: COLORS.appLinear1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  headerTitle: {
    fontSize: verticalScale(22),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },

  /* Main Content */
  content: {
    flex: 1,
  },

  /* Meal Card */
  mealCard: {
    backgroundColor: COLORS.White,
    borderRadius: horizontalScale(10),
    padding: horizontalScale(16),
    elevation: 2,
    marginBottom: verticalScale(15),
  },

  /* Meal Header */
  mealHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(15),
  },

  mealSectionTitle: {
    fontSize: verticalScale(16),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
  },

  consultMealText: {
    fontSize: verticalScale(14),
    color: COLORS.blue,
    fontFamily: "Poppins-SemiBold",
    borderBottomWidth: 1,
    borderColor: COLORS.blue,
    paddingBottom: verticalScale(2),
  },

  /* Input Row */
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  inputColumn: {
    flex: 1,
    marginRight: horizontalScale(10),
  },

 

  inputLabel: {
    fontSize: verticalScale(14),
    color: COLORS.darkgrey,
    fontFamily: "Poppins-Regular",
    marginBottom: verticalScale(8),
  },

  inputContainer: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: horizontalScale(8),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    minHeight: verticalScale(45),
    justifyContent: "center",
  },

  inputValue: {
    fontSize: verticalScale(14),
    color: COLORS.black,
    fontFamily: "Poppins-Regular",
  },

  /* Analysis Section */
  analysisContainer: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: horizontalScale(8),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    minHeight: verticalScale(45),
    justifyContent: "center",
  },

  analysisText: {
    fontSize: verticalScale(14),
    color: COLORS.black,
    fontFamily: "Poppins-Regular",
  },

  /* Notes Section */
  notesContainer: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: horizontalScale(8),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    minHeight: verticalScale(80),
  },

  notesPlaceholder: {
    fontSize: verticalScale(14),
    color: COLORS.darkgrey,
    fontFamily: "Poppins-Regular",
  },
  isrow:{
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: verticalScale(10),
    paddingHorizontal: horizontalScale(10),

  }
});