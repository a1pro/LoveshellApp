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
    marginBottom: verticalScale(8),
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
  childName: {
    fontSize: verticalScale(14),
    color: COLORS.black,
  },
  formContainer: {
    paddingBottom: verticalScale(30),
  },
  saveButton: {
    height: verticalScale(50),
    borderRadius: 25,
    backgroundColor: COLORS.blue || COLORS.appLinear1,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: COLORS.White,
    fontSize: verticalScale(16),
  },
});

export default styles;
