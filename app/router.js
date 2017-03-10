import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('new-patient');
  this.route('afterlogin');
  this.route('create-user');
  this.route('new-client');
  this.route('view-patient',{path: '/view-patient/:patientID'});
  this.route('search-patient');
  this.route('new-side-note');
  this.route('view-side-note');
  this.route('unauthorized');
  this.route('view-calendar');
  this.route('new-calendar');
});

export default Router;