import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { verticalScale, horizontalScale } from "../../utils/Metrics";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: horizontalScale(20),
        backgroundColor: 'transparent',
        marginTop: verticalScale(20),
    },
    header: {
        flexDirection: 'row',   
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(20),
    },  
    backIcon: {
        width: horizontalScale(40),
        height: verticalScale(40),  
        borderRadius: horizontalScale(20),
        backgroundColor: COLORS.appLinear1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    headerTitle: {  
        fontSize: verticalScale(24),
        color: COLORS.black,
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
    gridContainer: {
    marginTop: verticalScale(10),
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingBottom: verticalScale(60),
    justifyContent: "space-between",
    backgroundColor: COLORS.White,
    borderRadius: 20,
    padding: horizontalScale(15),
  },
    card: {
    width: "47%",
    height: verticalScale(200),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
   
  },
  cardIcon: {
    width: 150,
    height: 150,
    // resizeMode: "contain",
    marginBottom: 10,
    borderRadius: horizontalScale(10),
  },
  cardText: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: 20,
  },
});
export default styles;