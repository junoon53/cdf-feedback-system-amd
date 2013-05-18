define(['backbone','jquery', 'underscore','models/people/doctor','vent','text!templates/addDoctor.html'], function(Backbone,$,_,Doctor,vent,template){

	var AddDoctor = Backbone.View.extend({
		model: new Doctor(),
		events: {
			'click #add-doctor-button' : 'addDoctor'
		},
		initialize: function(){
			this.template = _.template(template);
			this.$el.html(this.template({}));
			this.$('#firstname').val(this.model.get("firstName"));
			this.$('#lastname').val(this.model.get("lastName"));
		},
		render: function(){
			return this;
		},
		addDoctor: function(ev){
			ev.preventDefault();
			this.model.set("firstName",this.$('#firstname').val());
			this.model.set("lastName",this.$('#lastname').val());

			this.model.save({},{success:function(){
				console.log('doctor added successfully');
				vent.trigger('CDF.Views.People.AddDoctor:addDoctor:success');

		    }});
			
		}

	});

	return AddDoctor;

});