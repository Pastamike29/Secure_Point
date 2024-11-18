
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../../../Components/Code/CodeSnippets";

export const getSQLICodeSnippets = (pageName: string): CodeSnippets => {
  switch (pageName) {
    case 'Lesson1':
      return {
        javascript: `// นำเข้าไลบรารี mysql2
const mysql = require('mysql2');

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const connection = mysql.createConnection({
  host: 'localhost',        // ที่อยู่ของเซิร์ฟเวอร์ฐานข้อมูล
  user: 'root',             // ชื่อผู้ใช้สำหรับเชื่อมต่อ
  password: 'yourpassword', // รหัสผ่านของผู้ใช้
  database: 'test_db'       // ชื่อฐานข้อมูลที่ต้องการเชื่อมต่อ
});

// ฟังก์ชันที่ใช้ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้ Prepared Statement
function getUserByUsername(username) {
  // สร้างคำสั่ง SQL ที่มี placeholder (?)
  const query = 'SELECT * FROM users WHERE username = ?';

  // ใช้ execute() เพื่อส่งคำสั่ง SQL ไปยังฐานข้อมูล
  // โดยส่งค่าของ username เข้าไปในตำแหน่งของ placeholder (?)
  connection.execute(query, [username], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    // ตรวจสอบผลลัพธ์จากฐานข้อมูล
    if (results.length > 0) {
      console.log('User found:', results[0]);  // แสดงข้อมูลผู้ใช้
    } else {
      console.log('User not found');
    }
  });
}

// เรียกใช้งานฟังก์ชันเพื่อค้นหาผู้ใช้ที่มีชื่อว่า 'admin'
getUserByUsername('admin');

// ปิดการเชื่อมต่อเมื่อเสร็จสิ้นการทำงาน
connection.end();


`,
        python: `import mysql.connector  # นำเข้าไลบรารีสำหรับการเชื่อมต่อ MySQL

# สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
connection = mysql.connector.connect(
    host='localhost',         # ที่อยู่ของเซิร์ฟเวอร์ฐานข้อมูล
    user='root',              # ชื่อผู้ใช้สำหรับเชื่อมต่อ
    password='yourpassword',  # รหัสผ่านของผู้ใช้
    database='test_db'        # ชื่อฐานข้อมูลที่ต้องการเชื่อมต่อ
)

# ฟังก์ชันที่ใช้ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้ Prepared Statement
def get_user_by_username(username):
    # สร้างคำสั่ง SQL ที่มี placeholder (%s)
    query = "SELECT * FROM users WHERE username = %s"

    # ใช้ cursor เพื่อ execute คำสั่ง SQL
    cursor = connection.cursor()

    try:
        # ส่งคำสั่ง SQL ไปยังฐานข้อมูล โดยส่งค่าของ username เข้าไป
        cursor.execute(query, (username,))

        # ดึงผลลัพธ์จากคำสั่ง SQL
        result = cursor.fetchone()

        # ตรวจสอบผลลัพธ์
        if result:
            print("User found:", result)  # แสดงข้อมูลผู้ใช้
        else:
            print("User not found")
    
    except mysql.connector.Error as err:
        print("Error executing query:", err)
    finally:
        cursor.close()  # ปิด cursor

# เรียกใช้งานฟังก์ชันเพื่อค้นหาผู้ใช้ที่มีชื่อว่า 'admin'
get_user_by_username('admin')

# ปิดการเชื่อมต่อฐานข้อมูลเมื่อเสร็จสิ้นการทำงาน
connection.close()
`,
        java: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DatabaseExample {
    public static void main(String[] args) {
        // กำหนดข้อมูลการเชื่อมต่อกับฐานข้อมูล
        String url = "jdbc:mysql://localhost:3306/test_db";  // ที่อยู่และชื่อฐานข้อมูล
        String user = "root";  // ชื่อผู้ใช้
        String password = "yourpassword";  // รหัสผ่าน

        // ฟังก์ชันที่ใช้ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            // สร้างคำสั่ง SQL ที่มี placeholder (?)
            String query = "SELECT * FROM users WHERE username = ?";
            PreparedStatement stmt = connection.prepareStatement(query);
            
            // ตั้งค่า placeholder ด้วยค่าของ username
            stmt.setString(1, "admin");

            // execute คำสั่ง SQL และเก็บผลลัพธ์ใน ResultSet
            ResultSet resultSet = stmt.executeQuery();

            // ตรวจสอบผลลัพธ์
            if (resultSet.next()) {
                System.out.println("User found: " + resultSet.getString("username"));
            } else {
                System.out.println("User not found");
            }

        } catch (SQLException e) {
            System.out.println("Error executing query: " + e.getMessage());
        }
    }
}
`,
      };
    case 'Lesson2':
      return {
        javascript: `const crypto = require('crypto');

// เข้ารหัสข้อมูลก่อนส่ง
function encryptData(data) {
  const cipher = crypto.createCipher('aes-256-cbc', 'your-secret-key');
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// การใช้งาน
const sensitiveData = 'password123';
const encryptedData = encryptData(sensitiveData);
console.log('Encrypted Data: ', encryptedData);

`,
        python: `from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Random import get_random_bytes

# ฟังก์ชันในการเข้ารหัสข้อมูล
def encrypt_data(data, secret_key):
    # สร้างรหัสสุ่ม (IV) ที่มีความยาว 16 ไบต์สำหรับ AES CBC mode
    iv = get_random_bytes(16)

    # เปลี่ยนข้อความที่ต้องการเข้ารหัส (data) ให้เป็น bytes
    data_bytes = data.encode('utf-8')

    # เตรียมข้อมูลให้ยาวพอสำหรับ AES (ใช้ padding)  
    cipher = AES.new(secret_key.encode('utf-8'), AES.MODE_CBC, iv)
    encrypted_data = cipher.encrypt(pad(data_bytes, AES.block_size))

    # ส่งคืนข้อมูลที่เข้ารหัส พร้อม IV
    return iv + encrypted_data  # เพิ่ม IV ไปกับข้อมูลที่เข้ารหัส

# การใช้งาน
sensitive_data = 'password123'
secret_key = 'your-secret-key'  # ควรใช้คีย์ที่ยาว 32 ไบต์สำหรับ AES-256
encrypted_data = encrypt_data(sensitive_data, secret_key)
print(f'Encrypted Data: {encrypted_data.hex()}')
`,
        java: `import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.util.Base64;

public class AESEncryption {
    // ฟังก์ชันในการเข้ารหัสข้อมูล
    public static String encryptData(String data, String secretKey) throws Exception {
        // สร้างรหัสสุ่ม (IV) ที่มีความยาว 16 ไบต์
        byte[] iv = new byte[16];
        new java.security.SecureRandom().nextBytes(iv);

        // สร้างคีย์จากข้อความ secretKey
        SecretKey key = new javax.crypto.spec.SecretKeySpec(secretKey.getBytes(), "AES");

        // สร้างตัวแปร Cipher ด้วยโหมด AES CBC
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        IvParameterSpec ivSpec = new IvParameterSpec(iv);

        // ตั้งค่า Cipher สำหรับการเข้ารหัส
        cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);

        // เข้ารหัสข้อมูล
        byte[] encryptedData = cipher.doFinal(data.getBytes());

        // รวม IV และข้อมูลที่เข้ารหัสในรูปแบบ Base64
        byte[] ivAndEncryptedData = new byte[iv.length + encryptedData.length];
        System.arraycopy(iv, 0, ivAndEncryptedData, 0, iv.length);
        System.arraycopy(encryptedData, 0, ivAndEncryptedData, iv.length, encryptedData.length);

        // คืนค่าข้อมูลที่เข้ารหัสในรูปแบบ Base64
        return Base64.getEncoder().encodeToString(ivAndEncryptedData);
    }

    // การใช้งาน
    public static void main(String[] args) throws Exception {
        String sensitiveData = "password123";
        String secretKey = "your-secret-key";  // คีย์ที่ยาว 16, 24 หรือ 32 ไบต์สำหรับ AES-256
        String encryptedData = encryptData(sensitiveData, secretKey);
        System.out.println("Encrypted Data: " + encryptedData);
    }
}
`,
      };
    case 'Lesson3':
      return {
        javascript: `const mysql = require('mysql2');

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'yourdatabase'
});

