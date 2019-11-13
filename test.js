const {reason} = require ('./logic.js');
const {s_reason} = require ('./logic.js');
const Node = require('./tree_class.js');
var assert = require('assert');


describe('Propositional Logic | Backward Chaining', function() {
  	
  	//trivial
	it('a |- a?', function()
	{
		var KB = [];
		KB.push(new Node ('a'));
		var query =  new Node ('a');
		assert.equal(true, s_reason(KB,query));
	});

	//negation in query
	it('a |- ~a?', function()
	{
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('NOT');
		query.child = new Node ('a');
		assert.equal(false, s_reason(KB,query));

	});

	//double negation in query
	it('a |- ~~a?', function()
	{
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('NOT');
		query.child = new Node ('NOT')
		query.child.child = new Node ('a');
		assert.equal(true, s_reason(KB,query));

	});


	//negation in the knowledge base
	it('~a |- a?', function()
	{
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('a');
		var query = new Node ('a')
		assert.equal(false, s_reason(KB,query));

	});


	//double negation in knowledge base
	it('~~a |- a?', function()
	{
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('NOT');
		KB[0].child.child = new Node ('a');
		var query = new Node ('a')
		assert.equal(true, s_reason(KB,query));

	});


	//triple negation in knowledge base
	it('~~~a |- a?', function()
	{
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('NOT');
		KB[0].child.child = new Node ('NOT');
		KB[0].child.child.child = new Node ('a');
		var query = new Node ('a')
		assert.equal(false, s_reason(KB,query));

	});


	//disjunction introduction
	it('a |- a OR b?', function()
	{
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('OR');
		query.left = new Node ('a');
		query.right = new Node ('b');
		assert.equal(true, s_reason(KB,query));

	});


	//disjunction introduction
	it('a |- c OR b?', function()
	{
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('OR');
		query.left = new Node ('c');
		query.right = new Node ('b');
		assert.equal(false, s_reason(KB,query));

	});

	//conjunction introduction
	it('a |- a AND a?', function()
	{
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('AND');
		query.left = new Node ('a');
		query.right = new Node ('a');
		assert.equal(true, s_reason(KB,query));

	});

	//conjunction introduction
	it('a |- a AND b?', function()
	{
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('AND');
		query.left = new Node ('a');
		query.right = new Node ('b');
		assert.equal(false, s_reason(KB,query));

	});

	//modus ponens
	it('p, p->q |- q?', function()
	{
		var KB = [];
		KB.push(new Node ('p'));
		KB.push (new Node ('IMP'));
		KB[1].ant = new Node ('p');
		KB[1].con = new Node ('q');
		var query = new Node ('q');
		assert.equal(true, s_reason(KB,query));

	});

	//modus ponens
	it('a, p->q |- q?', function()
	{
		var KB = [];
		KB.push(new Node ('a'));
		KB.push (new Node ('IMP'));
		KB[1].ant = new Node ('p');
		KB[1].con = new Node ('q');
		var query = new Node ('q');
		assert.equal(false, s_reason(KB,query));

	});

	//modus ponens + double negation
	it('~~p, p->q |- q', function()
	{
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('NOT');
		KB[0].child.child = new Node ('p');
		KB.push (new Node ('IMP'));
		KB[1].ant = new Node ('p');
		KB[1].con = new Node ('q');
		var query = new Node ('q');
		assert.equal(true, s_reason(KB,query));

	});

	//disjunctive syllogism
	it('p OR q |- p', function()
	{
		var KB = [];
		KB.push(new Node ('OR'));
		KB[0].left = new Node ('p');
		KB[0].right = new Node ('q');
		var query = new Node ('p');
		assert.equal(true, s_reason(KB,query));

	});



});


