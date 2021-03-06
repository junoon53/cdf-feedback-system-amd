define([
	 'backbone',
	 'jquery',
	 'underscore',
	 'utility',
	 'models/formModels/clinicIssues/clinicIssuesRow',
	 'vent'], function(Backbone,$,_,utility,ClinicIssuesRow,vent) {


	var ClinicIssuesRowList = Backbone.Collection.extend({
		model: ClinicIssuesRow,
		initialize: function(){
			var self = this;

			this.listenTo(vent,'CDF.Views.AppView:handleLogoutClick', this.reset);
		},	
		onClose: function() {

		},
		addDataFromReport: function(dataArray){
			var self = this;
            _.each(dataArray,function(element,index,array){
                self.add((new ClinicIssuesRow({
                    doctorName: utility.toTitleCase(element.doctor.firstName + " " + element.doctor.lastName),
                    doctor: element.doctor._id,
                    issue: element.issue,
                    status: element.status,
                    priority: element.priority,
                    dueDate: element.dueDate
                })));
            });
		},
		getDataForReport: function(){
			var result = [];
			_.each(this.models,function(element,index,array){
                    var dataMember = {
                        doctor: element.get('doctor'),
                        issue: element.get('issue'),
                        status: element.get('status'),
                        priority: element.get('priority'),
                        dueDate: element.get('dueDate')
                    };
                    result.push(dataMember);
                });
			return result;
		},
		total: function() {
			this._total = 0;
			var self = this;
			_.each(this.filterInvalidRows(),function(row, i,data) {
				 self._total+= parseInt(row.get("issue"),10);
			});
			return this._total;
		},
		filterInvalidRows: function(){
			return _.reject(this.models,function(element){return !element.isValid()});
		},
		isValid: function() {
			var result = true;
			_.each(this.models,function(element){

				if(!element.isValid(true)){
				    result = false;
				}
			});
			return result;
		},
		
	});

	return ClinicIssuesRowList

});
