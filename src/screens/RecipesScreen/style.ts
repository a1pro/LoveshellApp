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
  
  // Updated for 2-column layout
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(8),
    paddingBottom: verticalScale(16),
    marginBottom: verticalScale(8),
  },
  
  recipeCard: {
    flex: 1,
    backgroundColor: "#F8EFC6",
    padding: horizontalScale(20),
    marginHorizontal: horizontalScale(4),
    height: verticalScale(180),
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
  },
  recipeName: {
    color: COLORS.orange,
    textAlign: 'center',
    marginBottom: verticalScale(12),
    fontSize: verticalScale(16),
    lineHeight: verticalScale(20),
    fontFamily: "Poppins-SemiBold",
  },
  mealTypeBadge: {
    backgroundColor: COLORS.blue + '20',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: 20,
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: COLORS.blue + '40',
  },
  mealTypeText: {
    color: COLORS.blue,
    fontSize: verticalScale(12),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: "Poppins-Medium",
  },
  timingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: 16,
  },
  timingText: {
    color: COLORS.orange,
    marginLeft: horizontalScale(8),
    fontSize: verticalScale(14),
    fontFamily: "Poppins-Medium",
  },
  
  weekRangeContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  weekRangeText: {
    color: COLORS.White,
    fontFamily: 'Poppins-Medium',
    fontSize: verticalScale(14),
  },
  recipeCountContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  recipeCountText: {
    color: COLORS.White,
    fontFamily: 'Poppins-Medium',
    fontSize: verticalScale(16),
  },
  listContainer: {
    paddingBottom: verticalScale(100),
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: verticalScale(60),
  },
  emptyTitle: {
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: verticalScale(16),
    fontSize: verticalScale(16),
  },
  emptySubtitle: {
    color: COLORS.grey,
    marginTop: verticalScale(8),
    fontSize: verticalScale(14),
    textAlign: 'center',
  },
});
