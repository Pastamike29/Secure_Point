
import { CodeSnippets } from "../../../Components/Code/CodeSnippets";

export const getCrossSiteCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `// ติดตั้ง csurf ใน Express.js
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  res.send('
    <form action="/submit" method="POST">
      <input type="hidden" name="_csrf" value="'$'{req.csrfToken()}">
      <input type="text" name="data">
      <button type="submit">Submit</button>
    </form>
  ');
});

app.post('/submit', csrfProtection, (req, res) => {
  res.send('ฟอร์มถูกส่งเรียบร้อยแล้ว');
});
`,
           python: `from flask import Flask, render_template_string, request
from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)

# Configure secret key for CSRF protection
app.config['SECRET_KEY'] = 'your_secret_key_here'

# Initialize CSRF protection
csrf = CSRFProtect(app)

class MyForm(FlaskForm):
    data = StringField('Data')

@app.route('/form', methods=['GET'])
def form():
    form = MyForm()
    return render_template_string('''
        <form action="/submit" method="POST">
            {{ form.hidden_tag() }}  <!-- CSRF token -->
            {{ form.data.label }}: {{ form.data() }}
            <button type="submit">Submit</button>
        </form>
    ''', form=form)

@app.route('/submit', methods=['POST'])
def submit():
    return 'ฟอร์มถูกส่งเรียบร้อยแล้ว'

if __name__ == '__main__':
    app.run(debug=True)
`,
           java: `package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@Controller
class FormController {

    @GetMapping("/form")
    public String form(Model model) {
        return "form";
    }

    @PostMapping("/submit")
    public @ResponseBody String submit(@RequestParam String data) {
        return "ฟอร์มถูกส่งเรียบร้อยแล้ว";
    }
}
`,
         };
   
         case 'Lesson2':
           return {
             javascript: `app.post('/submit', (req, res) => {
  const referer = req.headers.referer;
  if (referer && referer.startsWith('https://yourwebsite.com')) {
    res.send('ฟอร์มถูกส่งเรียบร้อย');
  } else {
    res.status(403).send('คำขอไม่ถูกต้อง');
  }
});
`,
             python: `from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit_form():
    # รับค่า Referer จาก Header ของคำขอ
    referer = request.headers.get('Referer')
    
    # ตรวจสอบว่า Referer มีค่าและเริ่มต้นด้วย https://yourwebsite.com หรือไม่
    if referer and referer.startswith('https://yourwebsite.com'):
        return jsonify(message='ฟอร์มถูกส่งเรียบร้อย'), 200
    else:
        # ถ้าไม่ตรงเงื่อนไข ส่งสถานะ 403 พร้อมข้อความแจ้งว่าไม่ถูกต้อง
        return jsonify(message='คำขอไม่ถูกต้อง'), 403

if __name__ == '__main__':
    app.run(debug=True)
`,
             java: `import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
public class FormController {

    @PostMapping("/submit")
    public ResponseEntity<String> submitForm(@RequestHeader(value = "Referer", required = false) String referer) {
        // ตรวจสอบว่า Referer มีค่าและเริ่มต้นด้วย https://yourwebsite.com หรือไม่
        if (referer != null && referer.startsWith("https://yourwebsite.com")) {
            return ResponseEntity.ok("ฟอร์มถูกส่งเรียบร้อย");
        } else {
            // ถ้าไม่ตรงเงื่อนไข ส่งสถานะ 403 พร้อมข้อความแจ้งว่าไม่ถูกต้อง
            return ResponseEntity.status(403).body("คำขอไม่ถูกต้อง");
        }
    }
}
`,
           };
         
         case 'Lesson3':
           return {
             javascript: `app.use((req, res, next) => {
  res.cookie('session', 'value', { sameSite: 'Strict' });
  next(); 

  หรือ
// ตั้งค่าคุกกี้ด้วย SameSite attribute
document.cookie = "userToken=abc123; SameSite=Strict; Secure; Path=/;";


});
`,
             python: `from flask import Flask, make_response

app = Flask(__name__)

@app.route('/set-cookie')
def set_cookie():
    resp = make_response("คุกกี้ถูกตั้งค่าแล้ว")
    # ตั้งค่าคุกกี้ที่ชื่อ 'userToken' และใช้ SameSite attribute
    resp.set_cookie('userToken', 'abc123', samesite='Strict', secure=True, path='/')
    return resp

if __name__ == '__main__':
    app.run(ssl_context='adhoc')  # เปิด HTTPS เพื่อให้สามารถใช้ secure ได้
`,
             java: `import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
public class CookieController {

    @GetMapping("/set-cookie")
    public String setCookie(HttpServletResponse response) {
        // สร้างคุกกี้ใหม่
        Cookie cookie = new Cookie("userToken", "abc123");
        
        // ตั้งค่า SameSite cookie attribute
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // ใช้ได้เฉพาะกับ HTTPS
        cookie.setMaxAge(60 * 60 * 24); // อายุของคุกกี้ 1 วัน

        // ตั้งค่า SameSite attribute ใน HTTP header (Spring Boot ไม่สนับสนุนโดยตรง)
        response.addCookie(cookie);
        response.setHeader("Set-Cookie", "userToken=abc123; SameSite=Strict; Secure; HttpOnly; Path=/");

        return "คุกกี้ถูกตั้งค่าแล้ว";
    }
}
`,
           };
         
         default:
           return {
             javascript: `console.log('Cross Site default code');`,
         };
     }
   };