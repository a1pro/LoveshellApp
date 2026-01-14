import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';
import {verticalScale, horizontalScale} from '../../utils/Metrics';

export const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(24),
  },
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(24),
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(12),
  },
  headerTitle: {
    fontSize: verticalScale(20),
    color: COLORS.black,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    flex: 1,
  },
  iconBtn: {
    width: horizontalScale(42),
    height: verticalScale(42),
    borderRadius: horizontalScale(21),
    backgroundColor: COLORS.appLinear1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  pageTitle: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: verticalScale(14),
    fontFamily: 'Poppins-Medium',
    marginBottom: verticalScale(10),
  },
  calendarCard: {
    marginHorizontal: horizontalScale(16),
    borderRadius: verticalScale(22),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(8),
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  calendar: {
    borderRadius: verticalScale(22),
  },
  dayContainer: {
    width: horizontalScale(40),
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContent: {
    width: horizontalScale(36),
    height: verticalScale(36),
    borderRadius: horizontalScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectedDay: {
    backgroundColor: COLORS.appLinear1,
  },
  todayDay: {
    borderWidth: 1,
    borderColor: COLORS.appLinear1,
  },
  dayNumber: {
    fontSize: verticalScale(14),
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
    textAlign: 'center',
  },
  selectedDayText: {
    color: COLORS.White,
    fontFamily: 'Poppins-SemiBold',
  },
  todayText: {
    color: COLORS.black,
    fontFamily: 'Poppins-SemiBold',
  },
   cardTopRow: {
    flexDirection: 'row',  
    alignItems: 'flex-start',  
  },
  vaccineImage: {
    width: 120,  
    height: 120,
    resizeMode:"contain"
    
  },
  vaccineTextContainer: {
    flex: 1,  
  },
  vaccineIconContainer: {
    position: 'absolute',
    bottom: verticalScale(2),
    alignItems: 'center',
  },
  vaccineIcon: {},
  vaccineCountBadge: {
    position: 'absolute',
    top: -verticalScale(8),
    right: -horizontalScale(6),
    backgroundColor: COLORS.appLinear1,
    borderRadius: horizontalScale(8),
    width: horizontalScale(16),
    height: verticalScale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  vaccineCountText: {
    color: COLORS.White,
    fontSize: verticalScale(8),
    fontFamily: 'Poppins-SemiBold',
  },
  emptyDay: {
    width: horizontalScale(40),
    height: verticalScale(40),
  },
  summaryCard: {
    backgroundColor: COLORS.White,
    marginHorizontal: horizontalScale(16),
    marginTop: verticalScale(16),
    borderRadius: verticalScale(18),
    padding: verticalScale(18),
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 4,
    marginBottom: verticalScale(16),
  },
  selectedDateText: {
    fontSize: verticalScale(16),
    fontFamily: 'Poppins-Medium',
    color: COLORS.black,
    marginBottom: verticalScale(12),
  },
  vaccineItem: {
    marginBottom: verticalScale(16),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  // FIXED: Added flexShrink and flexWrap for text wrapping
  vaccineTitle: {
    fontSize: verticalScale(18),
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
    marginBottom: verticalScale(4),
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  // FIXED: Added flexShrink and flexWrap for text wrapping
  vaccineSubTitle: {
    fontSize: verticalScale(12),
    fontFamily: 'Poppins-Regular',
    color: '#6b7280',
    marginBottom: verticalScale(8),
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
  statusText: {
    marginLeft: horizontalScale(6),
    fontSize: verticalScale(13),
    fontFamily: 'Poppins-Medium',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(16),
    backgroundColor: COLORS.White,
    borderRadius: verticalScale(12),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(16),
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    elevation: 2,
    gap: horizontalScale(16),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(6),
  },
  legendText: {
    fontSize: verticalScale(10),
    fontFamily: 'Poppins-Regular',
    color: '#4b5563',
  },
  loadingContainer: {
    marginHorizontal: horizontalScale(16),
    borderRadius: verticalScale(22),
    paddingVertical: verticalScale(40),
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: verticalScale(12),
    fontSize: verticalScale(14),
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
  },
  errorContainer: {
    marginHorizontal: horizontalScale(16),
    borderRadius: verticalScale(22),
    paddingVertical: verticalScale(40),
    paddingHorizontal: horizontalScale(20),
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: verticalScale(12),
    fontSize: verticalScale(14),
    fontFamily: 'Poppins-Regular',
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: verticalScale(16),
  },
  retryButton: {
    backgroundColor: COLORS.appLinear1,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(8),
  },
  retryButtonText: {
    color: COLORS.White,
    fontSize: verticalScale(14),
    fontFamily: 'Poppins-SemiBold',
  },
  // Vaccine card styles - now properly visible
  vaccineCard: {
    backgroundColor: '#f9fafb',
    borderRadius: verticalScale(12),
    padding: verticalScale(16),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  
  vaccineHeader: {
  minHeight: verticalScale(44),
  alignItems: 'flex-start',
  },

  vaccineInfo: {
    flex: 1,
    marginRight: horizontalScale(12),
  },
  updateButton: {
    backgroundColor: COLORS.appLinear1,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: verticalScale(8),
    minWidth: horizontalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,  
  },
  updateButtonText: {
    color: COLORS.White,
    fontSize: verticalScale(12),
    fontFamily: 'Poppins-SemiBold',
  },
});

export default styles;
