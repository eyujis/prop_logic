module.exports = class Node {
  constructor(content) {

    this.content = content;
    this.operand = false;

    if (content == 'OR' || content == 'AND') {
      this.operand = true;
      
      this.left = new Node(null);
      this.left.content = null;
      this.left.operand = null;
      
      this.right = new Node(null);
      this.right.content = null;
      this.right.operand = null;

    } else if (content == 'NOT') {
      this.operand = true;
      
      this.child = new Node(null);
      this.child.content = null;
      this.child.operand = null;

    } else if (content == 'IMP')  {
      this.operand = true;
      
      this.ant = new Node(null);
      this.ant.content = null;
      this.ant.operand = null;
      this.con = new Node(null);
      this.con.content = null;
      this.con.operand = null;

    }
  }
}

// module.exports = class Tree {
//
//   constructor() {
//     this.root = null;
//   }
//
//   insert(data,type) {
//
//     var newNode = new Node(data,type);
//
//     if (this.root==null) {
//       this.root = newNode
//     } else {
//       this.insertNode(this.root, newNode);
//     }
//
//
//   }
// }
