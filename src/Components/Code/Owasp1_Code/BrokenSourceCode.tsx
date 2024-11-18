
import { CodeSnippets } from '../CodeSnippets';


// Sub-function for LessonBrokenAccControl pages
export const getBrokenAccControlCodeSnippets = (pageName: string): CodeSnippets => {
  switch (pageName) {
    case 'Lesson1':
      return {
        javascript: `if (user.role === 'admin') {
    // อนุญาตให้เข้าถึงฟังก์ชันที่มีสิทธิ์เฉพาะ
    } else {
    // แสดงข้อความว่าผู้ใช้ไม่มีสิทธิ์ในการเข้าถึง
    return res.status(403).send('Access Denied');
    }`,
        python: `from flask import Flask, request, jsonify

app = Flask(__name__)

def check_user_role(user):
    # ตรวจสอบว่า user มี role เป็น 'admin' หรือไม่
    if user.get('role') == 'admin':
        # อนุญาตให้เข้าถึงฟังก์ชันที่มีสิทธิ์เฉพาะ
        return jsonify({"message": "Access Granted"})
    else:
        # ส่งกลับสถานะ HTTP 403 พร้อมข้อความแจ้งเตือน
        return jsonify({"message": "Access Denied"}), 403

# ตัวอย่างการเรียกฟังก์ชัน
@app.route('/admin')
def admin_route():
    # สมมติว่า user ถูกดึงมาจากฐานข้อมูลหรือ token
    user = {"role": "user"}  # ตัวอย่างข้อมูล user ที่ไม่มีสิทธิ์
    return check_user_role(user)

if __name__ == '__main__':
    app.run(debug=True)
`,
        java: `import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/admin")
    public ResponseEntity<String> checkUserRole() {
        // สมมติว่า user ถูกดึงมาจากฐานข้อมูลหรือ token
        Map<String, String> user = Map.of("role", "user"); // ตัวอย่างข้อมูล user ที่ไม่มีสิทธิ์

        // ตรวจสอบว่า user มี role เป็น 'admin' หรือไม่
        if ("admin".equals(user.get("role"))) {
            // อนุญาตให้เข้าถึงฟังก์ชันที่มีสิทธิ์เฉพาะ
            return ResponseEntity.ok("Access Granted");
        } else {
            // ส่งกลับสถานะ HTTP 403 พร้อมข้อความแจ้งเตือน
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied");
        }
    }
}
`,
      };

    case 'Lesson2':
      return {
        javascript: `// ตรวจสอบว่า userId ที่ทำการร้องขอตรงกับข้อมูลของผู้ใช้ที่ล็อกอินอยู่หรือไม่
                         if (req.user.id !== req.params.userId) {
                          return res.sta  tus(403).send('Access Denied');
                         }`,
        python: `from flask import request, jsonify
from functools import wraps

def check_user_access(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # ดึงข้อมูล userId ของผู้ใช้ที่ล็อกอินอยู่
        logged_in_user_id = request.user.id
        
        # ตรวจสอบว่า userId ที่ทำการร้องขอตรงกับข้อมูลของผู้ใช้ที่ล็อกอินอยู่หรือไม่
        requested_user_id = kwargs.get('userId')
        if logged_in_user_id != requested_user_id:
            # ส่งสถานะ 403 และข้อความ Access Denied ถ้า userId ไม่ตรงกัน
            return jsonify({"error": "Access Denied"}), 403
        
        # ถ้า userId ตรงกัน เรียกฟังก์ชันที่ตกแต่งด้วย decorator นี้ต่อ
        return f(*args, **kwargs)
    return decorated_function
`,
        java: `import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
public class UserController {

    // ฟังก์ชันตรวจสอบสิทธิ์ของผู้ใช้
    @GetMapping("/user/{userId}")
    public ResponseEntity<String> checkUserAccess(@PathVariable String userId, @RequestAttribute("user") User loggedInUser) {
        // ตรวจสอบว่า userId ที่ทำการร้องขอตรงกับข้อมูลของผู้ใช้ที่ล็อกอินอยู่หรือไม่
        if (!loggedInUser.getId().equals(userId)) {
            // ถ้าไม่ตรงกัน ให้ส่งสถานะ 403 และข้อความ Access Denied
            return new ResponseEntity<>("Access Denied", HttpStatus.FORBIDDEN);
        }
        
        // ถ้าตรงกัน ให้ดำเนินการต่อ (เช่น ส่งข้อมูลผู้ใช้กลับ)
        return new ResponseEntity<>("Access Granted", HttpStatus.OK);
    }
}
`,
      };

    // Add more cases for LessonBrokenAccControl
    case 'Lesson3':
      return {
        javascript: `// middleware ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือยัง
   function isAuthenticated(req, res, next) {
     if (req.isAuthenticated()) {
       return next();
     } else {
       res.redirect('/login');
     }
   }`,
        python: `from flask import redirect, url_for
from flask_login import current_user

# ฟังก์ชันตรวจสอบการเข้าสู่ระบบ
def is_authenticated(func):
    def wrapper(*args, **kwargs):
        # ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือยัง
        if current_user.is_authenticated:
            return func(*args, **kwargs)  # เรียกใช้ฟังก์ชันถัดไปถ้าเข้าสู่ระบบแล้ว
        else:
            return redirect(url_for('login'))  # ถ้ายังไม่เข้าสู่ระบบ ให้ไปยังหน้า '/login'
    return wrapper
`,
        java: `import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // ดึงสถานะการยืนยันตัวตนปัจจุบันจาก Spring Security Context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือไม่
        if (authentication != null && authentication.isAuthenticated()) {
            return true;  // อนุญาตให้ไปยังฟังก์ชันถัดไปถ้าเข้าสู่ระบบแล้ว
        } else {
            response.sendRedirect("/login");  // ถ้ายังไม่เข้าสู่ระบบ ให้เปลี่ยนเส้นทางไปยัง '/login'
            return false;
        }
    }
}
`,
      };

    case 'Lesson4':
      return {
        javascript: `const express = require('express');
const app = express();

// Middleware ตรวจสอบสิทธิ์ (Deny by Default)
function checkPermission(req, res, next) {
    // ตรวจสอบว่าผู้ใช้มีสิทธิ์หรือไม่
    if (req.user && req.user.role === 'admin') {
        return next(); // อนุญาตการเข้าถึงถ้ามีสิทธิ์เป็น 'admin'
    } else {
        return res.status(403).send('Access denied'); // ปฏิเสธการเข้าถึงถ้าไม่มีสิทธิ์
    }
}

// กำหนดเส้นทางที่ต้องการการตรวจสอบสิทธิ์
app.get('/admin', checkPermission, (req, res) => {
    res.send('Welcome to admin panel');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
`,
        python: `from flask import Flask, redirect, url_for, request
from functools import wraps

app = Flask(__name__)

# Decorator ตรวจสอบสิทธิ์
def check_permission(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # ตรวจสอบสิทธิ์ของผู้ใช้
        if 'user_role' in request.cookies and request.cookies.get('user_role') == 'admin':
            return f(*args, **kwargs)  # อนุญาตการเข้าถึง
        return "Access Denied", 403  # ปฏิเสธการเข้าถึงถ้าไม่มีสิทธิ์
    return decorated_function

# กำหนดเส้นทางที่ต้องการการตรวจสอบสิทธิ์
@app.route('/admin')
@check_permission
def admin():
    return "Welcome to admin panel"

if __name__ == "__main__":
    app.run(port=5000)
`,
        java: `import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // กำหนดการอนุญาตสิทธิ์
        http
            .authorizeRequests()
            .antMatchers("/admin").hasRole("ADMIN")  // อนุญาตเฉพาะผู้ที่มี role เป็น ADMIN
            .anyRequest().denyAll()  // ปฏิเสธการเข้าถึงทุกอย่างโดยค่าเริ่มต้น
            .and()
            .formLogin().permitAll()  // อนุญาตให้เข้าถึงหน้า login ได้
            .and()
            .logout().permitAll();  // อนุญาตให้เข้าถึงหน้า logout ได้
    }
}
`,
      };


    default:
      return {
        javascript: `console.log('Broken Access Control default code');`,
      };
  }
};