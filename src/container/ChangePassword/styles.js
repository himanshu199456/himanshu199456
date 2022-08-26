import { Platform, StyleSheet } from 'react-native'
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    subContainer:{ flex: 1, marginHorizontal: 10 },
    backButtonContainer:{ flexDirection: 'row', marginTop: 10, alignItems: 'center' },
    titleText:{ color: colors.sky, fontSize: 20, fontFamily: fonts.SEMI_BOLD, marginLeft: 10 },
    text: { color: colors.black, fontFamily: fonts.REGULAR, fontWeight: '500', fontSize: 24, lineHeight: 30, marginTop: 35 },
    buttonContainer:{ alignSelf: 'flex-end', backgroundColor: colors.light_gray, borderRadius: 40, paddingHorizontal: 24, paddingVertical: 16, marginTop: 80, justifyContent: 'center' },
    buttonText:{ color: colors.white, alignSelf: 'center', color: colors.chip_text_color, fontFamily: fonts.SEMI_BOLD, textTransform: 'uppercase' }
})

export default styles;