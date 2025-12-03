import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { verticalScale, horizontalScale } from "../../utils/Metrics";


const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: horizontalScale(20),
        backgroundColor: 'transparent',
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
    placeholderIcon: {
        width: horizontalScale(40),
        height: verticalScale(40),
    },
    content: {  
        marginTop: verticalScale(10),
    },
    infoText: {
        fontSize: verticalScale(16),
        color: COLORS.White,
        fontFamily: "Poppins-Regular",
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
    width: 185,
    height: 185,
    // resizeMode: "contain",
    marginBottom: 10,
    borderRadius:horizontalScale(20),
    marginLeft: horizontalScale(30)

  },
  cardText: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: 20,
  },
}); 
export default style;