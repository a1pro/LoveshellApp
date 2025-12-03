import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { verticalScale, horizontalScale } from "../../utils/Metrics";

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: verticalScale(10),
    color: COLORS.black,
    fontSize: verticalScale(16),
    fontFamily: "Poppins-Medium",
  },

  // Header Section
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(10),
  },
  headerTitleWrapper: {
    flex: 1,
    marginHorizontal: horizontalScale(10),
  },
  headerText: {
    fontSize: verticalScale(22),
    color: COLORS.black,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  headerSubText: {
    fontSize: verticalScale(11),
    color: COLORS.darkgrey,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    marginTop: verticalScale(2),
  },
  headerIcon: {
    width: horizontalScale(40),
    height: verticalScale(40),
    borderRadius: horizontalScale(20),
    backgroundColor: COLORS.appLinear1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  scrollContent: {
    paddingBottom: verticalScale(30),
  },

  childSection: {
    marginTop: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
  },

  sectionTitle: {
    fontSize: verticalScale(18),
    color: COLORS.black,
    marginBottom: verticalScale(15),
    fontFamily: "Poppins-SemiBold",
  },

  childListContent: {
    paddingHorizontal: horizontalScale(5),
  },

  childButton: {
    borderRadius: horizontalScale(25),
    backgroundColor: COLORS.White,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    marginHorizontal: horizontalScale(5),
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: COLORS.lightGrey || COLORS.grey,
  },
  childButtonActive: {
    backgroundColor: COLORS.appLinear1,
    borderColor: COLORS.appLinear1,
    borderWidth: 2,
  },
  childText: {
    fontSize: verticalScale(14),
    color: COLORS.darkgrey,
    fontFamily: "Poppins-Medium",
  },
  childTextActive: {
    color: COLORS.White,
    fontFamily: "Poppins-SemiBold",
  },

  productsSection: {
    marginTop: verticalScale(25),
    paddingHorizontal: horizontalScale(20),
  },

  // Card + Image grid (like screenshot)
  cardContainer: {
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(20),
    backgroundColor: COLORS.White,
    borderRadius: verticalScale(24),
    padding: verticalScale(16),
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  imageGridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
  },
  gridImage: {
    width: "48%",
    height: verticalScale(130),
    borderRadius: verticalScale(18),
  },
});

export default styles;
