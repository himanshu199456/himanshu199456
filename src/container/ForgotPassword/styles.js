import { Platform, StyleSheet } from 'react-native'
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    subContainer: { flex: 1, marginHorizontal: 24 },
    text: { color: colors.black, fontFamily: fonts.REGULAR, fontWeight: '500', fontSize: 24, lineHeight: 30, marginTop: 35 },
    descriptionText: { color: colors.sky, fontFamily: fonts.REGULAR, marginTop: 20, marginRight: 70 },
    errorText: { alignSelf: 'flex-end', color: colors.error_text, fontFamily: fonts.REGULAR, marginTop: 10, },
    button: { width: hp(22), backgroundColor: colors.light_gray, marginTop: 35, }
})

export default styles;