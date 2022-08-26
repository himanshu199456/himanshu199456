import { Platform, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white, },
    signUpText: { color: colors.header_color,fontFamily: fonts.REGULAR,fontWeight:'500', fontSize: hp(2.4),  marginVertical: 35,marginBottom:20 },
    description: { marginTop: 20, textAlign: 'center', marginTop: Platform.OS == 'android' ? 70 : 80, fontSize: hp(1.8), fontFamily: fonts.REGULAR, color: colors.sky },
    button: { backgroundColor: colors.light_gray, marginTop: 35, }
})

export default styles;