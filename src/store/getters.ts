/*
 * @file: vuex getters
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-07-09 14:30:43
 */
const getters = {
  token: state => state.user.token,
  realname: state => state.user.realname,
  name: state => state.user.username,
  deptname: state => state.user.deptname,
  rolename: state => state.user.rolename,
  candidateUser: state => state.user.candidateUser,
  deptid: state => state.user.deptid,
  tel: state => state.user.tel,
  userid: state => state.user.userid,
  photo: state => state.user.photo,
  signature: state => state.user.signature,
  companyid: state => state.user.companyid,
  isAdmin: state => state.user.isAdmin,
  companyname: state => state.user.companyname,
};
export default getters;
