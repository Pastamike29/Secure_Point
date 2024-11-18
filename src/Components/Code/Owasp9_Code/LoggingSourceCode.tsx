
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../CodeSnippets";

export const getLoggingAndMonitoringFailuresCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `const fs = require('fs');
const crypto = require('crypto');

// ฟังก์ชันสำหรับบันทึกข้อมูลการใช้งานพร้อมเข้ารหัส log
function logEvent(eventType, username) {
    const timestamp = new Date().toISOString();
    const message = ''$'{timestamp} - '$'{eventType} - User: '$'{username}';

    // เข้ารหัสข้อความ log ก่อนบันทึก
    const cipher = crypto.createCipher('aes-256-cbc', 'your-secure-key');
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // บันทึกลงไฟล์ log
    fs.appendFileSync('activity.log', encrypted + '\n', (err) => {
        if (err) throw err;
    });

    console.log('Logged event: '$'{eventType}');
}

// เรียกใช้งานฟังก์ชัน logEvent
logEvent('LOGIN_ATTEMPT', 'user1');
`,
           python: `from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os
from datetime import datetime

# ฟังก์ชันสำหรับบันทึกข้อมูลการใช้งานพร้อมเข้ารหัส log
def log_event(event_type, username):
    timestamp = datetime.now().isoformat()
    message = f"{timestamp} - {event_type} - User: {username}"

    # สร้าง key สำหรับการเข้ารหัส
    key = b'your-secure-key-32bytes-long-key'  # 32 bytes สำหรับ AES-256
    iv = os.urandom(16)  # สร้าง IV แบบสุ่ม

    # สร้าง cipher ด้วย AES CBC
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()

    # ทำการ padding ข้อความให้เต็มขนาด block
    padded_message = message + (16 - len(message) % 16) * ' '

    encrypted = encryptor.update(padded_message.encode()) + encryptor.finalize()

    # บันทึกข้อมูลที่เข้ารหัสลงไฟล์
    with open('activity.log', 'ab') as f:
        f.write(iv + encrypted + b'\n')

    print(f"Logged event: {event_type}")

# เรียกใช้งานฟังก์ชัน log_event
log_event('LOGIN_ATTEMPT', 'user1')
`,
           java: `import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;
import java.time.Instant;
import java.util.Base64;

public class LogEvent {
    public static void logEvent(String eventType, String username) throws Exception {
        String timestamp = Instant.now().toString();
        String message = timestamp + " - " + eventType + " - User: " + username;

        // สร้าง key สำหรับการเข้ารหัส
        String keyString = "your-secure-key123"; // ควรมีความยาว 16 หรือ 32 ไบต์
        SecretKey key = new javax.crypto.spec.SecretKeySpec(keyString.getBytes(), "AES");

        // สร้าง IV (Initialization Vector) แบบสุ่ม
        byte[] iv = new byte[16];
        new java.security.SecureRandom().nextBytes(iv);
        IvParameterSpec ivSpec = new IvParameterSpec(iv);

        // สร้าง Cipher สำหรับ AES CBC
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);

        // เข้ารหัสข้อความ
        byte[] encryptedMessage = cipher.doFinal(message.getBytes());

        // บันทึกไฟล์ log
        byte[] logData = new byte[iv.length + encryptedMessage.length];
        System.arraycopy(iv, 0, logData, 0, iv.length);
        System.arraycopy(encryptedMessage, 0, logData, iv.length, encryptedMessage.length);

        Files.write(Paths.get("activity.log"), logData);

        System.out.println("Logged event: " + eventType);
    }

    public static void main(String[] args) {
        try {
            logEvent("LOGIN_ATTEMPT", "user1");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `const nodemailer = require('nodemailer');

let failedLoginAttempts = 0;

// ฟังก์ชันตรวจสอบการล็อกอิน
function checkLogin(username, password) {
    // สมมติว่าการตรวจสอบการล็อกอินล้มเหลว
    failedLoginAttempts++;

    // ถ้าเกิดการล็อกอินล้มเหลวมากกว่า 3 ครั้ง ให้แจ้งเตือน
    if (failedLoginAttempts >= 3) {
        sendAlertEmail(username);
        failedLoginAttempts = 0;  // รีเซ็ตนับการล็อกอินผิดพลาด
    }
}

// ฟังก์ชันส่งอีเมลแจ้งเตือน
function sendAlertEmail(username) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'admin-email@example.com',
        subject: 'Suspicious Login Attempt',
        text: 'Alert: Multiple failed login attempts detected for user: '$'{username}'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Alert email sent:', info.response);
        }
    });
}

// เรียกใช้งาน checkLogin โดยสมมติให้มีการล็อกอินล้มเหลว
checkLogin('user1', 'incorrect-password');
`,
           python: `import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

failed_login_attempts = 0

# ฟังก์ชันตรวจสอบการล็อกอิน
def check_login(username, password):
    global failed_login_attempts
    # สมมติว่าการตรวจสอบการล็อกอินล้มเหลว
    failed_login_attempts += 1

    # ถ้าเกิดการล็อกอินล้มเหลวมากกว่า 3 ครั้ง ให้แจ้งเตือน
    if failed_login_attempts >= 3:
        send_alert_email(username)
        failed_login_attempts = 0  # รีเซ็ตนับการล็อกอินผิดพลาด

