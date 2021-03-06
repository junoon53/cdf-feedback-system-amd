define(['backbone','jquery','underscore','utility','models/app','views/app','views/auth','models/auth','vent','image!../resources/images/cdf_blur_Bg.png'],
 function(Backbone,$,_,utility,App,AppView,AuthView,Auth,vent,loginBg){
    var _instance = null;

    var MainView = Backbone.View.extend({
        el:  $('#main'),
        initialize: function(){
            this.listenTo(vent,'CDF.Router:index:appInitSucceeded',this.addAuthView);
            this.listenTo(vent,'CDF.Router:index:onLogout',this.addAuthView);
            this.listenTo(vent,'CDF.Router:index:appInitFailed',this.showAppInitFailedMessage);
            this.listenTo(vent,'CDF.Models.Auth:login:success',this.createAndAddAppView);
        },
        /*Private methods*/
        _animateCurrentView: function(callback, background){
            var self = this;
            this.$el.html(this.currentView.el);
            this.currentView.$el.show();

            if(background)
                $('#main').append(background);
            this.currentBackground = background;

            $('html').fadeIn(1000, function(){
                self.currentView.$el.show();
                if(callback) callback();
            });
        },
        _removeCurrentView: function(callback, background) {
            var self = this;
             $('html').fadeOut(1000, function () { 
                    if(self.currentView) self.currentView.close();
                    if(callback) callback();
              });
        },
        /*Public methods*/
        addView: function(view,background){
            
            var self = this;
            this._removeCurrentView(function(){
                self.currentView = view;
                self._animateCurrentView(null,background);
            },background);
        },
        showAppInitFailedMessage: function(){
            utility.appendTextToMain('Application Launch Failed! Please try again by refreshing the page. If the problem persists, please contact an administrator');
        },
        addAuthView: function(){
            var bg = loginBg;
            var authView = new AuthView();
            authView.render();
            this.addView(authView,bg);
        },
        createAndAddAppView: function(){
                var person = this.currentView.model.get('person');
                var appView = new AppView();
                appView.model.set({

                    "clinicName":person.clinics[0].name,
                    "clinic":person.clinics[0]._id,
                    "clinics":person.clinics,
                    "userFullname":utility.toTitleCase(person.firstName+" "+person.lastName),
                    "user":person._id,
                    "date": new Date(),
                    "role":person.roles[person.roles.length - 1]._id,
                    "roleName":person.roles[person.roles.length - 1].name
               });
               appView.render();
               this.addView(appView,'');
               appView.addView('feedbackForm');
        }


    });

    function getInstance() {
        if(_instance === null) _instance = new MainView();
        return _instance;
    }

    return getInstance();

});