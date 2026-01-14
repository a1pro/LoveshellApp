import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { verticalScale, horizontalScale } from "../../utils/Metrics";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: horizontalScale(20),
        backgroundColor: 'transparent',
        marginTop: verticalScale(20),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(20),
    },
    backIcon: {
        width: horizontalScale(40),
        height: verticalScale(40),
        borderRadius: horizontalScale(20),
        backgroundColor: COLORS.appLinear1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    headerTitle: {
        fontSize: verticalScale(24),
        color: COLORS.black,
        fontFamily: "Poppins-SemiBold",
        alignSelf: "center"
    },
    helloTxt: {
    fontSize: 25,
    textAlign:"center",
    color: COLORS.black,
  },

    childListContent: {
        paddingHorizontal: horizontalScale(5),
    },
    childButton: {
        borderRadius: horizontalScale(25),
        backgroundColor: COLORS.White,
        paddingHorizontal: horizontalScale(20),
        paddingVertical: verticalScale(10),
        marginHorizontal: horizontalScale(5),
        elevation: 2,
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        borderWidth: 1,
        borderColor: COLORS.lightGrey || COLORS.grey,
    },
    childButtonActive: {
        backgroundColor: COLORS.appLinear1,
        borderColor: COLORS.appLinear1,
        borderWidth: 2,
    },
    childText: {
        fontSize: verticalScale(14),
        color: COLORS.darkgrey,
        fontFamily: "Poppins-Medium",
    },
    childTextActive: {
        color: COLORS.black,
        fontFamily: "Poppins-SemiBold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: verticalScale(10),
        color: COLORS.black,
        fontSize: verticalScale(16),
        fontFamily: "Poppins-Medium",
    },
    childSection: {
        marginTop: verticalScale(25),
        paddingHorizontal: horizontalScale(20),
    },
    sectionTitle: {
        fontSize: verticalScale(18),
        color: COLORS.black,
        marginBottom: verticalScale(15),
        fontFamily: "Poppins-SemiBold",
    },
    gridContainer: {
        paddingBottom: verticalScale(10),
        backgroundColor: COLORS.White,
        borderRadius: 20,
        padding: horizontalScale(15),
        marginBottom: verticalScale(15)

    },
    vgridContainer: {
        marginTop: verticalScale(10),

       
        alignItems: "center",
        paddingBottom: verticalScale(10),
        justifyContent: "space-between",
        backgroundColor: COLORS.White,
        borderRadius: 20,
        padding: horizontalScale(15),

    },
    userdetaisl: {
        flexDirection: 'row',

        width: "100%",
        marginBottom: verticalScale(20)
    },
    profileimg: {
        height: 40,
        width: 40,
        borderRadius: 50,
    },
    username: {
        marginHorizontal: verticalScale(10)
    },
    addIcon: {
        zIndex: 4,
        position: "absolute",
    },

    card: {
        width: "100%",
        // height: verticalScale(0),
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",

    },

    cardIcon: {
        width: "100%",
        height: 250,

        marginBottom: 10,
        borderRadius: horizontalScale(10),
    },
    cardText: {
        textAlign: "center",
        color: COLORS.black,
        fontSize: 20,
    },
    likeshareRow: {
        flexDirection: "row",
        marginTop: verticalScale(30),
    },
    lcs: {
       
        flexDirection: "row",

    },
    count: {
        marginHorizontal: horizontalScale(10)
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.blue,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 6, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

    phovid: {
        alignItems: "center",
        // backgroundColor: COLORS.appLinear1,
        marginHorizontal: 10,
        justifyContent: "center",

    },

    activeTab: {
        color: COLORS.White,
        fontWeight: "bold",
        backgroundColor: COLORS.appLinear1,
        borderRadius: 9,
        paddingHorizontal: verticalScale(19),
        fontSize: 15

    },

    inactiveTab: {
        color: COLORS.black,
        opacity: 0.9,
        fontWeight: "bold",
        fontSize: 15
    },

    vcard: {
        flexBasis: "32%",
        flexGrow: 1,
        margin: "1%",
        borderRadius: 12,
        // padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    vcardIcon: {
        width: "100%",
        height: 130,
        borderRadius: 10,
    },

    selectcat: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
      
    },
    addmore: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        backgroundColor: COLORS.blue,
        width: "40%",
        height: 40,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    postselect: {
        flexDirection: 'row',
        width: "100%",
        padding: verticalScale(10)
    },
    selbutton: {
        height: verticalScale(70),
        width: horizontalScale(90),
        backgroundColor: COLORS.inputBackground,
        // borderWidth:1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: verticalScale(30),
        marginHorizontal: horizontalScale(10),
        elevation: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    submit: {
        marginTop: 15,
        backgroundColor: COLORS.appLinear1,
        padding: 12,
        borderRadius: 8,
        alignItems: "center"
    },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentsList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  commentItem: {
    marginBottom: 15,
    paddingRight: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  commentUserImage: {
    marginRight: 10,
  },
  commentProfileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  commentUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  commentTextContainer: {
    marginLeft: 46, // 36px image width + 10px margin
    marginBottom: 8,
  },
  commentText: {
    color: COLORS.black,
    lineHeight: 20,
  },
  commentActions: {
    marginLeft: 46,
    flexDirection: 'row',
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  repliesContainer: {
    marginTop: 10,
    marginLeft: 36,  
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.lightGrey,
  },
  noCommentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  replyingToContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  replyingToContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentInputContainer: {
    paddingHorizontal: 15,
    paddingVertical: 35,
    
   
   
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.bordercolor,
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 50,
    marginRight: 10,
    backgroundColor: COLORS.White,
    fontSize: 14,
    textAlignVertical: 'center',
  },
  postButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue, // Fallback color
  },

});
export default styles;