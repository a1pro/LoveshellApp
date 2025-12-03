import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../utils/Metrics";
import COLORS from "../../utils/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
    backgroundColor: 'transparent',
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
  },
  dropdownIcon: {
    position: 'absolute', 
    right: 10, 
    top: '50%', 
    marginTop: -10 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(15),
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
    fontSize: verticalScale(22),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    flex: 1,
  },
  dataCard: {
    backgroundColor: COLORS.White,
    borderRadius: 20,
    padding: verticalScale(15),
    marginBottom: verticalScale(20),
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: verticalScale(16),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
    marginBottom: verticalScale(10),
    marginLeft: 2,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dataField: {
    flex: 1,
    // minWidth: 80,
    // maxWidth: 110,
    marginHorizontal: horizontalScale(3),
  },
  inputFull: {
    width: 115,
    minWidth: 95,
    maxWidth: 140,
  },
  inputMedium: {
    width: '100%',
    minWidth: 60,
    maxWidth: 100,
  },
  inputSmall: {
    width: 75,
    minWidth: 42,
    maxWidth: 85,
  },
  
  historyScrollContent: {
    paddingHorizontal: horizontalScale(10),
  },
  gridTable: {
    flexDirection: "column",
    gap: verticalScale(6),
  },
  gridRow: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent:"flex-start",
    minWidth: horizontalScale(550), // Ensures proper width for all columns
    paddingVertical: verticalScale(4),
  },
  gridItem: {
    backgroundColor: COLORS.White,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: horizontalScale(2),
    // maxWidth: horizontalScale(70),
    // borderWidth: 1,
    // borderColor: COLORS.blue,
  },
  gridItemSmall: {
    backgroundColor: COLORS.White,
    borderRadius: 10,
    marginHorizontal: horizontalScale(2),
    // width: horizontalScale(55),
 
  },
  gridUnitSmall: {
    backgroundColor: COLORS.White,
    borderRadius: 8,
    // width: horizontalScale(70),
    marginHorizontal: horizontalScale(1),
    // borderWidth: 1,
    // borderColor: COLORS.grey,
  },
  saveButton: {
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    width: '80%',
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.blue,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    maxHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
  unitList: {
    paddingBottom: 10,
  },
  unitOption: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  unitOptionSelected: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
  unitOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  unitOptionTextSelected: {
    color: 'white',
  },
  // Loading and No Data styles
  loadingText: {
    textAlign: 'center',
    fontSize: verticalScale(16),
    color: COLORS.grey,
    fontFamily: "Poppins-Regular",
    paddingVertical: verticalScale(20),
  },
  noDataText: {
    textAlign: 'center',
    fontSize: verticalScale(16),
    color: COLORS.grey,
    fontFamily: "Poppins-Regular",
    paddingVertical: verticalScale(20),
  },
  // Date picker specific styles
  dateFieldContainer: {
    flex: 1,
    minWidth: 120,
    maxWidth: 140,
    marginHorizontal: horizontalScale(3),
  },
  consultMealText: {
    fontSize: verticalScale(14),
    color: COLORS.blue,
    fontFamily: "Poppins-SemiBold",
    borderBottomWidth: 1,
    borderColor: COLORS.blue,
    paddingBottom: verticalScale(2),
  },
  consultantButton: {
  backgroundColor: COLORS.blue,
  // paddingHorizontal: horizontalScale(12),
  paddingVertical: verticalScale(8),
  borderRadius: 12,
  minWidth: horizontalScale(80),
  marginHorizontal:horizontalScale(20),
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 2,
  shadowColor: COLORS.black,
  shadowOpacity: 0.1,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
},
consultantButtonText: {
  color: COLORS.White,
  fontSize: verticalScale(12),
  fontFamily: 'Poppins-SemiBold',
  fontWeight: '600',
},
});

export default styles;
