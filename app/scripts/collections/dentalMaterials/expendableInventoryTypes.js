define(['backbone','models/dentalMaterials/expendableInventoryType','config'], function(Backbone,ExpendableInventoryType,config) {

	var ExpendableInventoryTypes = Backbone.Collection.extend({
		model: ExpendableInventoryType,
		url: config.serverUrl+'expendableInventoryTypes'
	});

	return ExpendableInventoryTypes;

});