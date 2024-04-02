const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
function buildTree(array) {
  const sortedArray = [...new Set(array)].sort((a, b) => a - b);
  if (sortedArray.length === 0) return null;
  const mid = Math.floor(sortedArray.length / 2);
  const rootNode = new Node(
    sortedArray[mid],
    buildTree(sortedArray.slice(0, mid)),
    buildTree(sortedArray.slice(mid + 1))
  );
  return rootNode;
}
class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
  minValue(root) {
    let minValue = root.data;
    while (root.left != null) {
      minValue = root.left.data;
      root = root.left;
    }
    return minValue;
  }
  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }
    if (root.data < value) {
      root.right = this.insert(value, root.right);
    } else if (root.data === value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }
    return root;
  }
  deleteItem(value, root = this.root) {
    if (root === null) return root;
    if (root.data < value) {
      root.right = this.deleteItem(value, root.right);
    } else if (root.data > value) {
      root.left = this.deleteItem(value, root.left);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }
      root.data = this.minValue(root.right);
      root.right = this.deleteItem(value, root.right);
    }
    return root;
  }
  find(value, root = this.root) {
    const node = root;
    if (node === null) return null;
    if (node.data !== value) {
      return node.data < value ? this.find(value, node.right) : this.find(value, node.left);
    }
    return node;
  }
  levelOrder(callback) {
    if (!this.root) return [];
    const queue = [this.root];
    const results = [];
    while (queue.length) {
      let level = [];
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        level.push(node.data);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        if (callback) callback(node);
      }
      results.push(level);
    }
    if (!callback) return results;
  }
  preOrder(callback) {
    if (!this.root) return [];
    const stack = [this.root];
    const results = [];
    while (stack.length) {
      const node = stack.pop();
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
      if (callback) callback(node);
      results.push(node.data);
    }
    if (!callback) return results;
  }
  inOrder(node = this.root, callback, result = []) {
    if (!this.root) return [];
    if (node === null) return;
    this.inOrder(node.left, callback, result);
    callback ? callback(node) : result.push(node.data);
    this.inOrder(node.right, callback, result);
    if (result) return result;
  }
  postOrder(callback) {
    if (!this.root) return [];
    const stack = [this.root];
    const results = [];
    while (stack.length) {
      const node = stack.pop();
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
      if (callback) callback(node);
      results.push(node.data);
    }
    if (!callback) return results.reverse();
  }
  height(node = this.root) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(node, root = this.root, level = 0) {
    if (!node) return null;
    if (root === null) return 0;
    if (root.data === node.data) return level;
    let count = this.depth(node, root.left, level + 1);
    if (count !== 0) return count;
    return this.depth(node, root.right, level + 1);
  }
  isBalanced(node = this.root) {
    if (node === null) return true;
    const heightDiff = Math.abs(this.height(node.left) - this.height(node.right));
    return heightDiff <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right);
  }
  rebalance() {
    if (this.root === null) return;
    const sorted = [...new Set(this.inOrder().sort((a, b) => a - b))];
    this.root = buildTree(sorted);
  }
}

module.exports = Tree;

// TESTS
const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
tree.insert(3);
tree.deleteItem(3);
console.log(tree.find(10));
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
console.log(tree.isBalanced());
console.log(tree);
prettyPrint(tree.root);
