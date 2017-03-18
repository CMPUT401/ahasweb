import Ember from 'ember';

export default Ember.Controller.extend({
    color: '#000',  // default
    height: 68,     // default
    weight: 1,      // default
    width: 250,     // default
    

    signature: Ember.computed(function () {
        return Ember.A();
    }),

    stringifiedSignature: Ember.computed('signature.[]', function() {
        return JSON.stringify(this.get('signature'));
    }),

    ajax: Ember.inject.service(), 


    actions: {

        createMedicalRecord(){

            var self = this;
            var date = Date.now(); 
            
            if( this.get('signature').length !== 0 ){

             //also patient id
             var medications = gatherMedications();


           // console.log("the info",medications, vaccines, document.getElementById('temperatureText').value,  document.getElementById('eyesText').value, document.getElementById('oralText').value, document.getElementById('earsText').value, document.getElementById('glandsText').value, document.getElementById('skinText').value, document.getElementById('respiratoryText2').value, document.getElementById('notes').value, document.getElementById('summary').value);


            //note hardcoded patients id until it is passed to me.
            //also important note: the commented out things to send are to aniticipated to be implemented on the backend later on.
             var medicalRecord = this.get('ajax').post('/api/patients/1/medical_records', {
             type: 'application/json',
             data: { 
                // medications: medications,
                //add reminder date
                //other
                 medical_record: {
   
             data: date,  
             patient_id: 1 , //for now only
             
             signature: exportSignature(this.get('stringifiedSignature')), 

             //inputs
             temperature: document.getElementById('temperatureText').value,
             eyes: document.getElementById('eyesText').value,
             oral: document.getElementById('oralText').value,
             ears: document.getElementById('earsText').value,
             glands: document.getElementById('glandsText').value,
             skin: document.getElementById('skinText').value,
             abdomen: document.getElementById('abdomenText').value,
             urogential: document.getElementById('urogentialText').value,
             nervousSystem: document.getElementById('nervousSystemText').value,
             musculoskeletal: document.getElementById('musculoskeletalText').value,
             cardiovascular: document.getElementById('cardiovascularText').value,
             heart_rate: document.getElementById('hrText').value,
             respiratory: document.getElementById('respiratoryText1').value,
             respiratory_rate: document.getElementById('respiratoryText2').value,

             //checkboxes
             attitudeBAR: document.getElementById('attitudeBAR').checked,
             attitudeQAR: document.getElementById('attitudeQAR').checked, 
             attitudeDepressed: document.getElementById('attitudeDepressed').checked,
             eyesN: document.getElementById('eyesN').checked,
             eyesA: document.getElementById('eyesA').checked,
             oralN: document.getElementById('oralN').checked,
             oralA: document.getElementById('oralA').checked,
             mmN: document.getElementById('mmN').checked, 
             mmPale: document.getElementById('mmPale').checked, 
             mmJaundiced: document.getElementById('mmJaundiced').checked, 
             mmTacky: document.getElementById('mmTacky').checked, 
             earsN: document.getElementById('earsN').checked, 
             earsA: document.getElementById('earsA').checked, 
             earsEarMites: document.getElementById('earsEarMites').checked, 
             earsAU: document.getElementById('earsAU').checked, 
             earsAD: document.getElementById('earsAD').checked, 
             earsAS: document.getElementById('earsAS').checked, 
             glandsN: document.getElementById('glandsN').checked, 
             glandsA: document.getElementById('glandsA').checked,  
             skinN: document.getElementById('skinN').checked,
             skinA: document.getElementById('skinA').checked,   
             abdomenN: document.getElementById('abdomenN').checked,
             abdomenA: document.getElementById('abdomenA').checked, 
             urogentialN: document.getElementById('urogentialN').checked,
             urogentialA: document.getElementById('urogentialA').checked,
             nervousSystemN: document.getElementById('nervousSystemN').checked,
             nervousSystemA: document.getElementById('nervousSystemA').checked,
             musculoskeletalN: document.getElementById('musculoskeletalN').checked,
             musculoskeletalA: document.getElementById('musculoskeletalA').checked,
             cardiovascularN: document.getElementById('cardiovascularN').checked,
             cardiovascularA: document.getElementById('cardiovascularA').checked,
             respiratoryN: document.getElementById('respiratoryN').checked,
             respiratoryA: document.getElementById('respiratoryA').checked,



             //textareas
             follow_up_instructions: document.getElementById('followUpNotes').value,
             exam_notes: document.getElementById('notes').value, 
             summary: document.getElementById('summary').value


        }
    }
    });

        medicalRecord.then(function(response){
            if(response.success){
                showAlert("Record created, record is editable until 12pm tonight", true);
            }
        //this is error from server condition
        }, function(response) {
            console.log("status is " + JSON.stringify(response), response);
					if (response === false){
						if (self.get('session.isAuthenticated')){
							self.get('session').invalidate();
							}
						self.transitionToRoute('/unauthorized');
					}
				});
        }
        else{
          showAlert("Record cannot be created without a signature", false);
        }
      },

      addMedication(){
          var divMedication = document.getElementById('medicationDiv');
          var textMedication = document.createElement('div');
          var buttonMedication =  document.createElement('button');
          buttonMedication.setAttribute('class', 'removeButton');
          buttonMedication.setAttribute('id', 'removeOther');
          buttonMedication.setAttribute('type', 'submit');
          buttonMedication.innerHTML = 'x';
          buttonMedication.onclick = function() { Ember.$(this).parent('div').remove();};
          textMedication.innerHTML = "<input class='medication' >";
          textMedication.appendChild(buttonMedication);
          divMedication.appendChild(textMedication);

      },

      addVaccine(){
          var divVaccine = document.getElementById('vaccineDiv');
          var textVaccine = document.createElement('div');
          var buttonVaccine =  document.createElement('button');
          buttonVaccine.setAttribute('class', 'removeButton');
          buttonVaccine.setAttribute('id', 'removeOther');
          buttonVaccine.setAttribute('type', 'submit');
          buttonVaccine.innerHTML = 'x';
          buttonVaccine.onclick = function() { Ember.$(this).parent('div').remove();};
          textVaccine.innerHTML = "<input class='vaccine' >";
          textVaccine.appendChild(buttonVaccine);
          divVaccine.appendChild(textVaccine);

      },

      addOther(){
          var divOther = document.getElementById('otherDiv');
          var textOther = document.createElement('div');
          var buttonOther =  document.createElement('button');
          buttonOther.setAttribute('class', 'removeButton');
          buttonOther.setAttribute('id', 'removeOther');
          buttonOther.setAttribute('type', 'submit');
          buttonOther.innerHTML = 'x';
          buttonOther.onclick = function() { Ember.$(this).parent('div').remove();};
          textOther.innerHTML = "<input class='other' >";
          textOther.appendChild(buttonOther);
          divOther.appendChild(textOther);

      },

      clearSignature(){
        this.set('signature', Ember.A());
      }, 

      checkAll(){
          var normals = document.getElementsByClassName("norm");
          for (var i=0; i<normals.length; i++){
              normals[i].checked = true;
          }
      }

    }
});

function showAlert(message, bool) {
        if(bool){
            Ember.$('#alert_placeholder_med').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder_med').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
 }

function exportSignature(){
            
            var canvas = document.querySelector("canvas");
            var img    = canvas.toDataURL("image/png");
            return(img);
}


function gatherMedications(){
    var medications = [];
    for (var i  = 0; i<document.getElementsByClassName('medications').length; i++){
        medications.push(document.getElementsByClassName('medications')[i].value);

          }
    console.log(medications);
    return(medications);
    
}
