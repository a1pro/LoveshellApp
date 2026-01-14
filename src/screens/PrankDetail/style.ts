import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { horizontalScale,verticalScale } from "../../utils/Metrics";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(16),
  },
    scrollViewContent: {
    paddingBottom: verticalScale(20),
  },
    header: {   
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(10),
  },
  backIcon: {
    padding: horizontalScale(8),
  },
  headerTitle: {

    color: COLORS.black,
    fontSize: verticalScale(20),
    fontWeight: "600",
    },
    contentCard: {
  backgroundColor: COLORS.White,
  borderRadius: 24,
  padding: 20,
  marginHorizontal: 1,
  shadowColor: COLORS.black,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 16,
  elevation: 12,
},
sectionCard: {
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: 20,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: 'rgba(0, 0, 0, 0.08)',
  marginBottom: 8,
},
 
});

export default styles;