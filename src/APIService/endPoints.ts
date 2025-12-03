export const API_URL = 'https://nutrition.a1professionals.net/api/';
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
  getrecipe:`recipes`,
  growthImages:`growth`,
  growthdata:`growth/history`,
  growthrecord:`growth/record`,
  getVaccination:`vaccinations/child/`,
  addVaccination:`vaccinations`,
  updateVaccination:`vaccinations/administer`
};

export default ENDPOINTS;
 
