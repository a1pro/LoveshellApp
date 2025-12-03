import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { verticalScale, horizontalScale } from "../../utils/Metrics";

const styles = StyleSheet.create({
  dayContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 8,
  height: 50,
},
todayDayContainer: {
  backgroundColor: COLORS.blue,
  borderRadius: 16,
},
todayDayText: {
  color: COLORS.White,
  fontWeight: 'bold',
},
dayText: {
  fontSize: 14,
  fontFamily: 'Poppins-Regular',
  textAlign: 'center',
},
dayIcon: {
  marginTop: 2,
},
disabledDayContainer: {
  opacity: 0.5,
},
disabledDayText: {
  color: COLORS.grey,
},
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(50),
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
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
    fontSize: verticalScale(18),
    color: COLORS.buttonTxt,
    fontFamily: "Poppins-SemiBold",
    textAlign: 'center',
    lineHeight: verticalScale(24),
  },
  calendarContainer: {
   
    borderRadius: horizontalScale(20),
    padding: horizontalScale(15),

  },
  calendar: {
    borderRadius: horizontalScale(15),
  },
  calendarHeader: {
    alignItems: 'center',
    marginBottom: verticalScale(15),
    paddingVertical: verticalScale(10),
  },
  calendarHeaderText: {
    fontSize: verticalScale(20),
    color: COLORS.black,
    fontFamily: "Poppins-Bold",
  },
 
  otherMonthDay: {
    color: COLORS.grey,
    opacity: 0.5,
  },

  emptyDay: {
    width: 32,
    height: 45,
  },
  legendContainer: {
    backgroundColor: COLORS.White,
    borderRadius: horizontalScale(30),
    padding: horizontalScale(20),
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  legendTitle: {
    fontSize: verticalScale(16),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
    textAlign: 'center',
    marginBottom: verticalScale(5),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  legendIcon: {
    marginRight: horizontalScale(12),
  },
  legendText: {
    fontSize: verticalScale(14),
    color: COLORS.buttonTxt,
    fontFamily: "Poppins-Regular",
  },
 
});

export default styles;