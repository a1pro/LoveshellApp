import { StyleSheet } from 'react-native';
import COLORS from '../../utils/Colors';
import { horizontalScale, verticalScale } from '../../utils/Metrics';

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15 },
  viewCon: {
    backgroundColor: COLORS.backView,
    padding: 20,
    borderRadius: 15,
    marginTop: 40,
    justifyContent: 'center',

  },
  txt: {
    textAlign: "center"
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    width: '35%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.White,
  },
  btns: {
    borderWidth: 1,
    borderColor: COLORS.blue,
    backgroundColor: COLORS.White,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    padding: 10,
    // height: verticalScale(40),
  }
});

export default styles;
