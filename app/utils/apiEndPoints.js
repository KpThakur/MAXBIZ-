export default {
  JWTTOKEN: "jwtToken/tokenGenerate",
  GETCITY: "master/getCitiesList",
  GETSERVICENAME: "master/getServiceList",
  GETALLSERVICES: "service/getListServicesSearch",
  GETSERVICEDETAIL: "service/getServicesDetails",
  GETIMAGE: "business/getImage",

  // for Auth login
  BUSINESSLOGIN: "userAuth/userLogin",
  VERIFYEDOTP: "userAuth/verifyedOtp",
  RELOGIN_BUSINESS: "userAuth/reloginbusiness",
  BUSINESSDETAIL: "userAuth/getBusinessDetails",
  BUSINESSDETAILUPDATE: "/userAuth/businessDetailUpdate",
  LOGOUT: "userlogout/userLogout",

  //for registration dashboard
  USERREGISTER: "userAuth/userRegister",
  VERIFYEMAILMOBILE: "userAuth/verifyEmailMobile",
  RESENTOTP: "userAuth/resentOtp",
  GETINDUSTRYLIST: "/master/getIndustryList",
  GETCITIESLIST: "master/getCitiesList",
  REGISTERBUSINESSDETAIL: "userAuth/registerBusinessDetail",
  GETSERVICELIST: "master/getServiceList",
  FORGOTPASSWORD: "userAuth/forgotPassword",

  GETVALIDATIONLIST: "master/getValidationList",

  GETVIDEODOCUMENTDATA: "/business/getVideoDocumentData",
  ADDVIDEOFILE: "/business/addVideoFile",
  UPDATEVIDEOFILE: "/business/updateVideoFile",
  VIDEODOCUMENTDELETE: "/business/videoDocumentDelete",
  GETBUSINESSOFFERlIST: "/business/getBusinessOfferList",
  ADDOFFER: "/business/addOffer",
  UPDATEOFFER: "/business/updateOffer",
  OFFERDELETE: "/business/offerDelete",
  GETBUSINESSJOBLIST: "/business/getBusinessJobList",
  ADDJOB: "/business/addJob",
  UPDATEJOB: "/business/updateJob",
  JOBDELETE: "/business/jobDelete",
};
