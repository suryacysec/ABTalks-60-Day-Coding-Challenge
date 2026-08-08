import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// ─── LocalStorage Helpers ───────────────────────────────────────────────────

const STORAGE_KEYS = {
  PROFILE: 'abtalks_profile',
  TASKS: 'abtalks_tasks',
  SUBMISSIONS: 'abtalks_submissions',
};

function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

// ─── Default Seed Data (per track) ──────────────────────────────────────────

const TRACK_TASKS = {
  'Cybersecurity': [
    { title: 'Caesar Cipher', description: 'Implement a Caesar cipher encoder/decoder. Understand basic substitution ciphers and how they form the foundation of modern encryption.', difficulty: 'Easy', whatYouLearn: ['Substitution ciphers', 'String manipulation', 'Encryption basics'], resources: [{ label: 'Cipher History', url: 'https://en.wikipedia.org/wiki/Caesar_cipher' }] },
    { title: 'Password Strength Checker', description: 'Build a tool that evaluates password strength based on length, character diversity, and common patterns.', difficulty: 'Easy', whatYouLearn: ['Regex patterns', 'Security best practices', 'Input validation'], resources: [{ label: 'OWASP Password Guidelines', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' }] },
    { title: 'Hash Generator', description: 'Create a tool that generates MD5, SHA-1, and SHA-256 hashes for any input string. Compare hash outputs to understand collision resistance.', difficulty: 'Easy', whatYouLearn: ['Hashing algorithms', 'Data integrity', 'Cryptographic functions'], resources: [{ label: 'Python hashlib docs', url: 'https://docs.python.org/3/library/hashlib.html' }] },
    { title: 'Network Packet Analyzer', description: 'Use Wireshark or Scapy to capture and analyze network packets. Identify HTTP, DNS, and TCP traffic patterns.', difficulty: 'Easy', whatYouLearn: ['Packet structure', 'Protocol analysis', 'Network forensics'], resources: [{ label: 'Wireshark User Guide', url: 'https://www.wireshark.org/docs/wsug_html/' }] },
    { title: 'Base64 Encoder/Decoder', description: 'Build a Base64 encoding and decoding tool. Understand why Base64 is used in data transmission and email attachments.', difficulty: 'Easy', whatYouLearn: ['Encoding vs Encryption', 'Binary-to-text encoding', 'Data transmission'], resources: [{ label: 'Base64 RFC', url: 'https://datatracker.ietf.org/doc/html/rfc4648' }] },
    { title: 'Keylogger Detector', description: 'Build a tool that monitors system processes and detects potential keylogger activity by checking for suspicious keyboard hooks.', difficulty: 'Medium', whatYouLearn: ['System monitoring', 'Process analysis', 'Defensive security'], resources: [{ label: 'OS Process Management', url: 'https://docs.python.org/3/library/subprocess.html' }] },
    { title: 'SQL Injection Lab', description: 'Set up a vulnerable web app and practice SQL injection attacks. Then implement parameterized queries to prevent them.', difficulty: 'Medium', whatYouLearn: ['SQL injection techniques', 'Input sanitization', 'Parameterized queries'], resources: [{ label: 'OWASP SQL Injection', url: 'https://owasp.org/www-community/attacks/SQL_Injection' }] },
    { title: 'Firewall Rule Builder', description: 'Create a script that generates iptables/firewall rules based on user-defined policies for inbound and outbound traffic.', difficulty: 'Medium', whatYouLearn: ['Firewall concepts', 'Network policies', 'Traffic filtering'], resources: [{ label: 'iptables tutorial', url: 'https://www.netfilter.org/documentation/' }] },
    { title: 'XSS Payload Detector', description: 'Build a scanner that detects Cross-Site Scripting vulnerabilities in web forms by testing common XSS payloads.', difficulty: 'Medium', whatYouLearn: ['XSS attack vectors', 'Content Security Policy', 'Input validation'], resources: [{ label: 'OWASP XSS Guide', url: 'https://owasp.org/www-community/attacks/xss/' }] },
    { title: 'Brute Force Simulator', description: 'Create a password brute-force simulator that demonstrates dictionary and brute-force attacks against hashed passwords.', difficulty: 'Medium', whatYouLearn: ['Password cracking methods', 'Hash comparison', 'Rate limiting'], resources: [{ label: 'Hashcat docs', url: 'https://hashcat.net/wiki/' }] },
    { title: 'Network Sniffer', description: 'Build a raw socket-based network sniffer that captures packets and displays source/destination IPs, protocols, and payload data.', difficulty: 'Medium', whatYouLearn: ['Raw sockets', 'Network sniffing', 'Protocol headers'], resources: [{ label: 'Python socket docs', url: 'https://docs.python.org/3/library/socket.html' }] },
    { title: 'Port Scanner', description: "Build a port scanner using Python's socket library that scans ports 1–1024 on localhost and logs open ports to a file.", difficulty: 'Medium', whatYouLearn: ['TCP/UDP ports', 'Socket programming', 'Network enumeration'], resources: [{ label: 'Python socket docs', url: 'https://docs.python.org/3/library/socket.html' }, { label: 'Port scanning basics', url: 'https://nmap.org/book/man-port-scanning-basics.html' }] },
    { title: 'Steganography Tool', description: 'Hide secret messages inside images using LSB (Least Significant Bit) steganography. Build both encoder and decoder.', difficulty: 'Medium', whatYouLearn: ['Image manipulation', 'Bit operations', 'Data hiding techniques'], resources: [{ label: 'Steganography wiki', url: 'https://en.wikipedia.org/wiki/Steganography' }] },
    { title: 'ARP Spoofing Detector', description: 'Build a tool that monitors ARP tables and detects potential ARP spoofing attacks on your local network.', difficulty: 'Medium', whatYouLearn: ['ARP protocol', 'Man-in-the-middle attacks', 'Network monitoring'], resources: [{ label: 'ARP protocol', url: 'https://en.wikipedia.org/wiki/Address_Resolution_Protocol' }] },
    { title: 'Vulnerability Scanner', description: 'Create a basic web vulnerability scanner that checks for common issues like open directories, default credentials, and missing headers.', difficulty: 'Hard', whatYouLearn: ['Web security headers', 'Automated scanning', 'Vulnerability assessment'], resources: [{ label: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' }] },
    { title: 'Reverse Shell Lab', description: 'Set up a controlled lab environment to understand how reverse shells work. Build a basic reverse shell and learn how to defend against them.', difficulty: 'Hard', whatYouLearn: ['Shell connections', 'Remote access', 'Network defense'], resources: [{ label: 'Reverse shell cheatsheet', url: 'https://www.revshells.com/' }] },
    { title: 'Malware Sandbox', description: 'Create a basic sandbox environment that can safely analyze suspicious executables and log their behavior (file access, network calls, registry changes).', difficulty: 'Hard', whatYouLearn: ['Malware analysis', 'Sandboxing', 'Behavioral analysis'], resources: [{ label: 'Cuckoo Sandbox', url: 'https://cuckoosandbox.org/' }] },
    { title: 'DNS Tunneling Detection', description: 'Build a tool that analyzes DNS traffic to detect potential DNS tunneling attempts by checking for unusually long domain queries.', difficulty: 'Hard', whatYouLearn: ['DNS protocol', 'Data exfiltration', 'Traffic analysis'], resources: [{ label: 'DNS Tunneling', url: 'https://en.wikipedia.org/wiki/DNS_tunnel' }] },
    { title: 'Buffer Overflow Lab', description: 'Practice buffer overflow exploitation in a controlled environment. Understand stack smashing, NOP sleds, and shellcode injection.', difficulty: 'Hard', whatYouLearn: ['Memory management', 'Stack overflow', 'Exploit development'], resources: [{ label: 'Buffer overflow tutorial', url: 'https://owasp.org/www-community/vulnerabilities/Buffer_Overflow' }] },
    { title: 'CTF Challenge Builder', description: 'Design and build your own Capture The Flag challenge with multiple categories: crypto, web, forensics, and binary exploitation.', difficulty: 'Hard', whatYouLearn: ['CTF design', 'Multi-domain security', 'Challenge creation'], resources: [{ label: 'CTF Guide', url: 'https://ctftime.org/' }] },
  ],
  'Web Development': [
    { title: 'Personal Portfolio', description: 'Build a responsive personal portfolio website with a hero section, projects grid, skills section, and contact form using HTML, CSS, and JavaScript.', difficulty: 'Easy', whatYouLearn: ['HTML5 semantics', 'CSS Grid/Flexbox', 'Responsive design'], resources: [{ label: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web' }] },
    { title: 'Landing Page Clone', description: 'Clone a modern landing page (e.g., Stripe, Linear) with pixel-perfect precision. Focus on gradients, animations, and responsive layout.', difficulty: 'Easy', whatYouLearn: ['CSS gradients', 'Layout techniques', 'Design systems'], resources: [{ label: 'CSS Tricks', url: 'https://css-tricks.com/' }] },
    { title: 'Todo App with Filters', description: 'Build a fully functional todo app with categories, priority levels, filters, and localStorage persistence.', difficulty: 'Easy', whatYouLearn: ['DOM manipulation', 'State management', 'localStorage API'], resources: [{ label: 'JavaScript.info', url: 'https://javascript.info/' }] },
    { title: 'CSS Animation Gallery', description: 'Create a gallery of 10 unique CSS animations including loaders, hover effects, and scroll-triggered animations.', difficulty: 'Easy', whatYouLearn: ['CSS animations', 'Keyframes', 'Transitions'], resources: [{ label: 'Animista', url: 'https://animista.net/' }] },
    { title: 'Responsive Nav & Footer', description: 'Build a mobile-first responsive navigation with hamburger menu, dropdowns, and a multi-column footer component.', difficulty: 'Easy', whatYouLearn: ['Mobile-first design', 'Navigation patterns', 'Accessibility'], resources: [{ label: 'A11y patterns', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/' }] },
    { title: 'Weather Dashboard', description: 'Build a weather dashboard using a public API. Display current conditions, 5-day forecast, and location search with autocomplete.', difficulty: 'Medium', whatYouLearn: ['Fetch API', 'API integration', 'Data visualization'], resources: [{ label: 'OpenWeather API', url: 'https://openweathermap.org/api' }] },
    { title: 'React Blog with Routing', description: 'Create a blog application with React Router, dynamic post pages, categories, and a search feature.', difficulty: 'Medium', whatYouLearn: ['React Router', 'Component composition', 'State management'], resources: [{ label: 'React docs', url: 'https://react.dev' }] },
    { title: 'E-commerce Product Page', description: 'Build a product page with image carousel, size selector, add-to-cart functionality, and a dynamic pricing display.', difficulty: 'Medium', whatYouLearn: ['Component state', 'UI interactions', 'Cart logic'], resources: [{ label: 'React patterns', url: 'https://reactpatterns.com/' }] },
    { title: 'REST API with Express', description: 'Create a RESTful API with Express.js that supports CRUD operations, request validation, and error handling.', difficulty: 'Medium', whatYouLearn: ['REST principles', 'Express.js routing', 'Middleware'], resources: [{ label: 'Express docs', url: 'https://expressjs.com/' }] },
    { title: 'Dashboard with Charts', description: 'Build an analytics dashboard with Recharts/Chart.js showing line charts, bar charts, pie charts, and KPI cards.', difficulty: 'Medium', whatYouLearn: ['Data visualization', 'Chart libraries', 'Dashboard design'], resources: [{ label: 'Recharts docs', url: 'https://recharts.org/' }] },
    { title: 'Authentication System', description: 'Implement a complete auth system with JWT tokens, login/register forms, protected routes, and token refresh logic.', difficulty: 'Medium', whatYouLearn: ['JWT authentication', 'Protected routes', 'Security best practices'], resources: [{ label: 'JWT.io', url: 'https://jwt.io/' }] },
    { title: 'Real-time Chat App', description: 'Build a real-time chat application using WebSocket or Socket.io with message history, typing indicators, and user presence.', difficulty: 'Medium', whatYouLearn: ['WebSockets', 'Real-time communication', 'Event-driven architecture'], resources: [{ label: 'Socket.io docs', url: 'https://socket.io/docs/' }] },
    { title: 'Drag & Drop Kanban', description: 'Create a Kanban board with drag-and-drop functionality for task management. Support multiple columns and task editing.', difficulty: 'Hard', whatYouLearn: ['Drag and drop API', 'State management', 'Complex UI interactions'], resources: [{ label: 'DnD Kit', url: 'https://dndkit.com/' }] },
    { title: 'Markdown Editor', description: 'Build a split-pane Markdown editor with live preview, syntax highlighting, file save/load, and export to HTML/PDF.', difficulty: 'Hard', whatYouLearn: ['Markdown parsing', 'Split-pane UIs', 'File handling'], resources: [{ label: 'Marked.js', url: 'https://marked.js.org/' }] },
    { title: 'Full-Stack Social App', description: 'Build a social media app with posts, likes, comments, user profiles, and a feed algorithm using React + Node.js.', difficulty: 'Hard', whatYouLearn: ['Full-stack development', 'Database design', 'Feed algorithms'], resources: [{ label: 'Prisma docs', url: 'https://www.prisma.io/docs' }] },
    { title: 'GraphQL API', description: 'Convert a REST API to GraphQL. Implement queries, mutations, subscriptions, and schema-first design with Apollo Server.', difficulty: 'Hard', whatYouLearn: ['GraphQL schema', 'Resolvers', 'Apollo Server'], resources: [{ label: 'GraphQL docs', url: 'https://graphql.org/learn/' }] },
    { title: 'PWA Offline App', description: 'Convert a web app into a Progressive Web App with service workers, offline caching, push notifications, and installability.', difficulty: 'Hard', whatYouLearn: ['Service workers', 'Cache API', 'PWA manifest'], resources: [{ label: 'web.dev PWA', url: 'https://web.dev/progressive-web-apps/' }] },
    { title: 'CI/CD Pipeline', description: 'Set up a complete CI/CD pipeline with GitHub Actions: linting, testing, building, and automatic deployment.', difficulty: 'Hard', whatYouLearn: ['GitHub Actions', 'CI/CD concepts', 'Automated testing'], resources: [{ label: 'GitHub Actions docs', url: 'https://docs.github.com/en/actions' }] },
    { title: 'Micro-Frontend Architecture', description: 'Build a micro-frontend application using Module Federation with independent deployable frontend modules.', difficulty: 'Hard', whatYouLearn: ['Micro-frontends', 'Module Federation', 'Architecture patterns'], resources: [{ label: 'Module Federation', url: 'https://webpack.js.org/concepts/module-federation/' }] },
    { title: 'Performance Optimization', description: 'Audit and optimize a React app for performance: code splitting, lazy loading, memoization, virtual scrolling, and Lighthouse score improvement.', difficulty: 'Hard', whatYouLearn: ['Performance profiling', 'Code splitting', 'Optimization techniques'], resources: [{ label: 'web.dev Performance', url: 'https://web.dev/performance/' }] },
  ],
  'DSA & CP': [
    { title: 'Array Basics', description: 'Solve 5 array problems: Two Sum, Maximum Subarray, Rotate Array, Contains Duplicate, and Merge Sorted Arrays.', difficulty: 'Easy', whatYouLearn: ['Array traversal', 'Two-pointer technique', 'Time complexity'], resources: [{ label: 'LeetCode Arrays', url: 'https://leetcode.com/tag/array/' }] },
    { title: 'String Manipulation', description: 'Practice string problems: Valid Palindrome, Reverse String, First Unique Character, Valid Anagram, and Longest Common Prefix.', difficulty: 'Easy', whatYouLearn: ['String methods', 'Character counting', 'Two pointers on strings'], resources: [{ label: 'LeetCode Strings', url: 'https://leetcode.com/tag/string/' }] },
    { title: 'Linked List Basics', description: 'Implement a singly linked list from scratch with insert, delete, search, and reverse operations.', difficulty: 'Easy', whatYouLearn: ['Node-based data structures', 'Pointer manipulation', 'Linked list operations'], resources: [{ label: 'Visualgo', url: 'https://visualgo.net/en/list' }] },
    { title: 'Stack & Queue', description: 'Implement Stack and Queue from scratch. Solve: Valid Parentheses, Min Stack, and Implement Queue using Stacks.', difficulty: 'Easy', whatYouLearn: ['LIFO/FIFO concepts', 'Stack applications', 'Queue implementations'], resources: [{ label: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/stack-data-structure/' }] },
    { title: 'Sorting Algorithms', description: 'Implement Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort. Compare their time complexities.', difficulty: 'Easy', whatYouLearn: ['Sorting techniques', 'Divide and conquer', 'Time complexity analysis'], resources: [{ label: 'Sorting Visualizer', url: 'https://www.sortvisualizer.com/' }] },
    { title: 'Binary Search', description: 'Master binary search patterns: standard binary search, search in rotated array, find peak element, and first/last position.', difficulty: 'Medium', whatYouLearn: ['Binary search variations', 'Search space reduction', 'Edge cases'], resources: [{ label: 'Binary Search Guide', url: 'https://leetcode.com/tag/binary-search/' }] },
    { title: 'Hash Maps & Sets', description: 'Solve problems using hash maps: Group Anagrams, Longest Consecutive Sequence, Subarray Sum Equals K, and Top K Frequent Elements.', difficulty: 'Medium', whatYouLearn: ['Hash table internals', 'Collision handling', 'Frequency counting'], resources: [{ label: 'Hash Table wiki', url: 'https://en.wikipedia.org/wiki/Hash_table' }] },
    { title: 'Recursion & Backtracking', description: 'Solve: Generate Parentheses, Permutations, Subsets, N-Queens, and Sudoku Solver using recursion and backtracking.', difficulty: 'Medium', whatYouLearn: ['Recursive thinking', 'Backtracking patterns', 'State space tree'], resources: [{ label: 'Backtracking Guide', url: 'https://leetcode.com/tag/backtracking/' }] },
    { title: 'Binary Tree Traversals', description: 'Implement inorder, preorder, postorder (recursive + iterative), and level-order traversal of binary trees.', difficulty: 'Medium', whatYouLearn: ['Tree traversal algorithms', 'Recursive vs iterative', 'BFS vs DFS'], resources: [{ label: 'Tree Visualizer', url: 'https://visualgo.net/en/bst' }] },
    { title: 'Dynamic Programming I', description: 'Solve classic DP problems: Fibonacci, Climbing Stairs, House Robber, Coin Change, and Longest Increasing Subsequence.', difficulty: 'Medium', whatYouLearn: ['Memoization', 'Tabulation', 'Optimal substructure'], resources: [{ label: 'DP patterns', url: 'https://leetcode.com/tag/dynamic-programming/' }] },
    { title: 'Graph BFS & DFS', description: 'Implement BFS and DFS on adjacency list graphs. Solve: Number of Islands, Clone Graph, and Course Schedule.', difficulty: 'Medium', whatYouLearn: ['Graph representation', 'BFS/DFS algorithms', 'Connected components'], resources: [{ label: 'Graph algorithms', url: 'https://visualgo.net/en/dfsbfs' }] },
    { title: 'Two Pointers & Sliding Window', description: 'Master sliding window: Longest Substring Without Repeating Characters, Minimum Window Substring, and Max Consecutive Ones III.', difficulty: 'Medium', whatYouLearn: ['Sliding window technique', 'Two-pointer patterns', 'Window optimization'], resources: [{ label: 'Sliding Window', url: 'https://leetcode.com/tag/sliding-window/' }] },
    { title: 'Heap & Priority Queue', description: 'Implement a min/max heap. Solve: Kth Largest Element, Merge K Sorted Lists, and Find Median from Data Stream.', difficulty: 'Hard', whatYouLearn: ['Heap data structure', 'Priority queues', 'Top-K problems'], resources: [{ label: 'Heap wiki', url: 'https://en.wikipedia.org/wiki/Heap_(data_structure)' }] },
    { title: 'Trie (Prefix Tree)', description: 'Implement a Trie from scratch. Solve: Word Search II, Implement Trie, and Design Search Autocomplete System.', difficulty: 'Hard', whatYouLearn: ['Trie structure', 'Prefix matching', 'Autocomplete systems'], resources: [{ label: 'Trie visualization', url: 'https://visualgo.net/en/trie' }] },
    { title: 'Dynamic Programming II', description: 'Advanced DP: 0/1 Knapsack, Longest Common Subsequence, Edit Distance, Matrix Chain Multiplication, and Palindrome Partitioning.', difficulty: 'Hard', whatYouLearn: ['2D DP tables', 'String DP', 'Optimization problems'], resources: [{ label: 'Advanced DP', url: 'https://cses.fi/problemset/' }] },
    { title: 'Segment Tree', description: 'Implement a Segment Tree with range queries and point updates. Solve range sum queries and range minimum queries.', difficulty: 'Hard', whatYouLearn: ['Segment tree structure', 'Range queries', 'Lazy propagation'], resources: [{ label: 'CP Algorithms', url: 'https://cp-algorithms.com/data_structures/segment_tree.html' }] },
    { title: 'Graph Shortest Paths', description: "Implement Dijkstra's, Bellman-Ford, and Floyd-Warshall algorithms. Solve: Network Delay Time and Cheapest Flights.", difficulty: 'Hard', whatYouLearn: ['Shortest path algorithms', 'Weighted graphs', 'Negative cycles'], resources: [{ label: 'Dijkstra visualization', url: 'https://visualgo.net/en/sssp' }] },
    { title: 'Union-Find (DSU)', description: 'Implement Union-Find with path compression and rank. Solve: Redundant Connection, Accounts Merge, and Number of Provinces.', difficulty: 'Hard', whatYouLearn: ['Disjoint Set Union', 'Path compression', 'Union by rank'], resources: [{ label: 'DSU guide', url: 'https://cp-algorithms.com/data_structures/disjoint_set_union.html' }] },
    { title: 'Competitive Programming Contest', description: 'Participate in a virtual Codeforces/LeetCode contest. Solve at least 3 problems within the time limit.', difficulty: 'Hard', whatYouLearn: ['Time management', 'Problem-solving speed', 'Contest strategy'], resources: [{ label: 'Codeforces', url: 'https://codeforces.com/' }] },
    { title: 'System Design Basics', description: 'Design a URL shortener, rate limiter, and LRU cache. Document trade-offs, data structures, and scalability considerations.', difficulty: 'Hard', whatYouLearn: ['System design thinking', 'Trade-off analysis', 'Scalability patterns'], resources: [{ label: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' }] },
  ],
  'AI/ML': [
    { title: 'Python for Data Science', description: 'Set up a data science environment. Practice NumPy arrays, Pandas DataFrames, and Matplotlib plotting with a sample dataset.', difficulty: 'Easy', whatYouLearn: ['NumPy basics', 'Pandas DataFrames', 'Data visualization'], resources: [{ label: 'NumPy docs', url: 'https://numpy.org/doc/' }] },
    { title: 'Data Cleaning Pipeline', description: 'Clean a messy dataset: handle missing values, remove duplicates, fix data types, and normalize columns using Pandas.', difficulty: 'Easy', whatYouLearn: ['Data preprocessing', 'Missing value handling', 'Data normalization'], resources: [{ label: 'Pandas docs', url: 'https://pandas.pydata.org/docs/' }] },
    { title: 'Exploratory Data Analysis', description: 'Perform EDA on a real-world dataset (Titanic/Iris). Generate statistical summaries, correlation matrices, and distribution plots.', difficulty: 'Easy', whatYouLearn: ['Statistical analysis', 'Correlation analysis', 'Data visualization'], resources: [{ label: 'Seaborn docs', url: 'https://seaborn.pydata.org/' }] },
    { title: 'Linear Regression', description: 'Implement linear regression from scratch (gradient descent) and with scikit-learn. Predict housing prices and evaluate with R² and MSE.', difficulty: 'Easy', whatYouLearn: ['Gradient descent', 'Loss functions', 'Model evaluation'], resources: [{ label: 'Scikit-learn Linear Models', url: 'https://scikit-learn.org/stable/modules/linear_model.html' }] },
    { title: 'Data Visualization Dashboard', description: 'Create an interactive dashboard with Plotly/Streamlit showing multiple chart types and filtering capabilities.', difficulty: 'Easy', whatYouLearn: ['Interactive plots', 'Streamlit basics', 'Dashboard design'], resources: [{ label: 'Streamlit docs', url: 'https://docs.streamlit.io/' }] },
    { title: 'Logistic Regression Classifier', description: 'Build a binary classifier for spam detection using logistic regression. Implement feature engineering and cross-validation.', difficulty: 'Medium', whatYouLearn: ['Classification basics', 'Feature engineering', 'Cross-validation'], resources: [{ label: 'Scikit-learn Classification', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html' }] },
    { title: 'Decision Trees & Random Forest', description: 'Build decision tree and random forest classifiers. Visualize trees, tune hyperparameters, and compare model performance.', difficulty: 'Medium', whatYouLearn: ['Tree-based models', 'Ensemble methods', 'Hyperparameter tuning'], resources: [{ label: 'Random Forest Guide', url: 'https://scikit-learn.org/stable/modules/ensemble.html' }] },
    { title: 'K-Means Clustering', description: 'Implement K-Means clustering from scratch and with scikit-learn. Apply it to customer segmentation data.', difficulty: 'Medium', whatYouLearn: ['Unsupervised learning', 'Clustering algorithms', 'Elbow method'], resources: [{ label: 'K-Means docs', url: 'https://scikit-learn.org/stable/modules/clustering.html' }] },
    { title: 'NLP Text Classification', description: 'Build a sentiment analysis model using TF-IDF and Naive Bayes. Classify movie reviews as positive or negative.', difficulty: 'Medium', whatYouLearn: ['Text preprocessing', 'TF-IDF vectorization', 'Naive Bayes classifier'], resources: [{ label: 'NLTK docs', url: 'https://www.nltk.org/' }] },
    { title: 'Neural Network from Scratch', description: 'Implement a basic feedforward neural network from scratch using only NumPy. Train it on MNIST handwritten digits.', difficulty: 'Medium', whatYouLearn: ['Backpropagation', 'Activation functions', 'Neural network architecture'], resources: [{ label: '3Blue1Brown NN', url: 'https://www.3blue1brown.com/topics/neural-networks' }] },
    { title: 'Image Classification with CNN', description: 'Build a Convolutional Neural Network using TensorFlow/Keras for CIFAR-10 image classification. Implement data augmentation.', difficulty: 'Medium', whatYouLearn: ['CNNs', 'Convolution layers', 'Data augmentation'], resources: [{ label: 'TensorFlow tutorials', url: 'https://www.tensorflow.org/tutorials' }] },
    { title: 'Transfer Learning', description: 'Use a pre-trained model (ResNet/VGG) for custom image classification with transfer learning and fine-tuning techniques.', difficulty: 'Medium', whatYouLearn: ['Transfer learning', 'Feature extraction', 'Fine-tuning'], resources: [{ label: 'Transfer Learning Guide', url: 'https://keras.io/guides/transfer_learning/' }] },
    { title: 'Recommendation System', description: 'Build a recommendation engine using collaborative filtering and content-based filtering for a movie dataset.', difficulty: 'Hard', whatYouLearn: ['Collaborative filtering', 'Content-based filtering', 'Matrix factorization'], resources: [{ label: 'Surprise library', url: 'https://surpriselib.com/' }] },
    { title: 'GANs (Generative Model)', description: 'Implement a basic GAN (Generative Adversarial Network) to generate handwritten digits. Understand generator/discriminator training.', difficulty: 'Hard', whatYouLearn: ['GAN architecture', 'Adversarial training', 'Image generation'], resources: [{ label: 'GAN tutorial', url: 'https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html' }] },
    { title: 'LSTM Time Series', description: 'Build an LSTM model for stock price prediction using historical data. Implement data windowing and sequence generation.', difficulty: 'Hard', whatYouLearn: ['Recurrent Neural Networks', 'LSTM architecture', 'Sequence modeling'], resources: [{ label: 'Keras RNN Guide', url: 'https://keras.io/guides/working_with_rnns/' }] },
    { title: 'Object Detection (YOLO)', description: 'Implement object detection using YOLO or Faster R-CNN. Detect and label objects in images and video streams.', difficulty: 'Hard', whatYouLearn: ['Object detection', 'Anchor boxes', 'Non-max suppression'], resources: [{ label: 'Ultralytics YOLO', url: 'https://docs.ultralytics.com/' }] },
    { title: 'Transformer Architecture', description: 'Implement a simplified Transformer from scratch. Understand self-attention, multi-head attention, and positional encoding.', difficulty: 'Hard', whatYouLearn: ['Self-attention mechanism', 'Positional encoding', 'Transformer architecture'], resources: [{ label: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762' }] },
    { title: 'Fine-tune an LLM', description: 'Fine-tune a small language model (GPT-2/DistilBERT) on a custom dataset using Hugging Face Transformers library.', difficulty: 'Hard', whatYouLearn: ['Model fine-tuning', 'Hugging Face library', 'Training loops'], resources: [{ label: 'Hugging Face docs', url: 'https://huggingface.co/docs/transformers/' }] },
    { title: 'RAG System', description: 'Build a Retrieval-Augmented Generation system that answers questions from a custom knowledge base using embeddings and an LLM.', difficulty: 'Hard', whatYouLearn: ['RAG architecture', 'Vector embeddings', 'Semantic search'], resources: [{ label: 'LangChain docs', url: 'https://python.langchain.com/docs/' }] },
    { title: 'ML Pipeline Deployment', description: 'Deploy a trained ML model as a REST API using Flask/FastAPI. Add model versioning, monitoring, and A/B testing.', difficulty: 'Hard', whatYouLearn: ['Model deployment', 'API design', 'MLOps basics'], resources: [{ label: 'FastAPI docs', url: 'https://fastapi.tiangolo.com/' }] },
  ],
};

function generateSeedTasks(track) {
  const trackTasks = TRACK_TASKS[track] || TRACK_TASKS['Cybersecurity'];
  return Array.from({ length: 60 }, (_, i) => {
    const day = i + 1;
    const taskTemplate = trackTasks[i % trackTasks.length];
    
    // Calculate difficulty progression
    let difficultyLabel;
    if (day <= 15) difficultyLabel = 'Easy';
    else if (day <= 40) difficultyLabel = 'Medium';
    else difficultyLabel = 'Hard';

    // Pick task matching difficulty where possible
    const matchingTasks = trackTasks.filter(t => t.difficulty === difficultyLabel);
    const selectedTask = matchingTasks.length > 0 
      ? matchingTasks[i % matchingTasks.length] 
      : taskTemplate;

    return {
      day,
      title: selectedTask.title,
      description: selectedTask.description,
      difficulty: selectedTask.difficulty,
      track,
      whatYouLearn: selectedTask.whatYouLearn,
      resources: selectedTask.resources,
      isCustom: false,
    };
  });
}

// ─── Achievement Definitions ────────────────────────────────────────────────

const ACHIEVEMENT_DEFS = [
  { id: 1, label: 'First Step', emoji: '🚀', condition: (subs) => subs.filter(s => s.status === 'submitted').length >= 1, description: 'Complete your first day' },
  { id: 2, label: 'First Week Done', emoji: '✅', condition: (subs) => subs.filter(s => s.status === 'submitted').length >= 7, description: 'Complete 7 days' },
  { id: 3, label: 'GitHub Warrior', emoji: '🔗', condition: (subs) => subs.filter(s => s.status === 'submitted' && s.githubUrl).length >= 5, description: 'Submit 5 GitHub links' },
  { id: 4, label: 'LinkedIn Visible', emoji: '👁️', condition: (subs) => subs.filter(s => s.status === 'submitted' && s.linkedinUrl).length >= 3, description: 'Submit 3 LinkedIn posts' },
  { id: 5, label: 'Halfway There', emoji: '🏃', condition: (subs) => subs.filter(s => s.status === 'submitted').length >= 30, description: 'Complete 30 days' },
  { id: 6, label: 'Streak Master', emoji: '🔥', condition: (_, streak) => streak >= 14, description: 'Maintain a 14-day streak' },
  { id: 7, label: 'Full Stack', emoji: '🧱', condition: (subs) => subs.filter(s => s.status === 'submitted').length >= 45, description: 'Complete 45 days' },
  { id: 8, label: '60 Day Legend', emoji: '🏆', condition: (subs) => subs.filter(s => s.status === 'submitted').length >= 60, description: 'Complete all 60 days' },
];

// ─── Compute Functions ──────────────────────────────────────────────────────

function computeStreak(submissions) {
  // Sort by day descending to find the current streak from the latest submitted day
  const submitted = submissions
    .filter(s => s.status === 'submitted')
    .map(s => s.day)
    .sort((a, b) => b - a);

  if (submitted.length === 0) return 0;

  let streak = 1;
  for (let i = 0; i < submitted.length - 1; i++) {
    if (submitted[i] - submitted[i + 1] === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function computeCurrentDay(submissions) {
  const submitted = submissions
    .filter(s => s.status === 'submitted')
    .map(s => s.day);
  
  if (submitted.length === 0) return 1;
  return Math.max(...submitted) + 1;
}

function computeAchievements(submissions, streak) {
  return ACHIEVEMENT_DEFS.map(ach => ({
    id: ach.id,
    label: ach.label,
    emoji: ach.emoji,
    description: ach.description,
    unlocked: ach.condition(submissions, streak),
  }));
}

function computeRank(completedDays) {
  // Simulated rank based on completed days (lower = better)
  if (completedDays >= 50) return { rank: Math.floor(Math.random() * 5) + 1, percentile: 'Top 1%' };
  if (completedDays >= 30) return { rank: Math.floor(Math.random() * 20) + 5, percentile: 'Top 10%' };
  if (completedDays >= 15) return { rank: Math.floor(Math.random() * 50) + 20, percentile: 'Top 23%' };
  if (completedDays >= 7) return { rank: Math.floor(Math.random() * 100) + 50, percentile: 'Top 40%' };
  if (completedDays >= 1) return { rank: Math.floor(Math.random() * 100) + 100, percentile: 'Top 60%' };
  return { rank: 210, percentile: 'Not ranked' };
}

// ─── React Context ──────────────────────────────────────────────────────────

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [profile, setProfileState] = useState(() => loadFromStorage(STORAGE_KEYS.PROFILE, null));
  const [tasks, setTasksState] = useState(() => loadFromStorage(STORAGE_KEYS.TASKS, null));
  const [submissions, setSubmissionsState] = useState(() => loadFromStorage(STORAGE_KEYS.SUBMISSIONS, []));

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (profile) saveToStorage(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    if (tasks) saveToStorage(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SUBMISSIONS, submissions);
  }, [submissions]);

  // ── Profile ──

  const hasProfile = profile !== null;

  const setProfile = useCallback((data) => {
    const newProfile = {
      name: data.name,
      college: data.college,
      branch: data.branch || '',
      track: data.track,
      createdAt: new Date().toISOString(),
    };
    setProfileState(newProfile);
    // Generate seed tasks for the chosen track if none exist
    if (!tasks) {
      setTasksState(generateSeedTasks(data.track));
    }
  }, [tasks]);

  // ── Tasks ──

  const getTask = useCallback((day) => {
    if (!tasks) return null;
    return tasks.find(t => t.day === day) || null;
  }, [tasks]);

  const setTask = useCallback((day, taskData) => {
    setTasksState(prev => {
      const existing = prev || [];
      const idx = existing.findIndex(t => t.day === day);
      const newTask = { ...taskData, day, isCustom: true };
      if (idx >= 0) {
        const updated = [...existing];
        updated[idx] = newTask;
        return updated;
      }
      return [...existing, newTask].sort((a, b) => a.day - b.day);
    });
  }, []);

  // ── Submissions ──

  const getSubmission = useCallback((day) => {
    return submissions.find(s => s.day === day) || null;
  }, [submissions]);

  const submitDay = useCallback((day, data) => {
    setSubmissionsState(prev => {
      const existing = prev.findIndex(s => s.day === day);
      const newSub = {
        day,
        status: 'submitted',
        githubUrl: data.githubUrl || '',
        linkedinUrl: data.linkedinUrl || '',
        notes: data.notes || '',
        submittedAt: new Date().toISOString(),
      };
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newSub;
        return updated;
      }
      return [...prev, newSub].sort((a, b) => a.day - b.day);
    });
  }, []);

  // ── Computed ──

  const streak = computeStreak(submissions);
  const currentDay = computeCurrentDay(submissions);
  const completedDays = submissions.filter(s => s.status === 'submitted').length;
  const achievements = computeAchievements(submissions, streak);
  const { rank, percentile } = computeRank(completedDays);

  const submissionHistory = Array.from({ length: Math.max(currentDay + 2, 14) }, (_, i) => {
    const day = i + 1;
    const sub = submissions.find(s => s.day === day);
    if (sub) return { day, status: sub.status };
    if (day < currentDay) return { day, status: 'missed' };
    if (day === currentDay) return { day, status: 'pending' };
    return { day, status: 'future' };
  });

  // Average submission hour (for personality display)
  const avgSubmissionHour = submissions.length > 0
    ? Math.round(submissions.reduce((acc, s) => acc + new Date(s.submittedAt || Date.now()).getHours(), 0) / submissions.length)
    : 22;

  const personality = avgSubmissionHour >= 21 || avgSubmissionHour <= 4
    ? { label: 'Night Owl', emoji: '🦉', color: 'indigo' }
    : avgSubmissionHour <= 11
    ? { label: 'Early Bird', emoji: '🌅', color: 'amber' }
    : { label: 'Afternoon Coder', emoji: '☀️', color: 'orange' };

  const studentData = profile ? {
    name: profile.name,
    college: profile.college,
    track: profile.track,
    branch: profile.branch,
    day: currentDay,
    totalDays: 60,
    streak,
    rank,
    totalParticipants: 210,
    percentile,
    personality,
    avgSubmissionHour,
    achievements,
  } : null;

  const todayTask = getTask(currentDay);

  const allDays = (tasks || []).map(t => ({
    day: t.day,
    title: t.title,
    difficulty: t.difficulty === 'Easy' ? 3 : t.difficulty === 'Medium' ? 6 : 9,
  }));

  // ── Reset ──

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
    setProfileState(null);
    setTasksState(null);
    setSubmissionsState([]);
  }, []);

  const value = {
    // Profile
    profile,
    hasProfile,
    setProfile,
    // Tasks
    tasks: tasks || [],
    getTask,
    setTask,
    // Submissions
    submissions,
    getSubmission,
    submitDay,
    submissionHistory,
    // Computed
    student: studentData,
    todayTask,
    allDays,
    streak,
    currentDay,
    completedDays,
    achievements,
    // Utils
    resetAll,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export { TRACK_TASKS };
