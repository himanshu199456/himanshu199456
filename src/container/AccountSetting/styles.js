import { Platform, StyleSheet } from 'react-native'
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { DEVICE, isIphoneXorAbove, smartScale } from '../../utils/constant';


const styles = StyleSheet.create({
    container: { flex: 1, marginHorizontal: 20, },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
    profileView: { marginTop: 15, width: 130, height: 130, borderRadius: 260, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', zIndex: 998 },
    profileImage: { width: 130, height: 130, borderRadius: 260, },
    userDetailContainer: { flex: 1, marginLeft: 10, justifyContent: 'space-between', marginTop: 10 },
    userNameView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    userName: { fontFamily: fonts.BOLD_700, fontSize: 20 },
    userDetailText: { fontFamily: fonts.MEDIUM_500, fontSize: 13, marginTop: 5 },
    accountView: { backgroundColor: colors.blue, borderTopLeftRadius: 10, borderTopRightRadius: 10, },
    accountText: { padding: 10, color: colors.white, fontFamily: fonts.MEDIUM_500, fontSize: 16 },
    accountOptionView: {
        shadowColor: '#000', backgroundColor: colors.white,
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5, padding: 10,paddingTop:0,
        borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
        paddingBottom: 20
    },
    optionView:{ flexDirection: 'row', alignItems: 'center', marginTop: 15 },
    optionText: { flex: 1, fontFamily: fonts.MEDIUM_500, marginLeft: 15 }

})

export default styles;