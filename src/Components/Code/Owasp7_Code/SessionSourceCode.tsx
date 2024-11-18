
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../CodeSnippets";

export const getSessionFixationCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `// สมมุติว่าเราใช้ Express.js และ express-session
const express = require('express');
const session = require('express-session');
const app = express();

// การตั้งค่า session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // คุกกี้จะถูกส่งผ่านการเชื่อมต่อที่ปลอดภัย
}));

app.post('/login', (req, res) => {
  // ตรวจสอบข้อมูลผู้ใช้ (username, password) จากฐานข้อมูล
  const user = { username: 'user1', password: 'password123' }; // ตัวอย่างข้อมูล

  // หากผู้ใช้ล็อกอินสำเร็จ
  if (user) {
    // เปลี่ยน Session ID ใหม่เพื่อป้องกันการโจมตี Session Fixation
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).send('Error regenerating session.');
      }
      req.session.user = user;
      res.send('Login successful, session ID refreshed');
    });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
`,
           python: `from flask import Flask, request, session, jsonify
from flask_session import Session

app = Flask(__name__)

# ตั้งค่ารหัสลับของเซสชั่น
app.secret_key = 'your-secret-key'

# การตั้งค่า Session
app.config['SESSION_TYPE'] = 'filesystem'  # ใช้ filesystem สำหรับเก็บ session
Session(app)

@app.route('/login', methods=['POST'])
def login():
    # ตรวจสอบข้อมูลผู้ใช้ (username, password) จากฐานข้อมูล
    user = {'username': 'user1', 'password': 'password123'}  # ตัวอย่างข้อมูล

    # รับข้อมูลจาก request
    username = request.json.get('username')
    password = request.json.get('password')

    # ตรวจสอบข้อมูลผู้ใช้
    if username == user['username'] and password == user['password']:
        # หากล็อกอินสำเร็จ เปลี่ยน session ID เพื่อป้องกัน Session Fixation
        session['user'] = user
        session.modified = True  # แจ้งว่า session ถูกปรับปรุง
        return jsonify(message='Login successful, session ID refreshed')
    else:
        return jsonify(message='Invalid credentials'), 401

if __name__ == '__main__':
    app.run(debug=True, port=3000)
`,
           java: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.session.Session;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpSession;

@SpringBootApplication
public class SessionExampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(SessionExampleApplication.class, args);
    }
}

@RestController
class LoginController {

    @PostMapping("/login")
    public @ResponseBody String login(HttpSession session, @RequestBody User user) {
        // ตัวอย่างข้อมูลผู้ใช้
        User correctUser = new User("user1", "password123");

        // ตรวจสอบข้อมูลผู้ใช้
        if (user.getUsername().equals(correctUser.getUsername()) && user.getPassword().equals(correctUser.getPassword())) {
            // รีเฟรช session ID เพื่อป้องกัน Session Fixation
            session.invalidate();  // ลบ session เก่า
            session = session.getServletContext().getSession(session.getId());  // สร้าง session ใหม่

            // เก็บข้อมูลผู้ใช้ใน session
            session.setAttribute("user", user);

            return "Login successful, session ID refreshed";
        } else {
            return "Invalid credentials";
        }
    }
}

class User {
    private String username;
    private String password;

    // Constructor, getters, and setters
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // ต้องใช้งาน HTTPS เท่านั้น
    httpOnly: true, // ห้ามเข้าถึงคุกกี้จาก JavaScript
    maxAge: 60000  // กำหนดอายุคุกกี้ (ตัวอย่าง: 1 นาที)
  }
}));
`,
           python: `from flask import Flask, session
from flask_session import Session

app = Flask(__name__)

# ตั้งค่า secret key
app.config['SECRET_KEY'] = 'your-secret-key'

# ตั้งค่าการใช้ session
app.config['SESSION_TYPE'] = 'filesystem'  # ใช้เก็บข้อมูล session ในไฟล์
app.config['SESSION_COOKIE_SECURE'] = True  # ใช้ HTTPS เท่านั้น
app.config['SESSION_COOKIE_HTTPONLY'] = True  # ห้ามเข้าถึงคุกกี้จาก JavaScript
app.config['PERMANENT_SESSION_LIFETIME'] = 60  # อายุ session (ตัวอย่าง: 1 นาที)

Session(app)

@app.route('/')
def index():
    session['user'] = 'John Doe'
    return 'Session is set'

if __name__ == '__main__':
    app.run(ssl_context='adhoc')  # ต้องใช้ HTTPS
`,
           java: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpCookie;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@SpringBootApplication
@EnableSpringHttpSession
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

@RestController
class SessionController {

    @GetMapping("/")
    public String setSession(HttpSession session, HttpServletRequest request) {
        session.setAttribute("user", "John Doe");

        // Set cookie parameters
        HttpCookie cookie = new HttpCookie("SESSION", session.getId());
        cookie.setSecure(true);  // ใช้ HTTPS เท่านั้น
        cookie.setHttpOnly(true);  // ห้ามเข้าถึงคุกกี้จาก JavaScript
        cookie.setMaxAge(60);  // อายุคุกกี้ (ตัวอย่าง: 1 นาที)

        // ส่งค่ากลับ
        return "Session is set";
    }
}
`,
         };
   
     case 'Lesson3':
      return{
        javascript:`app.use((req, res, next) => {
  // ตรวจสอบว่า session ID ที่ใช้มีการเปลี่ยนแปลงหลังจากการล็อกอินหรือไม่
  if (req.session.isNew) {
    // ถ้าเป็น session ใหม่ที่ถูกสร้างขึ้นโดยเซิร์ฟเวอร์
    console.log('New session created');
  } else {
    // ถ้า session ID ถูกกำหนดจากผู้ใช้หรือไม่ถูกสร้างใหม่
    console.log('Session ID might be fixed');
  }
  next();
});

app.post('/login', (req, res) => {
  // ทำการล็อกอินตามปกติ
  req.session.user = { username: 'user1' };
  res.send('Login successful');
});
`,
python:`from flask import Flask, session, request, redirect, url_for
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.permanent_session_lifetime = timedelta(minutes=5)

@app.before_request
def check_session():
    if 'user' in session:
        if session.modified:
            print("New session created")
        else:
            print("Session ID might be fixed")
    else:
        print("No session found")

@app.route('/login', methods=['POST'])
def login():
    # ทำการล็อกอินและสร้างเซสชัน
    session['user'] = {'username': 'user1'}
    return 'Login successful'

if __name__ == '__main__':
    app.run(debug=True)
`,
java:`import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@SpringBootApplication
public class SessionExampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(SessionExampleApplication.class, args);
    }

    @RestController
    @RequestMapping("/auth")
    public class LoginController {

        @PostMapping("/login")
        public ResponseEntity<String> login(HttpSession session) {
            // ทำการล็อกอินและสร้าง session
            session.setAttribute("user", "user1");
            return ResponseEntity.ok("Login successful");
        }

        @PostMapping("/check-session")
        public ResponseEntity<String> checkSession(HttpSession session) {
            // ตรวจสอบ session ว่าเป็น session ใหม่หรือไม่
            if (session.getAttribute("user") != null) {
                if (session.isNew()) {
                    System.out.println("New session created");
                } else {
                    System.out.println("Session ID might be fixed");
                }
            } else {
                System.out.println("No session found");
            }
            return ResponseEntity.ok("Session check completed");
        }
    }
}
`
      }
   
       default:
         return {
           javascript: `console.log('Directory Traversal default code');`,
         };
     }
   };