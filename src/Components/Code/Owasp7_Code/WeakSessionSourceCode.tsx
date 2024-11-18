
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../CodeSnippets";

export const getWeakSessionIdsCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `function generateSessionID() {
  // สร้าง Session ID ที่ยาวและสุ่มจากการเข้ารหัส
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let sessionID = '';
  for (let i = 0; i < 64; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    sessionID += charset[randomIndex];
  }
  return sessionID;
}

// ใช้ฟังก์ชันในการสร้าง Session ID ที่ปลอดภัย
const sessionID = generateSessionID();
console.log('Generated Secure Session ID:', sessionID);
`,
           python: `import random
import string

def generate_session_id(length=64):
    charset = string.ascii_letters + string.digits  # A-Z, a-z, 0-9
    session_id = ''.join(random.choice(charset) for _ in range(length))
    return session_id

# ใช้ฟังก์ชันในการสร้าง Session ID ที่ปลอดภัย
session_id = generate_session_id()
print('Generated Secure Session ID:', session_id)
`,
           java: `import java.security.SecureRandom;

public class SessionIDGenerator {
    private static final String CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int SESSION_ID_LENGTH = 64;

    public static String generateSessionID() {
        SecureRandom random = new SecureRandom();
        StringBuilder sessionID = new StringBuilder();
        for (int i = 0; i < SESSION_ID_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARSET.length());
            sessionID.append(CHARSET.charAt(randomIndex));
        }
        return sessionID.toString();
    }

    public static void main(String[] args) {
        // ใช้ฟังก์ชันในการสร้าง Session ID ที่ปลอดภัย
        String sessionID = generateSessionID();
        System.out.println("Generated Secure Session ID: " + sessionID);
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `// ตั้งค่า Cookie ที่มี Secure และ HttpOnly attributes
document.cookie = "sessionID=" + generateSessionID() + "; path=/; Secure; HttpOnly; SameSite=Strict";

// การตรวจสอบการตั้งค่า cookie
console.log(document.cookie);
`,
           python: `from flask import Flask, make_response
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)  # สำหรับการเข้ารหัส session

@app.route('/')
def set_cookie():
    # สร้าง Session ID แบบสุ่ม
    session_id = secrets.token_urlsafe(16)
    
    # สร้างการตอบกลับและตั้งค่า Cookie
    resp = make_response("Cookie is set")
    
    # ตั้งค่า Cookie ที่มี Secure, HttpOnly, และ SameSite=Strict
    resp.set_cookie(
        'sessionID', 
        session_id, 
        secure=True,       # ต้องใช้ HTTPS
        httponly=True,     # ป้องกันการเข้าถึงผ่าน JavaScript
        samesite='Strict', # ป้องกันการส่ง Cookie ข้ามไซต์
        path='/'
    )
    
    return resp

if __name__ == '__main__':
    app.run(ssl_context='adhoc')  # เปิดใช้งาน HTTPS ในการทดสอบ
`,
           java: `import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.UUID;

public class SetCookieServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // สร้าง Session ID แบบสุ่ม
        String sessionID = UUID.randomUUID().toString();
        
        // สร้าง Cookie
        Cookie sessionCookie = new Cookie("sessionID", sessionID);
        
        // ตั้งค่า Cookie
        sessionCookie.setPath("/");
        sessionCookie.setSecure(true);    // ต้องใช้ HTTPS
        sessionCookie.setHttpOnly(true);  // ป้องกันการเข้าถึงผ่าน JavaScript
        sessionCookie.setSameSite("Strict"); // ป้องกันการส่ง Cookie ข้ามไซต์
        
        // ส่ง Cookie ไปยังผู้ใช้
        response.addCookie(sessionCookie);
        
        // ส่งข้อความตอบกลับ
        response.getWriter().println("Cookie is set");
    }
}
`,
         };
        
      case 'Lesson3' :
        return{
          javascript:`function refreshSessionID() {
  // สร้าง Session ID ใหม่ทุกครั้งที่ผู้ใช้ล็อกอินหรือเปลี่ยนสถานะ
  const newSessionID = generateSessionID();
  document.cookie = "sessionID=" + newSessionID + "; path=/; Secure; HttpOnly; SameSite=Strict";
  console.log("New Session ID generated:", newSessionID);
}

// เรียกฟังก์ชันเมื่อผู้ใช้ล็อกอินสำเร็จ
refreshSessionID();
`,
python:`from flask import Flask, session, redirect, url_for, request
import os
import hashlib

app = Flask(__name__)
app.secret_key = os.urandom(24)  # ใช้ key ที่มีความปลอดภัย

# ฟังก์ชันสำหรับสร้าง session ID ใหม่
def generate_session_id():
    return hashlib.sha256(os.urandom(64)).hexdigest()

# ฟังก์ชันในการรีเฟรช session ID
@app.route('/login', methods=['POST'])
def login():
    # เมื่อผู้ใช้ล็อกอินสำเร็จ สร้าง session ID ใหม่
    new_session_id = generate_session_id()
    session['sessionID'] = new_session_id
    print("New Session ID generated:", new_session_id)
    
    return redirect(url_for('home'))

@app.route('/home')
def home():
    # ตรวจสอบว่า session ID ถูกตั้งค่าแล้วหรือยัง
    if 'sessionID' in session:
        return f"Session ID: {session['sessionID']}"
    else:
        return "No session ID found"

if __name__ == '__main__':
    app.run(debug=True)
`,
java:`import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.security.SecureRandom;
import java.util.Base64;

public class SessionServlet extends HttpServlet {

    // ฟังก์ชันสำหรับสร้าง session ID ใหม่
    private String generateSessionID() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[64];
        secureRandom.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // เมื่อผู้ใช้ล็อกอินสำเร็จ สร้าง session ID ใหม่
        String newSessionID = generateSessionID();
        
        // สร้าง cookie สำหรับเก็บ session ID
        Cookie sessionCookie = new Cookie("sessionID", newSessionID);
        sessionCookie.setPath("/");
        sessionCookie.setSecure(true);        // ใช้เฉพาะ HTTPS
        sessionCookie.setHttpOnly(true);      // ป้องกันไม่ให้เข้าถึงจาก JavaScript
        sessionCookie.setSameSite("Strict");  // กำหนด SameSite ให้เป็น Strict
        
        // เพิ่ม cookie ไปใน response
        response.addCookie(sessionCookie);

        // แสดงผล session ID ที่สร้างใหม่
        System.out.println("New Session ID generated: " + newSessionID);

        // ส่งผู้ใช้ไปที่หน้า home
        response.sendRedirect("home");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // ดึงค่า session ID จาก cookie
        Cookie[] cookies = request.getCookies();
        String sessionID = null;
        
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("sessionID".equals(cookie.getName())) {
                    sessionID = cookie.getValue();
                    break;
                }
            }
        }

        // แสดงผล session ID ที่เก็บใน cookie
        if (sessionID != null) {
            response.getWriter().write("Session ID: " + sessionID);
        } else {
            response.getWriter().write("No session ID found");
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