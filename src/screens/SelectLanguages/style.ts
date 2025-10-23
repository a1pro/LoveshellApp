import { StyleSheet } from 'react-native';
import COLORS from '../../utils/Colors';
import { verticalScale } from '../../utils/Metrics';
const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 15 },
    viewCon: {
        backgroundColor: COLORS.backView,
        padding: 20,
        borderRadius: 15,
        marginTop: verticalScale(25),
        justifyContent: 'center',

    },
    txt: {
        textAlign: 'center',
    },
    btns: {
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        backgroundColor: COLORS.White,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        marginVertical: verticalScale(5)
    },
});

export default styles;
