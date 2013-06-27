define(['backbone','models/dentalMaterials/expendableInventoryItem','config'], function(Backbone,ExpendableInventoryItem,Config) {

	var ExpendableInventoryItems = Backbone.Collection.extend({
		model: ExpendableInventoryItem,
		url: Config.serverUrl+'expendableInventoryMaster'
	});

	return ExpendableInventoryItems;

});