import { StyleSheet } from 'react-native';
import COLORS from '../../utils/Colors';
import { horizontalScale, verticalScale } from '../../utils/Metrics';

const styles = StyleSheet.create({
  linearContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(15),
    backgroundColor: COLORS.backView,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: verticalScale(5),
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: verticalScale(5),
  },
  // Tabs
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.appLinear1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: verticalScale(8),
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: horizontalScale(3),
    backgroundColor: COLORS.inputBackground,
  },
  activeTabButton: {
    backgroundColor: COLORS.blue,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: horizontalScale(20),
    paddingBottom: verticalScale(30),
  },
  addTabScrollContent: {
    padding: 0,
  },
  // Child List Tab Styles
  childCard: {
    backgroundColor: COLORS.White,
    borderRadius: 12,
    padding: horizontalScale(16),
    marginBottom: verticalScale(16),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.White,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
    paddingBottom: verticalScale(10),
  },
  editButton: {
    padding: horizontalScale(5),
  },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    padding: horizontalScale(5),
    marginRight: horizontalScale(5),
  },
  cancelButton: {
    padding: horizontalScale(5),
  },
  dataSection: {},
  fieldContainer: {
    marginBottom: verticalScale(12),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },
  halfField: {
    flex: 0.48,
  },
  label: {
    fontSize: 14,
    marginBottom: verticalScale(4),
  },
  value: {
    fontSize: 16,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  inputContainer: {
    marginBottom: 0,
  },
  updateButton: {
    backgroundColor: COLORS.blue,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(50),
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  refreshButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Add Child Tab Styles
  addChildScrollView: {
    flex: 1,
  },
  addChildScrollContent: {
    paddingHorizontal: horizontalScale(15),
    paddingBottom: verticalScale(30),
  },
  addChildCard: {
    backgroundColor: COLORS.backView,
    padding: 20,
    borderRadius: 15,
    marginTop: verticalScale(25),
    justifyContent: 'center',
    marginHorizontal: horizontalScale(5),
  },
  deleteview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  childNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addChildForm: {
    gap: 10,
  },
  addChildInput: {
    marginBottom: 0,
  },
  genderAllergyRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  genderContainer: {
    flex: 1,
  },
  allergyContainer: {
    flex: 1,
  },
  selectionButton: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 16,
    padding: 16,
    backgroundColor: COLORS.White,
    marginTop: verticalScale(4),
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: horizontalScale(15),
    borderWidth: 1,
    padding: 18,
    backgroundColor: COLORS.White,
    borderColor: COLORS.inputBorder,
    marginTop: verticalScale(4),
  },
  weightHeightRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  weightContainer: {
    flex: 1.5,
  },
  heightContainer: {
    flex: 1.5,
  },
  unitContainer: {
    flex: 1,
  },
  smallInput: {
    marginBottom: 0,
  },
  unitInput: {
    marginBottom: 0,
    width:65
    // backgroundColor: COLORS.inputBackground,
  },
  addMoreButton: {
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(15),
    backgroundColor: COLORS.inputBackground,
    borderRadius: 18,
    borderWidth: 1,
    width:"60%",
    alignSelf:"center",
    borderColor: COLORS.inputBorder,
  },
  registerButton: {
    backgroundColor: COLORS.blue,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
     width:"60%",
    alignSelf:"center",
    marginTop: verticalScale(20),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Allergy Modal Styles
  allergyModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  allergyModalContent: {
    backgroundColor: COLORS.White,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '70%',
  },
  allergyItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  cancelAllergyButton: {
    marginTop: 10,
    alignSelf: 'center',
    padding: 10,
  },
});

export default styles;