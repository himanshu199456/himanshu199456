import { Platform, StyleSheet } from 'react-native'
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    loginText: { color: colors.black, fontFamily: fonts.REGULAR,fontWeight:'500', fontSize: 20, lineHeight: 30, marginTop: 35 },
    forgotPasswordText: { marginTop: 10, fontSize: 16, fontFamily: fonts.REGULAR,fontWeight:'500', color: colors.forgot_text },
    button: { backgroundColor: colors.light_gray, marginTop: 35, }
})

export default styles;