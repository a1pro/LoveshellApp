import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { verticalScale, horizontalScale } from "../../utils/Metrics";

const styles = StyleSheet.create({
  // Loading State
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

  // Header Section
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(10),
  },
  headerText: {
    fontSize: verticalScale(28),
    color: COLORS.black,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  headerIcon: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: horizontalScale(30),
    backgroundColor: COLORS.appLinear1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  childSection: {
    marginTop: verticalScale(25),
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
    color: COLORS.black,
    fontFamily: "Poppins-Medium",
  },
  childTextActive: {
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
  },
  productsSection: {
    flex: 1,
    marginTop: verticalScale(25),
    paddingHorizontal: horizontalScale(20),
  },
  productsLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  productsLoadingText: {
    marginTop: verticalScale(10),
    color: COLORS.darkgrey,
    fontSize: verticalScale(14),
  },
  gridContent: {
    paddingBottom: verticalScale(20),
  },
  gridRow: {
    justifyContent: "space-between",
    marginBottom: verticalScale(15),
  },
  gridItem: {
    width: horizontalScale(160),
    height: verticalScale(180),
    backgroundColor: COLORS.White,
    borderRadius: horizontalScale(20),
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    marginHorizontal: horizontalScale(5),
    overflow: "hidden",
  },
  productImageContainer: {
    height: verticalScale(120),
    width: "100%",
    backgroundColor: COLORS.backView,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: horizontalScale(20),
  },
  productInfo: {
    padding: horizontalScale(12),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  productName: {
    fontSize: verticalScale(14),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
    marginBottom: verticalScale(4),
    textAlign: 'center',
  },
  productStatus: {
    fontSize: verticalScale(12),
    color: COLORS.darkgrey,
    fontFamily: "Poppins-Regular",
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  emptyText: {
    fontSize: verticalScale(16),
    color: COLORS.darkgrey,
    fontFamily: "Poppins-Medium",
    marginBottom: verticalScale(15),
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: horizontalScale(8),
  },
  retryButtonText: {
    color: COLORS.White,
    fontSize: verticalScale(14),
    fontFamily: "Poppins-SemiBold",
  },
});

export default styles;