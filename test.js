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

	// //double negation in query
	// it('a |- ~~a?', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('a'));
	// 	var query = new Node ('NOT');
	// 	query.child = new Node ('NOT')
	// 	query.child.child = new Node ('a');
	// 	assert.equal(s_reason(KB,query), true);
	// });


	// //negation in the knowledge base
	// it('~a |- a?', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('NOT'));
	// 	KB[0].child = new Node ('a');
	// 	var query = new Node ('a')
	// 	assert.equal(s_reason(KB,query), false);
	// });


	// //double negation in knowledge base
	// it('~~a |- a?', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('NOT'));
	// 	KB[0].child = new Node ('NOT');
	// 	KB[0].child.child = new Node ('a');
	// 	var query = new Node ('a')
	// 	assert.equal(s_reason(KB,query), true);
	// });


	// //triple negation in knowledge base
	// it('~~~a |- a?', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('NOT'));
	// 	KB[0].child = new Node ('NOT');
	// 	KB[0].child.child = new Node ('NOT');
	// 	KB[0].child.child.child = new Node ('a');
	// 	var query = new Node ('a')
	// 	assert.equal(s_reason(KB,query), false);
	// });


	// //disjunction introduction
	// it('a |- a OR b?', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('a'));
	// 	var query = new Node ('OR');
	// 	query.left = new Node ('a');
	// 	query.right = new Node ('b');
	// 	assert.equal(s_reason(KB,query), true);
	// });


	// //disjunction introduction
	// it('a |- c OR b?', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('a'));
	// 	var query = new Node ('OR');
	// 	query.left = new Node ('c');
	// 	query.right = new Node ('b');
	// 	assert.equal(s_reason(KB,query), false);
	// });

	// //conjunction introduction
	// it('a |- a AND a?', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('a'));
	// 	var query = new Node ('AND');
	// 	query.left = new Node ('a');
	// 	query.right = new Node ('a');
	// 	assert.equal(s_reason(KB,query), true);
	// });

	// //conjunction introduction
	// it('a |- a AND b?', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('a'));
	// 	var query = new Node ('AND');
	// 	query.left = new Node ('a');
	// 	query.right = new Node ('b');
	// 	assert.equal(s_reason(KB,query), false);
	// });

	// //modus ponens
	// it('p, p->q |- q?', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('p'));
	// 	KB.push (new Node ('IMP'));
	// 	KB[1].ant = new Node ('p');
	// 	KB[1].con = new Node ('q');
	// 	var query = new Node ('q');
	// 	assert.equal(s_reason(KB,query), true);
	// });

	// //modus ponens
	// it('a, p->q |- q?', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('a'));
	// 	KB.push (new Node ('IMP'));
	// 	KB[1].ant = new Node ('p');
	// 	KB[1].con = new Node ('q');
	// 	var query = new Node ('q');
	// 	assert.equal(s_reason(KB,query), false);
	// });

	// //modus ponens + double negation
	// it('~~p, p->q |- q', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('NOT'));
	// 	KB[0].child = new Node ('NOT');
	// 	KB[0].child.child = new Node ('p');
	// 	KB.push (new Node ('IMP'));
	// 	KB[1].ant = new Node ('p');
	// 	KB[1].con = new Node ('q');
	// 	var query = new Node ('q');
	// 	assert.equal(s_reason(KB,query), true);
	// });



	//disjunctive syllogism
	it('p OR q |- p', function()
	{	
		var reason_list = [];
		var KB = [];
		KB.push(new Node ('OR'));
		KB[0].left = new Node ('p');
		KB[0].right = new Node ('q');
		var query = new Node ('p');
		assert.equal(s_reason(KB, query, reason_list), true);
	});


	// //double negation in knowledge base
	// it('~b, a |- c', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('NOT'));
	// 	KB[0].child = new Node ('b');
	// 	KB.push(new Node ('a'));
	// 	var query = new Node ('c');
	// 	assert.equal(s_reason(KB,query), false);
	// });


	// // a == b?
	// it('a == b?', function()
	// {
	// 	var a = [];
	// 	a.push(new Node ('NOT'));
	// 	a[0].child = new Node ('b');

	// 	var b = [];
	// 	b.push(new Node ('NOT'));
	// 	b[0].child = new Node ('b');

	// 	assert.equal(comp(a,b), true);
	// });








	// //disjunctive syllogism + double negation
	// it('~~q, p OR q |- p', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('NOT'));
	// 	KB[0].child = new Node ('NOT');
	// 	KB[0].child.child = new Node ('q');
	// 	KB.push(new Node ('OR'));
	// 	KB[1].left = new Node ('p');
	// 	KB[1].right = new Node ('q');
	// 	var query = new Node ('p');
	// 	assert.equal(false, s_reason(KB,query));

	// });

	// //disjunctive syllogism + 2 double negation
	// it('~q, ~~p OR q |- p', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('NOT'));
	// 	KB[0].child = new Node ('q');
	// 	KB.push(new Node ('OR'));
	// 	KB[1].left = new Node ('NOT');
	// 	KB[1].left.child = new Node ('NOT');
	// 	KB[1].left.child.child = new Node ('p');
	// 	KB[1].right = new Node ('q');
	// 	var query = new Node ('p');
	// 	assert.equal(true, s_reason(KB,query));

	// });

	// //disjunctive syllogism + 2 double negation
	// it('~q, ~p OR q |- p', function()
	// {
	// 	var KB = [];
	// 	KB.push(new Node ('NOT'));
	// 	KB[0].child = new Node ('q');
	// 	KB.push(new Node ('OR'));
	// 	KB[1].left = new Node ('NOT');
	// 	KB[1].left.child = new Node ('p');
	// 	KB[1].right = new Node ('q');
	// 	var query = new Node ('p');
	// 	assert.equal(false, s_reason(KB,query));

	// });










});


