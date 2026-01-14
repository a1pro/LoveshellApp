 export const API_URL = 'https://nutrition.a1professionals.net/api/';
export const IMAGE_URL = 'https://nutrition.a1professionals.net';
const ENDPOINTS = {
  register:`register`,
  login: `login`,
  Allergies: `allergies`,
  childRegister: `child/childRegister`,
  getchild: `child/getChild`,
  nutritionProduct:`get/nutrition/products`,
  addMealPlan:`nutrition/log-meal`,
  getMealData:`nutrition/daily-nutrition`,
  favouriteMeal:`nutrition/add/favourite/nutrition`,
  deleteMeal:`nutrition/delete/meal`,
  getstatus:`nutrition/get/daily/nutrition/status`,
  logout:`logout`,
  getrecipe:`recipes/current-week`,
  AddRecipe:"recipes/generate",
  growthImages:`growth`,
  growthdata:`growth/history`,
  growthrecord:`growth/record`,
  getVaccination:`vaccinations/child/`,
  addVaccination:`vaccinations`,

  updateVaccination:`vaccinations/administer`,
  addpost:`community/posts`,
  community:`community/all/posts`,
  communitymypost:`community/my/posts`,
  addlike:`community/like/add`,
  getlike:`community/like/get`,
  addcomment:`community/comment/add`,
  manualBarcode:`barcode/manual`,
  barcodeScan:`barcode/scan`,
  graphdata:`growth/graph-data`,
  foodchart:"nutrition/chart-data",
  GET_PRANKS: `development/activity-history`,
  CREATE_PRANKS: `development/weekly-activities`, 
  postReply: `community/comment/reply`,
  getReplies: `community/comment/replies`,
  addnewTopic:"internet/add/topic",
  getTopics:"internet/show/topic",
  FeaturedTopic:"internet/get/all/topics",
  addComent:"internet/add/comment",
  getComments:"internet/get/comment",
  getcommentReplies:"internet/get/comment/reply",
  addcommentReply:"internet/add/comment/reply",
 
 
};

export default ENDPOINTS;
 
