import { Dimensions, Platform, StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { horizontalScale, verticalScale, responsiveFontSize } from "../../utils/Metrics";
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(16),
    backgroundColor: "transparent",
  },

  // header (back + title + home)
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },
  iconButton: {
    width: horizontalScale(36),
    height: verticalScale(36),
    borderRadius: horizontalScale(18),
    backgroundColor: COLORS.appLinear1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    fontSize: verticalScale(20),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
  },

  card: {
    flex: 1,
    marginTop: verticalScale(12),
    borderRadius: 18,
    backgroundColor: COLORS.backView, // light cream like screenshot
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(14),
  },

  tabRow: {
    flexDirection: "row",
    backgroundColor: COLORS.White,
    borderRadius: 20,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: verticalScale(8),
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonActive: {
    backgroundColor: COLORS.appLinear1,
  },
  tabText: {
    fontSize: responsiveFontSize(13),
    color: COLORS.darkgrey,
    fontFamily: "Poppins-Regular",
  },
  tabTextActive: {
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
  },

  scrollContent: {
    paddingVertical: verticalScale(12),
    paddingBottom: verticalScale(40),
  },

  sectionTitle: {
    fontSize: responsiveFontSize(14),
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: verticalScale(4),
  },

  unitBoxWrapper: {
    width: horizontalScale(80),
  },
    scannerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 1000,
  },
  
  barcodeScanner: {
    flex: 1,
  },
  
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  
  scannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingBottom: 20,
  },
  
  scannerTitle: {
    color: COLORS.White,
    fontSize: 20,
    fontWeight: '600',
  },
  
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
  
  scannerFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  scannerFrameCorner: {
    width: width * 0.7,
    height: width * 0.4,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: COLORS.White,
  },
  
  cornerTopLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  
  cornerTopRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  
  cornerBottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  
  cornerBottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  
  scannerInstructions: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 80 : 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  instructionsText: {
    color: COLORS.White,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  
  scannedText: {
    color: COLORS.green,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 5,
  },
  
  detectingText: {
    color: COLORS.yellow2,
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 5,
  },
  
  barcodeDataText: {
    color: COLORS.White,
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    fontFamily: 'monospace',
  },
  
  scannerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    padding: 20,
  },
  
  scannerText: {
    color: COLORS.White,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  
  scanButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  scanButton: {
    flex: 1,
  },
  
  manualButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.blue,
  },
  
  barcodeBounds: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 0, 0.5)',
    backgroundColor: 'rgba(255, 255, 0, 0.1)',
  },
    manualEntryContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    width: '100%',
  },
  
  manualEntryText: {
    color: COLORS.White,
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  
  manualInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  manualInput: {
    backgroundColor: COLORS.White,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    color: COLORS.black,
  },
  
  addButton: {
    height: 45,
    minWidth: 80,
  },
    loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  
  loadingText: {
    marginTop: 10,
    color: COLORS.blue,
    fontSize: 16,
  },
    childInfoContainer: {
    backgroundColor: COLORS.blue,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  
  childInfoText: {
    color: COLORS.White,
    textAlign: 'center',
  },

  analysisContainer: {
    backgroundColor: COLORS.White,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    maxHeight: '85%',
  },
  
  analysisTitle: {
    color: COLORS.blue,
    marginBottom: 16,
    textAlign: 'center',
  },
  
  searchInfoContainer: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  
  searchInfoText: {
    color: COLORS.darkgrey,
    marginBottom: 4,
  },
  
  analysisScroll: {
    maxHeight: 400,
  },
  
  infoCard: {
    backgroundColor: COLORS.White,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  
  sectionHeader: {
    color: COLORS.blue,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    paddingBottom: 8,
  },
  
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  infoValue: {
    color: COLORS.black,
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  ratingBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
  },
  
  ratingText: {
    color: COLORS.White,
  },
  
  scoreText: {
    color: COLORS.darkgrey,
  },
  
  analysisDetail: {
    marginBottom: 12,
  },
  
  detailText: {
    color: COLORS.black,
    marginTop: 4,
    lineHeight: 20,
  },
  
  fallbackNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.appLinear1,
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  
  fallbackText: {
    color: COLORS.blue,
    marginLeft: 8,
    flex: 1,
  },

  // Product Image Styles
  productImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  
  newAnalysisButton: {
    marginTop: 16,
  },
});

export default styles;