# ฟังก์ชันส่งอีเมลแจ้งเตือน
def send_alert_email(username):
    sender_email = "your-email@gmail.com"
    receiver_email = "admin-email@example.com"
    password = "your-email-password"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = 'Suspicious Login Attempt'

    body = f"Alert: Multiple failed login attempts detected for user: {username}"
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, password)
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)
        server.quit()
        print("Alert email sent")
    except Exception as e:
        print(f"Error sending email: {e}")

# เรียกใช้งาน check_login โดยสมมติให้มีการล็อกอินล้มเหลว
check_login('user1', 'incorrect-password')
`,
           java: `import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

public class FailedLoginAlert {
    private static int failedLoginAttempts = 0;

    // ฟังก์ชันตรวจสอบการล็อกอิน
    public static void checkLogin(String username, String password) {
        // สมมติว่าการตรวจสอบการล็อกอินล้มเหลว
        failedLoginAttempts++;

        // ถ้าเกิดการล็อกอินล้มเหลวมากกว่า 3 ครั้ง ให้แจ้งเตือน
        if (failedLoginAttempts >= 3) {
            sendAlertEmail(username);
            failedLoginAttempts = 0;  // รีเซ็ตนับการล็อกอินผิดพลาด
        }
    }

    // ฟังก์ชันส่งอีเมลแจ้งเตือน
    public static void sendAlertEmail(String username) {
        String senderEmail = "your-email@gmail.com";
        String receiverEmail = "admin-email@example.com";
        String password = "your-email-password";

        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(senderEmail, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(senderEmail));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(receiverEmail));
            message.setSubject("Suspicious Login Attempt");
            message.setText("Alert: Multiple failed login attempts detected for user: " + username);

            Transport.send(message);
            System.out.println("Alert email sent");
        } catch (MessagingException e) {
            System.out.println("Error sending email: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        // เรียกใช้งาน checkLogin โดยสมมติให้มีการล็อกอินล้มเหลว
        checkLogin("user1", "incorrect-password");
    }
}
`,
         };
   
      
      case 'Lesson3':
        return {
          javascript:`const sensitiveData = {
    apiKey: 'abcd1234efgh5678ijkl9101mnopqr23',
    password: 'SuperSecretPassword123'
};

// ฟังก์ชัน mask ข้อมูลที่เป็นความลับ
function maskSensitiveInfo(data) {
    return {
        ...data,
        apiKey: data.apiKey.replace(/.(?=.{4}$)/g, '*'),  // แสดงเฉพาะ 4 ตัวท้าย
        password: '********'  // ไม่แสดงรหัสผ่าน
    };
}

// ฟังก์ชันบันทึก log ข้อมูล
function logEvent(eventType, data) {
    const timestamp = new Date().toISOString();
    const maskedData = maskSensitiveInfo(data);

    console.log(''$'{timestamp} - '$'{eventType}:', maskedData);
}

// เรียกใช้งาน logEvent โดยส่งข้อมูลสำคัญเข้ามา
logEvent('API_REQUEST', sensitiveData);
`,
python:`from datetime import datetime

# ข้อมูลสำคัญ
sensitive_data = {
    'apiKey': 'abcd1234efgh5678ijkl9101mnopqr23',
    'password': 'SuperSecretPassword123'
}

# ฟังก์ชัน mask ข้อมูลที่เป็นความลับ
def mask_sensitive_info(data):
    masked_data = data.copy()
    masked_data['apiKey'] = masked_data['apiKey'][:-4].replace('!', '*') + masked_data['apiKey'][-4:]
    masked_data['password'] = '********'
    return masked_data

# ฟังก์ชันบันทึก log ข้อมูล
def log_event(event_type, data):
    timestamp = datetime.now().isoformat()
    masked_data = mask_sensitive_info(data)
    print(f"{timestamp} - {event_type}: {masked_data}")

# เรียกใช้งาน log_event โดยส่งข้อมูลสำคัญเข้ามา
log_event('API_REQUEST', sensitive_data)
`,
java:`import java.text.SimpleDateFormat;
import java.util.Date;

public class Main {
    public static void main(String[] args) {
        // ข้อมูลสำคัญ
        SensitiveData sensitiveData = new SensitiveData("abcd1234efgh5678ijkl9101mnopqr23", "SuperSecretPassword123");

        // เรียกใช้งาน logEvent โดยส่งข้อมูลสำคัญเข้ามา
        logEvent("API_REQUEST", sensitiveData);
    }

    // ฟังก์ชัน mask ข้อมูลที่เป็นความลับ
    public static SensitiveData maskSensitiveInfo(SensitiveData data) {
        String maskedApiKey = data.apiKey.substring(0, data.apiKey.length() - 4).replaceAll(".", "*") + data.apiKey.substring(data.apiKey.length() - 4);
        return new SensitiveData(maskedApiKey, "********");
    }

    // ฟังก์ชันบันทึก log ข้อมูล
    public static void logEvent(String eventType, SensitiveData data) {
        String timestamp = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS").format(new Date());
        SensitiveData maskedData = maskSensitiveInfo(data);
        System.out.println(timestamp + " - " + eventType + ": " + maskedData);
    }

    // Class สำหรับเก็บข้อมูลสำคัญ
    public static class SensitiveData {
        String apiKey;
        String password;

        public SensitiveData(String apiKey, String password) {
            this.apiKey = apiKey;
            this.password = password;
        }

        @Override
        public String toString() {
            return "{apiKey='" + apiKey + "', password='" + password + "'}";
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