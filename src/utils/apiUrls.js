const url = {
  users: "User",
  login: "User/Authenticate",
  signup: "User/SingUp",
  refreshToken: "User/RefreshToken",
  categories: "Categories",
  templates: "Templates",
  campains: "Campains",
  clients: "Clients",
  sponsors: "Sponsor",
  sends: "Sends",
  sendNewCampain: "Sends/Trigger",
  clientsByCategories: (categoryId = "") => `Clients/Categories/${categoryId}`,
  clientsBySend: (sendId = "") => `Clients/Send/${sendId}`,
};

export default url;
