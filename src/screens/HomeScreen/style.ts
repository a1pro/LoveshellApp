import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { horizontalScale, verticalScale } from "../../utils/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(10),
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(5),
  },
  helloTxt: {
    fontSize: 30,
    color: COLORS.black,
  },
  subtitle: {
    color: COLORS.shottxt,
    marginTop: 3,
    fontSize: 14,
  },
  settingsIcon: {
    padding: 8,
    paddingHorizontal:horizontalScale(8),
    position: "absolute",
    right: 0,
    opacity: 1,
    backgroundColor: COLORS.background,
    borderRadius: 35,
  },
  gridContainer: {
    marginTop: verticalScale(10),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
    width: 65,
    height: 65,
    resizeMode: "contain",
    marginBottom: 10,
  },
  cardText: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: 13,
  },
});

export default styles;
