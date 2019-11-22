const {reason} = require ('./logic.js');
const {s_reason} = require ('./logic.js');
const {search} = require ('./logic.js');
const Node = require('./tree_class.js');
var assert = require('assert');


describe('Propositional Logic | Backward Chaining', function() {
  	
  	//trivial
	it('a |- a?', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('a'));
		var query =  new Node ('a');
		assert.equal(s_reason(KB, query, reason_list), true);
	});

	  //trivial
	it('b |- a?', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('b'));
		var query =  new Node ('a');
		assert.equal(s_reason(KB, query, reason_list), false);
	});

	//negation in query
	it('a |- ~a?', function()
	{	
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('NOT');
		query.child = new Node ('a');
		assert.equal(s_reason(KB, query, reason_list), false);
	});

	//double negation in query
	it('a |- ~~a?', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('NOT');
		query.child = new Node ('NOT')
		query.child.child = new Node ('a');
		assert.equal(s_reason(KB,query, reason_list), true);
	});


	//negation in the knowledge base
	it('~a |- a?', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('a');
		var query = new Node ('a')
		assert.equal(s_reason(KB, query, reason_list), false);
	});


	// double negation in knowledge base
	it('~~a |- a?', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('NOT');
		KB[0].child.child = new Node ('a');
		var query = new Node ('a')
		assert.equal(s_reason(KB, query, reason_list), true);
	});


	//triple negation in knowledge base
	it('~~~a |- a?', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('NOT');
		KB[0].child.child = new Node ('NOT');
		KB[0].child.child.child = new Node ('a');
		var query = new Node ('a')
		assert.equal(s_reason(KB, query, reason_list), false);
	});


	//disjunction introduction
	it('a |- a OR b?', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('OR');
		query.left = new Node ('a');
		query.right = new Node ('b');
		assert.equal(s_reason(KB, query, reason_list), true);
	});


	//disjunction introduction
	it('a |- c OR b?', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('OR');
		query.left = new Node ('c');
		query.right = new Node ('b');
		assert.equal(s_reason(KB, query, reason_list), false);
	});

	//conjunction introduction
	it('a |- a AND a?', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('AND');
		query.left = new Node ('a');
		query.right = new Node ('a');
		assert.equal(s_reason(KB, query, reason_list), true);
	});

	//conjunction introduction
	it('a |- a AND b?', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('a'));
		var query = new Node ('AND');
		query.left = new Node ('a');
		query.right = new Node ('b');
		assert.equal(s_reason(KB, query, reason_list), false);
	});

	//modus ponens
	it('p, p->q |- q?', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('p'));
		KB.push (new Node ('IMP'));
		KB[1].ant = new Node ('p');
		KB[1].con = new Node ('q');
		var query = new Node ('q');
		assert.equal(s_reason(KB, query, reason_list), true);
	});

	//modus ponens
	it('a, p->q |- q?', function()
	{	
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('a'));
		KB.push (new Node ('IMP'));
		KB[1].ant = new Node ('p');
		KB[1].con = new Node ('q');
		var query = new Node ('q');
		assert.equal(s_reason(KB, query, reason_list), false);
	});

	//modus ponens + double negation
	it('~~p, p->q |- q', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('NOT');
		KB[0].child.child = new Node ('p');
		KB.push (new Node ('IMP'));
		KB[1].ant = new Node ('p');
		KB[1].con = new Node ('q');
		var query = new Node ('q');
		assert.equal(s_reason(KB, query, reason_list), true);
	});



	//disjunctive syllogism
	it('p OR q, ~q |- p', function()
	{	
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('OR'));
		KB[0].left = new Node ('p');
		KB[0].right = new Node ('q');
		KB.push(new Node ('NOT'));
		KB[1].left = new Node ('q');

		var query = new Node ('p');
		assert.equal(s_reason(KB, query, reason_list), true);
	});

	//disjunctive syllogism
	it('~q, p OR q |- p', function()
	{	
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].left = new Node ('q');
		KB.push(new Node ('OR'));
		KB[1].left = new Node ('p');
		KB[1].right = new Node ('q');
		var query = new Node ('p');
		assert.equal(s_reason(KB, query, reason_list), true);
	});


	//double negation in knowledge base
	it('~b, a |- c', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('b');
		KB.push(new Node ('a'));
		var query = new Node ('c');
		assert.equal(s_reason(KB, query, reason_list), false);
	});







	//disjunctive syllogism + double negation
	it('~~q, p OR q |- p', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('NOT');
		KB[0].child.child = new Node ('q');
		KB.push(new Node ('OR'));
		KB[1].left = new Node ('p');
		KB[1].right = new Node ('q');
		var query = new Node ('p');
		assert.equal(false, s_reason(KB, query, reason_list));

	});

	//disjunctive syllogism + 2 double negation
	it('~q, ~~p OR q |- p', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('q');
		KB.push(new Node ('OR'));
		KB[1].left = new Node ('NOT');
		KB[1].left.child = new Node ('NOT');
		KB[1].left.child.child = new Node ('p');
		KB[1].right = new Node ('q');
		var query = new Node ('p');
		assert.equal(true, s_reason(KB, query, reason_list));

	});

	//disjunctive syllogism + 2 double negation
	it('~q, ~p OR q |- p', function()
	{
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('NOT'));
		KB[0].child = new Node ('q');
		KB.push(new Node ('OR'));
		KB[1].left = new Node ('NOT');
		KB[1].left.child = new Node ('p');
		KB[1].right = new Node ('q');
		var query = new Node ('p');
		assert.equal(false, s_reason(KB, query, reason_list));

	});










});


