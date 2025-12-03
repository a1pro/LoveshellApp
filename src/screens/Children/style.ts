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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: horizontalScale(20),
    paddingBottom: verticalScale(30),
  },
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
    borderColor: COLORS.inputBorder,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
    paddingBottom: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
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
  dataSection: {
    // Space for data fields
  },
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
});

export default styles;