define(['backbone'], function(Backbone) {

	var PaymentOption = Backbone.Model.extend({
		url: 'http://192.168.211.132:8080/paymentOptions' 
	});

	return PaymentOption;
});