// ตัวอย่างการใช้ prepared statement เพื่อป้องกัน SQL Injection
const username = 'user1';  // ตัวอย่างข้อมูลจากผู้ใช้
const password = 'password123'; // ตัวอย่างข้อมูลจากผู้ใช้

// การใช้ parameterized query ป้องกัน SQL injection
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

// ใช้ connection.execute() แทน connection.query() เพื่อป้องกัน SQL injection
connection.execute(query, [username, password], (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }

  // ถ้ามีผู้ใช้ที่ตรงกัน
  if (results.length > 0) {
    console.log('User found:', results[0]);
  } else {
    console.log('No user found');
  }
  connection.end();
});

`,
        python: `import mysql.connector

# 1. Establish a connection to the MySQL database
connection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='yourpassword',
    database='yourdatabase'
)

# 2. Define the username and password (example input from user)
username = 'user1'  # Example user input
password = 'password123'  # Example user input

# 3. Create a cursor object to interact with the database
cursor = connection.cursor()

# 4. Prepare the SQL query with placeholders (parameterized query)
query = 'SELECT * FROM users WHERE username = %s AND password = %s'

# 5. Execute the query with the parameters to prevent SQL injection
cursor.execute(query, (username, password))

# 6. Fetch the results
results = cursor.fetchall()

# 7. Check if any rows are returned
if results:
    print('User found:', results[0])
else:
    print('No user found')

# 8. Close the cursor and connection
cursor.close()
connection.close()

`,
        java: `import java.sql.*;

public class MySQLExample {
    public static void main(String[] args) {
        // 1. Establish a connection to the MySQL database
        String url = "jdbc:mysql://localhost:3306/yourdatabase";
        String user = "root";
        String password = "yourpassword";
        
        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            // 2. Define the SQL query with placeholders (parameterized query)
            String query = "SELECT * FROM users WHERE username = ? AND password = ?";
            
            // 3. Create a prepared statement
            try (PreparedStatement stmt = connection.prepareStatement(query)) {
                // 4. Set the parameters (username and password)
                stmt.setString(1, "user1");  // Example user input for username
                stmt.setString(2, "password123");  // Example user input for password
                
                // 5. Execute the query
                try (ResultSet rs = stmt.executeQuery()) {
                    // 6. Check if there are results
                    if (rs.next()) {
                        System.out.println("User found: " + rs.getString("username"));
                    } else {
                        System.out.println("No user found");
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
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