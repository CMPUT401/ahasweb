import DS from 'ember-data';

export default DS.Model.extend({
	firstName: DS.attr('string'),
	LastName: DS.attr('string'),
	id: DS.attr()
});
