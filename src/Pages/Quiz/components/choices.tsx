const choices = [
     {
       question: 'What is the most common outcome of a successful XSS attack?',
       options: [
         'Unauthorized access to the server',
         'User session hijacking',
         'Data encryption',
         'DDoS attack',
         'Server crash',
       ], 
       answer: 'User session hijacking',
       image: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fquiz_1.png?alt=media&token=85d87547-3467-4189-9c64-8ab9ed25d28b',
     },
     {
       question: 'What does a typical SQL injection exploit target?',
       options: [
         'Database permissions',
         'Server resources',
         'Client-side code',
         'Query manipulation',
         'Network security',
       ],
       answer: 'Query manipulation',
       image: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fquiz_2.png?alt=media&token=aef875cf-e25a-456d-a80d-12cbbf6a2abb',
     },
     {
       question: 'Which one related to OWASP A06:2021 - Vulnerable and Outdated Components',
       options: [
         'Does not use new patch library',
         'Does not close Directory listing in configuration',
         'Does not use parameterized input',
         'Does not use CSRF token',
         'Does not using strong password',
       ],
       answer: 'Does not use new patch library',
       image: 'https://www.vaadata.com/blog/wp-content/uploads/2024/01/burp-send-group-1024x605.png',
     },
     {
       question: 'Which one is the best method to protect SQL Injection',
       options: [
         'Using Encryption the data in Database',
         'Using Prepared statement or Parameterized Queries',
         'Check the user input with Regex',
         'Using CSRF token',
         'Always updated the database',
       ],
       answer: 'Using Prepared statement or Parameterized Queries',
       image: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fquiz_4.png?alt=media&token=a7fcd833-e93c-4fd1-99c0-4a52997ed1d0',
     },
     {
       question: 'Which one does not related to OWASP A04:2021 - Insecure Design',
       options: [
         'Does not manage expire session',
         'Designing a system without considering SQL Injection vulnerabilities ',
         'Does not design Threat Modeling before developed application',
         'Stored confidential information by unencryption',
         'Incorporate security into each phase of the software development lifecycle (SDLC)',
       ],
       answer: 'Stored confidential information by unencryption',
       image: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fquiz_5.png?alt=media&token=9fb2b05f-2dcb-4483-93fa-352a07c5695b',
     },
     {
       question: 'Which choice is the best describe Privilege Escalation attack',
       options: [
         'Attack that related to database',
         'the process where an attacker exploits a vulnerability within a system to gain higher access privileges',
         'Embedding a script such as alert() into an input field that has a vulnerability',
         'An attack that causes a target server to crash or become unavailable',
         'Incorporate security into each phase of the software development lifecycle (SDLC)',
       ],
       answer: 'the process where an attacker exploits a vulnerability within a system to gain higher access privileges',
       image: 'https://www.vaadata.com/blog/wp-content/uploads/2024/01/burp-send-group-1024x605.png ',
     },
     {
       question: 'Which one is the best method to protect Cross-Site Scripting(XSS) attack',
       options: [
         'Using input Sanitization',
         'Using Firewall to protect unauthorized access',
         'Embedding a script such as alert() into an input field that has a vulnerability',
         'Using encryption data in transit',
         'Using user authentication',
       ],
       answer: 'Using input Sanitization',
       image: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fquiz_6.png?alt=media&token=e10e2b9a-1f34-40c1-89d3-93cee96c37cf',
     },
     {
       question: 'What is Cross-Site Request Forgery(CSRF) attack',
       options: [
         'Embedding a script such as alert() into an input field that has a vulnerability',
         'Injecting SQL commands to access or modify data in a database without authorization',
         'Submitting a form with a command to change a password or transfer money without the user knowledge',
         'Sending massive amounts of requests or data to a target simultaneously',
         'the process where an attacker exploits a vulnerability within a system to gain higher access privileges',
       ],
       answer: 'Submitting a form with a command to change a password or transfer money without the user knowledge',
       image: 'https://www.vaadata.com/blog/wp-content/uploads/2024/01/burp-send-group-1024x605.png ',
     },
     {
       question: 'Which choice is the best method to protect OWASP A01:2021 - Broken Access Control',
       options: [
         'Using CSRF token',
         'Using Role-Based Access Control(RBAC)',
         'Using complex URL',
         'Using Strong password',
         'Using Encryption in Transit',
       ],
       answer: 'Using Role-Based Access Control(RBAC)',
       image: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fquiz_9.png?alt=media&token=e30bd61e-192b-40c6-a6c5-1d223b993118',
     },
     {
       question: 'From http://127.0.0.1/accounts.php?user=bob If you can change the username from bob to alice and access someone else data, this is a failure of which OWASP',
       options: [
         'Cryptographic Failures',
         'Security Misconfiguration',
         'Software and Data Integrity Failures',
         'Insecure Design',
         'Broken Access Control',
       ],
       answer: 'Broken Access Control',
       image: 'https://www.vaadata.com/blog/wp-content/uploads/2024/01/burp-send-group-1024x605.png ',
     },
     // Add more questions here...
   ];
   
   export default choices;
   