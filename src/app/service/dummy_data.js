let json=[{
    "id": "12345678",
    "question": "Implement a Trie (Prefix Tree)",
    "link": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "description": "Implement a Trie (Prefix Tree) data structure. You need to support the following operations:\n\n- `insert(word: string)`: Insert a word into the Trie.\n- `search(word: string)`: Returns true if the word is in the Trie.\n- `startsWith(prefix: string)`: Returns true if there is any word in the Trie that starts with the given prefix.\n\nExample:\n\n```\nTrie trie = new Trie();\ntrie.insert(\"apple\");\ntrie.search(\"apple\"); // returns true\ntrie.search(\"app\"); // returns false\ntrie.startsWith(\"app\"); // returns true\ntrie.insert(\"app\");\ntrie.search(\"app\"); // returns true\n```",
    "language": "javascript"
  },
  {
    "id": "23456789",
    "question": "Find the Duplicate Number",
    "link": "https://leetcode.com/problems/find-the-duplicate-number/",
    "description": "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number.\n\nExample:\n\n```\nInput: [1,3,4,2,2]\nOutput: 2\n```",
    "language": "python"
  },
  {
    "id": "34567890",
    "question": "Longest Substring Without Repeating Characters",
    "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "description": "Given a string s, find the length of the longest substring without repeating characters.\n\nExample:\n\n```\nInput: \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.\n```",
    "language": "java"
  },
  {
    "id": "45678901",
    "question": "Merge Intervals",
    "link": "https://leetcode.com/problems/merge-intervals/",
    "description": "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals.\n\nExample:\n\n```\nInput: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]\n```",
    "language": "javascript"
  },
  {
    "id": "56789012",
    "question": "Reverse Linked List",
    "link": "https://leetcode.com/problems/reverse-linked-list/",
    "description": "Reverse a singly linked list.\n\nExample:\n\n```\nInput: 1->2->3->4->5\nOutput: 5->4->3->2->1\n```",
    "language": "python"
  },
  {
    "id": "67890123",
    "question": "Maximum Subarray",
    "link": "https://leetcode.com/problems/maximum-subarray/",
    "description": "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\nExample:\n\n```\nInput: [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\n```",
    "language": "java"
  },
  {
    "id": "78901234",
    "question": "Valid Parentheses",
    "link": "https://leetcode.com/problems/valid-parentheses/",
    "description": "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nExample:\n\n```\nInput: \"()[]{}\"\nOutput: true\n```",
    "language": "javascript"
  },
  {
    "id": "89012345",
    "question": "Binary Tree Level Order Traversal",
    "link": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "description": "Given a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).\n\nExample:\n\n```\nInput: [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]\n```",
    "language": "python"
  },
  {
    "id": "90123456",
    "question": "Counting Bits",
    "link": "https://leetcode.com/problems/counting-bits/",
    "description": "Given a non-negative integer num, for every number i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.\n\nExample:\n\n```\nInput: 5\nOutput: [0,1,1,2,1,2]\n```",
    "language": "java"
  },
  {
    "id": "01234567",
    "question": "Subarray Sum Equals K",
    "link": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "description": "Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.\n\nExample:\n\n```\nInput: nums = [1,1,1], k = 2\nOutput: 2\n```",
    "language": "javascript"
  }
  ]
  
  let chartJson=[
      {
        "language": "java",
        "questions": [
          {
            "question": "Merge Sort",
            "type": "sorting",
            "askedPercentage": 20
          },
          {
            "question": "Reverse a String",
            "type": "string manipulation",
            "askedPercentage": 15
          },
          {
            "question": "Linked List Implementation",
            "type": "linked list",
            "askedPercentage": 25
          },
          {
            "question": "Binary Search",
            "type": "searching",
            "askedPercentage": 10
          },
          {
            "question": "Stack Implementation",
            "type": "stack",
            "askedPercentage": 35
          }
        ]
      },
      {
        "language": "python",
        "questions": [
          {
            "question": "Merge Sort",
            "type": "sorting",
            "askedPercentage": 18
          },
          {
            "question": "String Reverse",
            "type": "string manipulation",
            "askedPercentage": 20
          },
          {
            "question": "Binary Search",
            "type": "searching",
            "askedPercentage": 22
          },
          {
            "question": "Queue Implementation",
            "type": "queue",
            "askedPercentage": 12
          },
          {
            "question": "Graph Traversal",
            "type": "graph",
            "askedPercentage": 25
          }
        ]
      },
      {
        "language": "javascript",
        "questions": [
          {
            "question": "Merge Sort",
            "type": "sorting",
            "askedPercentage": 17
          },
          {
            "question": "String Reverse",
            "type": "string manipulation",
            "askedPercentage": 18
          },
          {
            "question": "Binary Search Tree Implementation",
            "type": "binary search tree",
            "askedPercentage": 30
          },
          {
            "question": "Hash Table Implementation",
            "type": "hash table",
            "askedPercentage": 15
          },
          {
            "question": "Depth-First Search (DFS)",
            "type": "search algorithm",
            "askedPercentage": 20
          }
        ]
      }
    ]
  
  let coding_sessions = [
      {
        "date": "2024-02-01",
        "total_hours": "4.5"
      },
      {
        "date": "2024-02-02",
        "total_hours": "3.0"
      },
      {
        "date": "2024-02-03",
        "total_hours": "5.5"
      },
      {
        "date": "2024-02-04",
        "total_hours": "3.5"
      },
      {
        "date": "2024-02-05",
        "total_hours": "6.0"
      },
      {
        "date": "2024-02-06",
        "total_hours": "2.5"
      },
      {
        "date": "2024-02-07",
        "total_hours": "5.0"
      },
      {
        "date": "2024-02-08",
        "total_hours": "4.0"
      },
      {
        "date": "2024-02-09",
        "total_hours": "4.5"
      },
      {
        "date": "2024-02-10",
        "total_hours": "5.5"
      },
      {
        "date": "2024-02-11",
        "total_hours": "3.0"
      },
      {
        "date": "2024-02-12",
        "total_hours": "2.5"
      },
      {
        "date": "2024-02-13",
        "total_hours": "6.0"
      },
      {
        "date": "2024-02-14",
        "total_hours": "4.5"
      },
      {
        "date": "2024-02-15",
        "total_hours": "5.0"
      },
      {
        "date": "2024-02-16",
        "total_hours": "3.5"
      },
      {
        "date": "2024-02-17",
        "total_hours": "4.0"
      },
      {
        "date": "2024-02-18",
        "total_hours": "2.5"
      },
      {
        "date": "2024-02-19",
        "total_hours": "5.5"
      },
      {
        "date": "2024-02-20",
        "total_hours": "4.0"
      },
      {
        "date": "2024-02-21",
        "total_hours": "6.0"
      },
      {
        "date": "2024-02-22",
        "total_hours": "3.5"
      },
      {
        "date": "2024-02-23",
        "total_hours": "5.5"
      },
      {
        "date": "2024-02-24",
        "total_hours": "4.0"
      },
      {
        "date": "2024-02-25",
        "total_hours": "2.5"
      },
      {
        "date": "2024-02-26",
        "total_hours": "3.0"
      },
      {
        "date": "2024-02-27",
        "total_hours": "6.0"
      },
      {
        "date": "2024-02-28",
        "total_hours": "4.5"
      },
      {
        "date": "2024-02-29",
        "total_hours": "5.0"
      }
    ]
  
export default {json, chartJson, coding_sessions}