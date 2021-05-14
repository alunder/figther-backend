const HealthCheckController = require('./controllers/health-check');
const UserController = require('./controllers/user');
const AdminUserController = require('./controllers/admin-user');
const EventController = require('./controllers/event');
const FighterController = require('./controllers/fighter');
const ClubController = require('./controllers/club');
const ReadImageController = require('./controllers/read-image');
const SaveImageController = require('./controllers/save-image');
const SetDummyController = require('./controllers/set-dummy');
const AdminUserManageController = require('./controllers/admin-user-manage');
const AdminFighterManageController = require('./controllers/admin-fighter-manage');
const AdminClubManageController = require('./controllers/admin-club-manage');
const AdminEventManageController = require('./controllers/admin-event-manage');




exports.routes = [
  /**
   * Healthcheck
   */
  {
    method: 'GET',
    path: '/api/v1/healthcheck',
    config: HealthCheckController
  },
  /**
   * User SignUP
   */
  {
    method: 'POST',
    path: '/api/v1/user/signup',
    config: UserController.sign_up,    
  },
  /**
   * User Login
   */
  {
    method: 'POST',
    path: '/api/v1/user/login',
    config: UserController.login
  },
  {
    method: 'POST',
    path: '/api/v1/user/profile/save',
    config: UserController.profileSave,
  },
  {
    method: 'GET',
    path: '/api/v1/user/profile/main',
    config: UserController.profileMainGet,
  },
  {
    method: 'POST',
    path: '/api/v1/user/forgetpassword',
    config: UserController.forgetPassword,
  },
  {
    method: 'POST',
    path: '/api/v1/user/passwordreset',
    config: UserController.passwordReset,
  },
  {
    method: 'GET',
    path: '/api/v1/image/{name}',
    config: ReadImageController.readImage,
  },
  {
    method: 'GET',
    path: '/api/v1/dummy/set',
    config: SetDummyController.setDummy,
  },
  {
    method: 'POST',
    path: '/api/v1/dummy/location/set',
    config: SetDummyController.setLocation,
  },
  {
    method: 'POST',
    path: '/api/v1/dummy/fighter/set',
    config: SetDummyController.setFighter,
  },
  {
    method: 'POST',
    path: '/api/v1/image/save',
    config: SaveImageController.imageUpload
  },
  {
    method: 'POST',
    path: '/api/v1/admin/image/save',
    config: SaveImageController.imageUploadAdmin
  },
  {
    method: 'GET',
    path: '/api/v1/event/all',
    config: EventController.getAllEvent,
  },
  {
    method: 'GET',
    path: '/api/v1/fighter/all',
    config: FighterController.getAllFighter,
  },
  {
    method: 'POST',
    path: '/api/v1/user/follow/fighter',
    config: UserController.followFighter,
  },
  {
    method: 'POST',
    path: '/api/v1/user/unfollow/fighter',
    config: UserController.unfollowFighter,
  },
  {
    method: 'POST',
    path: '/api/v1/user/follow/event',
    config: UserController.followEvent,
  },
  {
    method: 'POST',
    path: '/api/v1/user/unfollow/event',
    config: UserController.unfollowEvent,
  },
  {
    method: 'GET',
    path: '/api/v1/chat/delete',
    config: SetDummyController.deleteChat,
  },
  {
    method: 'GET',
    path: '/api/v1/all/delete',
    config: SetDummyController.deleteAllData,
  },
  {
    method: 'POST',
    path: '/api/v1/user/profile/fighter',
    config: UserController.saveFighter,
  },
  {
    method: 'POST',
    path: '/api/v1/user/save/device/token',
    config: UserController.saveDeviceToken,
  },
  {
    method: 'POST',
    path: '/api/v1/admin/user/login',
    config: AdminUserController.login,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/user',
    config: AdminUserManageController.getAll,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/user/delete/{id}',
    config: AdminUserManageController.deleteUser,
  },
  {
    method: 'POST',
    path: '/api/v1/admin/manage/fighter/add',
    config: AdminFighterManageController.add,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/fighter',
    config: AdminFighterManageController.getAll,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/fighter/approve',
    config: AdminFighterManageController.getAllForApprove,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/fighter/approve/{id}',
    config: AdminFighterManageController.approveFighter,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/fighter/reject/{id}',
    config: AdminFighterManageController.rejectFighter,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/fighter/delete/{id}',
    config: AdminFighterManageController.deleteFighter,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/fighter/{id}',
    config: AdminFighterManageController.getOne,
  },
  {
    method: 'POST',
    path: '/api/v1/admin/manage/fighter/update/{id}',
    config: AdminFighterManageController.updateOne,
  },
  {
    method: 'POST',
    path: '/api/v1/admin/manage/club/add',
    config: AdminClubManageController.add,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/club',
    config: AdminClubManageController.getAll,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/club/delete/{id}',
    config: AdminClubManageController.deleteClub,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/club/{id}',
    config: AdminClubManageController.getOne,
  },
  {
    method: 'POST',
    path: '/api/v1/admin/manage/club/update/{id}',
    config: AdminClubManageController.updateOne,
  },
  {
    method: 'POST',
    path: '/api/v1/admin/manage/event/add',
    config: AdminEventManageController.add,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/event',
    config: AdminEventManageController.getAll,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/event/delete/{id}',
    config: AdminEventManageController.deleteEvent,
  },
  {
    method: 'GET',
    path: '/api/v1/admin/manage/event/{id}',
    config: AdminEventManageController.getOne,
  },
  {
    method: 'POST',
    path: '/api/v1/admin/manage/event/update/{id}',
    config: AdminEventManageController.updateOne,
  },
  {
    method: 'POST',
    path: '/api/v1/fighter/add',
    config: FighterController.add,
  },
  {
    method: 'GET',
    path: '/api/v1/club/all',
    config: ClubController.getAll,
  },
  {
    method: 'GET',
    path: '/api/v1/club/{id}',
    config: ClubController.getClubById,
  },
  {
    method: 'GET',
    path: '/api/v1/club/approve/{idc}/{idf}',
    config: ClubController.approveFighter,
  },
  {
    method: 'GET',
    path: '/api/v1/club/reject/{idc}/{idf}',
    config: ClubController.rejectFighter,
  },
  {
    method: 'GET',
    path: '/api/v1/club/request/reject/{idc}/{idf}',
    config: ClubController.rejectFighterFromRequest,
  }

];
