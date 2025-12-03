import { StyleSheet } from 'react-native';
import COLORS from '../../utils/Colors';
import { horizontalScale, verticalScale } from '../../utils/Metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(20),
    backgroundColor: "transparent", 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  backIcon: {
    padding: horizontalScale(5),
  },
  headerTitle: {
    fontSize: verticalScale(20),
    color: COLORS.black,
  },
  screenTitle: {
    alignSelf: "center",
    fontSize: verticalScale(18),
    color: COLORS.shottxt,
    marginBottom: verticalScale(10),
  },
  card: {
    backgroundColor: COLORS.White,
    borderRadius: horizontalScale(16),
    padding: horizontalScale(12),
    elevation: 2,
    shadowColor: COLORS.grey,
    shadowOpacity: 0.09,
    shadowRadius: 6,
    marginBottom: verticalScale(4),
  },
  cardTitle: {
    color: COLORS.black,
    fontSize: verticalScale(16),
    marginBottom: verticalScale(12),
  },
  chartStyle: {
    borderRadius: horizontalScale(16),
    marginBottom: verticalScale(6),
    alignSelf: "center",
  },
  analysisCard: {
    backgroundColor: COLORS.White,
    borderRadius: horizontalScale(12),
    padding: horizontalScale(12),
    marginTop: verticalScale(10),
    elevation: 1,
    shadowColor: COLORS.grey,
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  analysisText: {
    color: COLORS.shottxt,
    fontSize: verticalScale(13),
    marginTop: verticalScale(6),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartImage: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
