import { StyleSheet } from 'react-native';
import COLORS from '../../utils/Colors';
import { horizontalScale, verticalScale } from '../../utils/Metrics';

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
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: horizontalScale(15),
        borderWidth: 1,
        padding: 18,
        backgroundColor: COLORS.White,
        borderColor: COLORS.inputBorder,
    },
    deleteview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default styles;
