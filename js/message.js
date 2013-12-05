Message = function message(user,message) {
    this.username = user;
    this.message = message;
    this.twitter = 0;
    this.facebook = 0;
    this.googlePlus = 0;
    this.timestamp = Date.now();
};
