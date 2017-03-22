import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: false,
	patientId:0 ,
	ajax: Ember.inject.service(),
	medicationList: [],
	router: Ember.inject.service('-routing'),
	actions:{
		newEntry: function(){
			console.log("making a new medical history entry");
		},
		toggleVisibility: function(){
			// console.log("show medication, the id is " + patientId);
			if(this.get('isVisible')){
				this.set('isVisible', false);
			} else {
				this.set('isVisible', true);
			}
		}.observes('isVisible'),
		viewEntry: function(recordID){
			//this.get('router').transitionTo('view-medical-record', [this.patientId, recordID]);
			console.log('view entry ' + recordID);
			this.get('router').transitionTo('view-medical-record', [this.patientId, recordID]);
		}
	},
	init(){
		this._super(...arguments);
		console.log("calling ajax for medcation List");
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			this.get('ajax').request('api/patients/' + this.patientId + '/medications'
				).then(function(data){
					console.log("data is" + JSON.stringify(data));
					Ember.run(function(){
						resolve({
							medications: deserialAttributes(data.medications)
						});
						// console.log(deserialAttributes(data.medical_records));
						self.set('medicationList', deserialAttributes(data.medications));
					});
				},
				function(data){
					if (data === false){
						// self.transitionTo('/unauthorized');
						// self.get('router').transitionTo('unauthorized'); //not sure if this works
						console.log("status is " + JSON.stringify(data));
					}		
				})
		);
		console.log(this.medicationList);
	}
});

function deserialAttributes(meds){
	var deserial = [];
	for(var i = 0; i < meds.length; i++) {
		var entry = meds[i];
		if(entry.med_type.toLowerCase() === "medicine"){
			entry.recordId = JSON.stringify(meds[i].id).replace(/\"/g, "");
			if(JSON.stringify(meds[i].medical_record_id) != null){
				entry.medical_record_id = JSON.stringify(meds[i].medical_record_id).replace(/\"/g, "");
			}
			// if(JSON.stringify(meds[i].med_type) === "medicine"){
			if(JSON.stringify(meds[i].name) != null){
				entry.name = JSON.stringify(meds[i].name).replace(/\"/g, "");
			}
			if(JSON.stringify(meds[i].created_at) != null){
				var partialDate = JSON.stringify(meds[i].created_at).replace(/\"/g, "").slice(0, 10);
				var partialDate2 = partialDate.split("-");
				entry.date = partialDate2[1] + "/" +partialDate2[2] + "/" + partialDate2[0]
			}
			deserial.push(entry);
		}
		
		// }else{
		// 	console.log(JSON.stringify(meds[i].med_type));
		// }
	}
	return(deserial);
}
