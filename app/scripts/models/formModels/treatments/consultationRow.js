define(['backbone','underscore'], function(Backbone,_) {

	var ConsultationRow = Backbone.Model.extend({
		defaults: function() {
			return {
				patientName: '',
				patient:null,
				doctorName: '',
				doctor:null,
				treatmentName: '',
				treatment:null,
				remarks: '',
				rowId:0,
			}
		},
		validation: {
		    patient: {
		      pattern: 'digits',
		      required: true,
		      range: [1000,10000],
		      msg: "Please select a patient"
		    },
		    treatment: {
		      pattern: 'digits',
		      required: true,
		      range: [1000,10000],
		      msg: "Please select a treatment"
		    },
		    doctor: {
		      pattern: 'digits',
		      required: true,
		      range: [1000,10000],
		      msg: "Please select a doctor"
		    }
		},
		onClose: function(){
			if(this.collection)
			this.collection.remove(this);
		}
	});

	return ConsultationRow;

});