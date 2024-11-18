
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../CodeSnippets";

export const getLaxSecuritySettingCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `document.cookie = "sessionId=your_session_value; Secure; HttpOnly; SameSite=Strict; path=/";
`,
           python: `from flask import Flask, make_response

app = Flask(__name__)

@app.route('/')
def set_cookie():
    response = make_response("Cookie set")
    response.set_cookie(
        "sessionId",
        value="your_session_value",
        secure=True,
        httponly=True,
        samesite="Strict",
        path="/"
    )
    return response

if __name__ == '__main__':
    app.run()
`,
           java: `import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SetCookieServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Cookie cookie = new Cookie("sessionId", "your_session_value");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setDomain(request.getServerName());
        cookie.setMaxAge(3600); // ตั้งเวลาหมดอายุเป็นวินาที (ตัวอย่างนี้คือ 1 ชั่วโมง)
        cookie.setComment("SameSite=Strict"); // ใช้เป็น workaround เพราะ Java API ไม่มีการตั้งค่า SameSite โดยตรง

        response.addCookie(cookie);
        response.getWriter().write("Cookie set");
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `// ต้องติดตั้ง CryptoJS ก่อน: npm install crypto-js
const CryptoJS = require("crypto-js");

// การเข้ารหัสรหัสผ่าน
const password = "password123";
const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret_key').toString();

console.log("Encrypted Password:", encryptedPassword);


`,
           python: `from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import base64

# ข้อมูลที่ต้องการเข้ารหัส
password = "password123"
secret_key = "secret_key"  # ใช้คีย์เดียวกับตัวอย่างใน JavaScript

# สร้าง cipher โดยตั้งค่า mode เป็น ECB และความยาวบิตคีย์เป็น 128
cipher = AES.new(secret_key.encode('utf-8'), AES.MODE_ECB)
encrypted_bytes = cipher.encrypt(pad(password.encode('utf-8'), AES.block_size))

# เข้ารหัสเสร็จและแปลงผลลัพธ์เป็น Base64
encrypted_password = base64.b64encode(encrypted_bytes).decode('utf-8')
print("Encrypted Password:", encrypted_password)
`,
           java: `import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class AesEncryptionExample {
    public static void main(String[] args) throws Exception {
        String password = "password123";
        String secretKey = "secret_key";

        // สร้าง SecretKeySpec โดยใช้คีย์เดียวกับตัวอย่างใน JavaScript
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(), "AES");
        
        // สร้าง Cipher โดยตั้งค่าให้เข้ารหัสแบบ AES/ECB/PKCS5Padding
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, keySpec);

        byte[] encryptedBytes = cipher.doFinal(password.getBytes("UTF-8"));
        String encryptedPassword = Base64.getEncoder().encodeToString(encryptedBytes);
        
        System.out.println("Encrypted Password: " + encryptedPassword);
    }
}
`,
         };

         case 'Lesson3' :
          return{
            javascript:`// สมมติว่าเรามี API ที่ใช้ OTP ในการยืนยันตัวตน
const submitLogin = async (username, password) => {
    // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อขอ OTP
    const response = await fetch('/api/request-otp', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    if (data.success) {
        // ให้ผู้ใช้กรอกรหัส OTP
        const otp = prompt("กรุณากรอกรหัส OTP ที่ส่งไปยังโทรศัพท์ของคุณ:");
        
        // ส่ง OTP ไปตรวจสอบ
        const verifyResponse = await fetch('/api/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ username, otp }),
            headers: { 'Content-Type': 'application/json' }
        });

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
            alert('การยืนยันตัวตนสำเร็จ');
        } else {
            alert('รหัส OTP ไม่ถูกต้อง');
        }
    } else {
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
};
`,
            python:`import requests

def submit_login(username, password):
    # ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อขอ OTP
    response = requests.post(
        'http://yourserver.com/api/request-otp',
        json={'username': username, 'password': password}
    )

    if response.status_code == 200 and response.json().get('success'):
        # ให้ผู้ใช้กรอกรหัส OTP
        otp = input("กรุณากรอกรหัส OTP ที่ส่งไปยังโทรศัพท์ของคุณ: ")

        # ส่ง OTP ไปตรวจสอบ
        verify_response = requests.post(
            'http://yourserver.com/api/verify-otp',
            json={'username': username, 'otp': otp}
        )

        if verify_response.status_code == 200 and verify_response.json().get('success'):
            print('การยืนยันตัวตนสำเร็จ')
        else:
            print('รหัส OTP ไม่ถูกต้อง')
    else:
        print('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')

# เรียกใช้ฟังก์ชัน
submit_login('your_username', 'your_password')
`,
            java:`import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class OTPAuthentication {

    public static void submitLogin(String username, String password) {
        try {
            // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อขอ OTP
            URL url = new URL("http://yourserver.com/api/request-otp");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            String jsonInputString = String.format("{\"username\": \"%s\", \"password\": \"%s\"}", username, password);
            try (OutputStream os = conn.getOutputStream()) {
                os.write(jsonInputString.getBytes("utf-8"));
                os.flush();
            }

            if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
                Scanner scanner = new Scanner(conn.getInputStream());
                String response = scanner.hasNext() ? scanner.next() : "";
                if (response.contains("\"success\":true")) {
                    // ให้ผู้ใช้กรอกรหัส OTP
                    Scanner input = new Scanner(System.in);
                    System.out.print("กรุณากรอกรหัส OTP ที่ส่งไปยังโทรศัพท์ของคุณ: ");
                    String otp = input.nextLine();

                    // ส่ง OTP ไปตรวจสอบ
                    url = new URL("http://yourserver.com/api/verify-otp");
                    conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("POST");
                    conn.setRequestProperty("Content-Type", "application/json");
                    conn.setDoOutput(true);

                    jsonInputString = String.format("{\"username\": \"%s\", \"otp\": \"%s\"}", username, otp);
                    try (OutputStream os = conn.getOutputStream()) {
                        os.write(jsonInputString.getBytes("utf-8"));
                        os.flush();
                    }

                    if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
                        scanner = new Scanner(conn.getInputStream());
                        response = scanner.hasNext() ? scanner.next() : "";
                        if (response.contains("\"success\":true")) {
                            System.out.println("การยืนยันตัวตนสำเร็จ");
                        } else {
                            System.out.println("รหัส OTP ไม่ถูกต้อง");
                        }
                    }
                } else {
                    System.out.println("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        submitLogin("your_username", "your_password");
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