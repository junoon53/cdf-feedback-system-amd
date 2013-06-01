define([
	'backbone',
	'jquery', 
	'underscore',
	'models/revenue/revenueRow',
	'views/revenue/revenueRowView',
	'vent',
	'text!templates/revenueTable.html'
	], function(Backbone,$,_,RevenueRow,RevenueRowView,vent,template){

	var RevenueTableView = Backbone.View.extend({
	    events: {
			'click .new-row' : 'handleNewRowSubmit'		
	    },
		initialize: function() {
			this.template = _.template(template);
			
			this.rowViews = [];

			this.listenTo(vent,'CDF.Views.Revenue.RevenueRowView:exitColumn:amount', this.updateTotal);
			this.listenTo(vent,'CDF.Views.Revenue.RevenueRowView:delete', this.updateTotal);
			this.listenTo(this.model,'reset' , this.removeAllRowViews);	
			this.listenTo(this.model,'add', this.addRow);
		},
		onClose: function(){

			this.removeAllRowViews();
		},
		handleNewRowSubmit: function(ev){
			ev.preventDefault();
			this.model.add(new RevenueRow());
		},
		isValid: function() {
			var result = this.model.isValid();
			if(!result){
				this.$('.alert').hide();
				this.$('.alert-error').show(); 
			} else {
				this.$('.alert').hide();
			}
			return result;
		},	
		addRow: function(rowModel){		

	    	var rowView = new RevenueRowView({model: rowModel});
	    	rowView.render();    			

	    	this.rowViews.push(rowView);
			this.$('#rows-container').append((rowView.$el));
			this.updateTotal();		
		},
		removeAllRowViews: function() {
			//this.$('#rows-container').html('');
			for(var i=0;i<this.rowViews.length;i++){
				this.rowViews[i].close();
			}
			this.$('.total').text("");
		},
		render: function() {

			var self = this;
			this.$el.html(this.template(this.model.toJSON()));	
			return this;
		},
		updateTotal: function(){

			this.$('.total').text("Total : Rs. "+this.model.total());
		}
	});

	return RevenueTableView;

});