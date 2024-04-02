const Tree = require("./BST.js");

const randomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const tree = new Tree(randomArray(50));

console.log("Balanced:", tree.isBalanced());
console.log("Level Order =>", tree.levelOrder());
console.log("Pre-Order:", tree.preOrder());
console.log("Post-Order:", tree.postOrder());
console.log("In-Order:", tree.inOrder());

for (let i = 0; i < 5; i++) {
  tree.insert(Math.floor(Math.random() * 20));
}
console.log("Balanced:", tree.isBalanced());
tree.rebalance();

console.log("Balanced:", tree.isBalanced());
console.log("Level Order =>", tree.levelOrder());
console.log("Pre-Order:", tree.preOrder());
console.log("Post-Order:", tree.postOrder());
console.log("In-Order:", tree.inOrder());
