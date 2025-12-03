import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { horizontalScale, verticalScale } from "../../utils/Metrics";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
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
    opacity: 0.8,
    marginBottom: verticalScale(20),
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    elevation: 3,
  },
  cardIcon: {
    width: 150,
    height: 150,
    // resizeMode: "contain",
    marginBottom: 10,
    borderRadius:horizontalScale(20)
  },
  cardText: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: 20,
  },
});